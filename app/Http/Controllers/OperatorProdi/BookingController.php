<?php

namespace App\Http\Controllers\OperatorProdi;

use App\Http\Controllers\Controller;
use App\Models\AdminProdi;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\Prodi;
use App\Models\RoomModel;
use App\Models\User;
use App\Models\WaktuModel;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingController extends Controller
{

    public function index()
    {


        return Inertia::render('AdminProdi/Rooms/Reservasi/Reservasi', [
            'base_url' => url('/'),

        ]);
    }
    public function delete($id)
    {
        // dd($id);
        $booking = Booking::find($id);
        $my_data = AdminProdi::where('email', Auth::user()->email)->first();

        if ($booking->student_id_prodi === $my_data->id_prodi) {
            DB::beginTransaction();
            try {
                $result = $booking->delete();
                DB::commit();
                return response()->json(['status' => 'success', 'message' => 'Berhasil menghapus']);
            } catch (Exception $e) {
                DB::rollBack();
                return response()->json(['status' => 'error', 'message'  => $e->getMessage()]);
            }
        }
        return response()->json(['status' => 'error', 'message'  => 'Anda tidak bisa menghapus reservasi dari Prodi lain']);
    }
    public function detail($id)
    {
        $booking = Booking::fromSub(function ($query) {
            $query->from('booking_tbl')
                ->join('data_ruang_tbl as dtr_tbl', 'booking_tbl.room_id', '=', 'dtr_tbl.id')
                ->join('prodi_tbl as prd_tbl', 'booking_tbl.student_id_prodi', '=', 'prd_tbl.id')
                ->join('data_waktu_tbl as dtw_tbl', 'booking_tbl.time_slot_id', '=', 'dtw_tbl.id')
                ->selectRaw('
                    booking_tbl.id,
                    booking_tbl.student_name as name,
                    booking_tbl.student_nim as nim,
                    prd_tbl.name as nama_prodi,
                    dtr_tbl.name as nama_ruang,
                    booking_tbl.booking_date,
                    CONCAT(dtw_tbl.start, " s.d ", dtw_tbl.end) as jam,
                    (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_ketua) AS nama_ketua,
                    booking_tbl.username_ketua,
                    (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_sekretaris) AS nama_sekretaris,
                    booking_tbl.username_sekretaris,
                    (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_1) AS nama_penguji1,
                    booking_tbl.username_penguji_1,
                    (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_2) AS nama_penguji2,
                    booking_tbl.username_penguji_2,
                    booking_tbl.link_nota,
                    ROW_NUMBER() OVER (ORDER BY booking_tbl.booking_date DESC) AS row_index
                ');
        }, 'subquery')
            ->where('id', $id)
            ->first();

        return Inertia::render('AdminProdi/Rooms/Reservasi/DetailReservasi', [
            'base_url' => url('/'),
            'booking' => $booking
        ]);
    }


    public function all(Request $request)
    {
        $booking_date = !empty($request->booking_date) && strtotime($request->booking_date)
            ? Carbon::parse($request->booking_date)->setTimezone('Asia/Jakarta')->format('Y-m-d')
            : null;

        $query = Booking::join('prodi_tbl as prd_tbl', 'booking_tbl.student_id_prodi', '=', 'prd_tbl.id')
            ->join('data_ruang_tbl as dtr_tbl', 'booking_tbl.room_id', '=', 'dtr_tbl.id')
            ->join('data_waktu_tbl as dtw_tbl', 'booking_tbl.time_slot_id', '=', 'dtw_tbl.id');

        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where(function ($subQuery) use ($request) {
                $subQuery->where('booking_tbl.student_name', 'like', '%' . $request->search_key . '%')
                    ->orWhere('dtr_tbl.name', 'like', '%' . $request->search_key . '%')
                    ->orWhere('booking_tbl.student_nim', 'like', '%' . $request->search_key . '%');
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
                dtr_tbl.name as nama_ruang,
                booking_tbl.booking_date,
                CONCAT(dtw_tbl.start, " s.d ", dtw_tbl.end) as jam,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_ketua) AS nama_ketua,
                booking_tbl.username_ketua,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_sekretaris) AS nama_sekretaris,
                booking_tbl.username_sekretaris,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_1) AS nama_penguji1,
                booking_tbl.username_penguji_1,
                (SELECT name FROM dosen_tbl WHERE dosen_tbl.nip = booking_tbl.username_penguji_2) AS nama_penguji2,
                booking_tbl.username_penguji_2,
                booking_tbl.link_nota'
        );
        $data = $query->paginate(10);
        return response()->json($data);
    }
    public function add()
    {
        $prodi = Prodi::all();
        $data_waktu = WaktuModel::selectRaw('(CONCAT(data_waktu_tbl.start, "-", data_waktu_tbl.end)) as name, data_waktu_tbl.id')->get();
        $data_ruang = RoomModel::all();
        $data_dosen = Dosen::all();
        $data_opt = AdminProdi::where('email', Auth::user()->email)->first();

        return Inertia::render('AdminProdi/Rooms/Reservasi/AddReservasi', [
            'base_url' => url('/'),
            'data_prodi' => $prodi,
            'data_waktu' => $data_waktu,
            'data_ruang' => $data_ruang,
            'data_dosen' => $data_dosen,
            'data_opt' => $data_opt,
        ]);
    }

    public function booking(Request $request)
    {

        $status = 'success';

        $response = [];

        $data = [
            'student_name' => $request->student_name,
            'student_nim' => $request->student_nim,
            'student_id_prodi' => $request->student_id_prodi,
            'room_id' => $request->room_id,
            'time_slot_id' => $request->time_slot_id,
            'booking_date' => $request->booking_date !== null
                ? Carbon::parse($request->booking_date)->setTimezone('Asia/Jakarta')->format('Y-m-d')
                : null,
            'username_penguji_1' => $request->username_penguji_1,
            'username_penguji_2' => $request->username_penguji_2,
            'username_ketua' => $request->username_ketua,
            'username_sekretaris' => $request->username_sekretaris
        ];

        $errors = [
            'nota' => null,
            'student_name' => null,
            'student_nim' => null,
            'student_id_prodi' => null,
            'room_id' => null,
            'time_slot_id' => null,
            'booking_date' => null,
            'username_penguji_1' => null,
            'username_penguji_2' => null,
            'username_ketua' => null,
            'username_sekretaris' => null
        ];

        $eksisting_booking = Booking::where('student_nim', $data['student_nim'])->first();
        if ($eksisting_booking) {
            $errors['general'] = 'Mahasiswa dengan nim ' . $data['student_nim'] . ' sudah pernah memesan ruangan sidang';
        } else {
            if (!$request->hasFile('nota')) {
                $errors['nota'] = 'Nota Wajib di upload';
            }
            if ($data['student_name'] === null) {
                $errors['student_name'] = 'Nama Mahasiswa Wajib Diisi';
            }

            if ($data['student_nim'] === null) {
                $errors['student_nim'] = 'NIM Wajib diisi';
            }
            if ($data['student_id_prodi'] === null) {
                $errors['student_id_prodi'] = 'Prodi Wajib dipilih';
            }
            if ($data['room_id'] === null) {
                $errors['room_id'] = 'Ruangan wajib dipilih';
            }
            if ($data['time_slot_id'] === null) {
                $errors['time_slot_id'] = 'Jam sidang wajib dipilih';
            }
            if ($data['booking_date'] === null) {
                $errors['booking_date'] = 'tanggal sidang wajib dipilih';
            }
            if ($data['username_ketua'] === null) {
                $errors['username_ketua'] = 'Ketua sidang wajib diisi';
            }
            if ($data['username_sekretaris'] === null) {
                $errors['username_sekretaris'] = 'Sektretaris sidang wajib diisi';
            }
            if ($data['username_penguji_1'] === null) {
                $errors['username_penguji_1'] = 'Penguji 1 wajib diisi';
            }
            if ($data['username_penguji_2'] === null) {
                $errors['username_penguji_2'] = 'Penguji 2 wajib diisi';
            }
        }

        foreach ($errors as  $key => $value) {
            if ($value !== null) {
                $status = 'error';
                break;
            }
        }

        if ($status !== 'error') {
            $booking_on_date = Booking::where('booking_date', $data['booking_date'])
                ->where('room_id', $data['room_id'])
                ->where('booking_date', $data['booking_date'])
                ->where('time_slot_id', $data['time_slot_id'])
                ->first();
            if ($booking_on_date) {
                $errors['room_id'] = 'Ruangan Bentrok';
                $errors['booking_date'] = 'Tanggal Sidang Bentrok';
                $errors['time_slot_id'] = 'Jam Bentrok';
            } else {

                $ketua = Booking::where('booking_date', $data['booking_date'])
                    ->where('booking_date', $data['booking_date'])
                    ->where('time_slot_id', $data['time_slot_id'])
                    ->where('username_ketua', $data['username_ketua'])
                    ->first();
                $sektretaris = Booking::where('booking_date', $data['booking_date'])
                    ->where('booking_date', $data['booking_date'])
                    ->where('time_slot_id', $data['time_slot_id'])
                    ->where('username_sekretaris', $data['username_sekretaris'])
                    ->first();
                $penguji1 = Booking::where('booking_date', $data['booking_date'])
                    ->where('booking_date', $data['booking_date'])
                    ->where('time_slot_id', $data['time_slot_id'])
                    ->where('username_penguji_1', $data['username_penguji_1'])
                    ->first();
                $penguji2 = Booking::where('booking_date', $data['booking_date'])
                    ->where('booking_date', $data['booking_date'])
                    ->where('time_slot_id', $data['time_slot_id'])
                    ->where('username_penguji_2', $data['username_penguji_2'])
                    ->first();
                if ($ketua) {
                    $errors['username_ketua'] = 'Ketua sidang bentrok';
                }

                if ($sektretaris) {
                    $errors['username_sekretaris'] = 'Sektretaris sidang bentrok';
                }

                if ($penguji1) {
                    $errors['username_penguji_1'] = 'Jadwal Penguji 1 bentrok';
                }
                if ($penguji2) {
                    $errors['username_penguji_2'] = 'Jadwal Penguji 2 bentork';
                }
            }
        }
        foreach ($errors as  $key => $value) {
            if ($value !== null) {
                $status = 'error';
                break;
            }
        }
        if ($status !== 'error') {
            DB::beginTransaction();
            try {
                $file = $request->file('nota');

                $custome_file_name = 'nota_' . $data['student_nim'] . '.' . $file->getClientOriginalExtension();
                $file_path = $file->storeAs('nota', $custome_file_name, 'public');
                $data['link_nota'] = $file_path;

                $result = Booking::create($data);

                DB::commit();
                $response['status'] = $status;
                $response['data'] = $result;
                return response()->json($response);
            } catch (Exception $e) {
                DB::rollBack();
                $status = 'error';
                $response['status'] = $status;
                $errors['general'] = $e->getMessage();
                $response['errors'] = $errors;
                return response()->json($response);
            }
        }

        $response['status'] = $status;
        $response['errors'] = $errors;

        return response()->json($response);
    }
}
