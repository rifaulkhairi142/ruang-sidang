<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $booking = Booking::where('username_mahasiswa', Auth::user()->username)
            ->select(
                'booking_tbl.id',
                'booking_tbl.username_mahasiswa as nim',
                'booking_tbl.booking_date',
                'booking_tbl.start',
                'booking_tbl.end',
                DB::raw('(SELECT name FROM data_ruang_tbl WHERE data_ruang_tbl.id = booking_tbl.room_id) AS nama_ruang'),

                DB::raw('(SELECT name FROM users WHERE users.username = booking_tbl.username_mahasiswa) AS nama_mahasiswa'),
                DB::raw('(SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_ketua) AS nama_ketua'),
                'booking_tbl.username_ketua',
                DB::raw('(SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_sekretaris) AS nama_sekretaris'),
                'booking_tbl.username_sekretaris',
                DB::raw('(SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_1) AS nama_penguji1'),
                'booking_tbl.username_penguji_1',
                DB::raw('(SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_2) AS nama_penguji2'),
                'booking_tbl.username_penguji_2',
            )
            ->get();
        return Inertia::render('Students/History', ['booking' => $booking]);
    }

    public function delete($id)
    {
        $pesanan = Booking::find($id);
        $result = $pesanan->delete();

        if ($result) {
            return redirect()->back()->with('message', ['success' => 'Berhasil menghapus']);
        }
        return redirect()->back()->with('message', ['error' => 'Gagal menghapus']);
    }
}
