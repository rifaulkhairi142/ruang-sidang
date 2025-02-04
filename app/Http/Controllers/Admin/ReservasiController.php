<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservasiController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Rooms/Reservasi/Reservasi', ['base_url' => url('/')]);
    }
    public function all(Request $request)
    {

        $booking_date = !empty($request->booking_date) && strtotime($request->booking_date)
            ? Carbon::parse($request->booking_date)->setTimezone('Asia/Jakarta')->format('Y-m-d')
            : null;

        $query = Booking::join('data_ruang_tbl as dt_ruang', 'booking_tbl.room_id', '=', 'dt_ruang.id')
            ->join('data_waktu_tbl as w_tbl', 'booking_tbl.time_slot_id', '=', 'w_tbl.id')
            ->join('prodi_tbl as p_tbl', 'booking_tbl.student_id_prodi', '=', 'p_tbl.id');

        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where(function ($subQuery) use ($request) {
                $subQuery->where('booking_tbl.student_name', 'like', '%' . $request->search_key . '%')
                    ->orWhere('dt_ruang.name', 'like', '%' . $request->search_key . '%')
                    ->orWhere('booking_tbl.student_nim', 'like', '%' . $request->search_key . '%')
                    ->orWhere('p_tbl.name', 'like', '%' . $request->search_key . '%');
            });
        }
        if ($booking_date !== null) {
            $query->where('booking_tbl.booking_date', $booking_date);
        }
        $query->selectRaw(
            'ROW_NUMBER() OVER (ORDER BY booking_tbl.booking_date DESC) AS row_index,
                    booking_tbl.id,
                    booking_tbl.student_name as name,
                    booking_tbl.student_nim as nim,
                    dt_ruang.name as nama_ruang,
                    booking_tbl.booking_date,
                    CONCAT(w_tbl.start, " s.d ", w_tbl.end) as jam'
        );
        $data = $query->paginate(10);



        return response()->json($data);
    }

    public function detail($id)
    {

        $booking = Booking::where('id', $id)
            ->selectRaw(
                'booking_tbl.*,
                (SELECT name FROM data_ruang_tbl WHERE id = booking_tbl.room_id) as nama_ruang,
                (booking_tbl.student_name) as nama_mahasiswa,
                (SELECT name from prodi_tbl WHERE prodi_tbl.id = booking_tbl.id) as nama_prodi,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_ketua) as nama_ketua,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_sekretaris) as nama_sekretaris,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_1) as nama_penguji1,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_2) as nama_penguji2
                '
            )
            ->first();

        return Inertia::render('Admin/Rooms/Reservasi/DetailReservasi', [
            'booking' => $booking,
            'base_url' => url('/')
        ]);
    }

    public function delete($id)
    {
        $booking = Booking::find($id);
        $result = $booking->delete();
        if ($result) {
            return response()->json(['message' => 'Success']);
        }
        return response()->json(['message' => 'Error']);
    }
}
