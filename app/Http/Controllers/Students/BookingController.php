<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\RoomModel;
use App\Models\WaktuModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $rooms = RoomModel::all();
        $dosen = Dosen::all();
        $waktu =  DB::table('data_waktu_tbl')
            ->selectRaw("CONCAT(start, ' - ', end) AS time_slot, data_waktu_tbl.id")
            ->get();


        return Inertia::render('Students/Booking', [
            'rooms' => $rooms,
            'dosen' => $dosen,
            'waktu' => $waktu,
            'base_url' => url('/'),
        ]);
    }

    public function booking(Request $request)
    {
        $status = 'success';


        $response = [];
        $data = [
            'username_mahasiswa' => $request->username_mahasiswa,
            'room_id' => $request->room_id,
            'booking_date' => $request->booking_date !== null
                ? Carbon::parse($request->booking_date)->setTimezone('Asia/Jakarta')->format('Y-m-d')
                : null,
            'username_penguji_1' => $request->username_penguji_1,
            'username_penguji_2' => $request->username_penguji_2,
            'username_sekretaris' => $request->username_sekretaris,
            'username_ketua' => $request->username_ketua,
            'start' => $request->start !== null ? Carbon::parse($request->start)->setTimezone('Asia/Jakarta')->format('H:i:s') : null,
            'end' => $request->end !== null ? Carbon::parse($request->end)->setTimezone('Asia/Jakarta')->format('H:i:s') : null,
        ];
        $errors = [
            'username_mahasiswa' => null,
            'room_id' => null,
            'booking_date' => null,
            'username_ketua' => null,
            'username_sekretaris' => null,
            'username_penguji_1' => null,
            'username_penguji_2' => null,
            'start' => null,
            'end' => null,
            'general' => null,
        ];
        $my_booking = Booking::where('username_mahasiswa', $data['username_mahasiswa'])->first();
        if ($my_booking) {
            $errors['general'] = 'Kamu sudah memesan ruangan lain';
            $status = 'error';
        } else {
            if ($data['username_mahasiswa'] === null) {
                $errors['username_mahasiswa'] = 'Username field is required';
            }
            if ($data['room_id'] === null) {
                $errors['room_id'] = 'Ruangan Wajib Diisi';
            }
            if ($data['start'] === null) {
                $errors['start'] = 'Jam mulai sidang wajib diisi';
            }
            if ($data['end'] === null) {
                $errors['end'] = 'Jam selesai sidang wajib diisi';
            }
            if ($data['booking_date'] === null) {
                $errors['booking_date'] = 'Tanggal sidang wajib diisi';
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
                $errors['username_penguji_2'] = 'Penguji 2 wajib disisi';
            }

            foreach ($errors as $key => $value) {
                if ($value !== null) {
                    $status = 'error';
                    break;
                }
            }

            if ($status !== 'error') {

                $booking_on_date = Booking::where("booking_date", $data['booking_date'])
                    ->where('room_id', $data['room_id'])
                    ->get();

                if (count($booking_on_date) > 0) {
                    foreach ($booking_on_date as $booking) {
                        if ($this->calculateIntersectionTime($data['start'], $data['end'], $booking->start, $booking->end) > 0) {
                            $errors['booking_date'] = 'Bentrok';
                            $errors['start'] = 'Bentrok';
                            $errors['end'] = 'Bentrok';
                            $errors['room_id'] = 'Bentrok';
                            break;
                        }
                    }
                }


                $ketua = Booking::where('booking_date', $data['booking_date'])
                    ->where('username_ketua', $data['username_ketua'])
                    ->get();
                $sek = Booking::where('booking_date', $data['booking_date'])
                    ->where('username_sekretaris', $data['username_sekretaris'])
                    ->get();
                $penguji1 = Booking::where('booking_date', $data['booking_date'])
                    ->where('username_penguji_1', $data['username_penguji_1'])
                    ->get();
                $penguji2 = Booking::where('booking_date', $data['booking_date'])
                    ->where('username_penguji_2', $data['username_penguji_2'])
                    ->get();

                if (count($ketua) > 0) {
                    foreach ($ketua as $itm) {
                        if ($this->calculateIntersectionTime($data['start'], $data['end'], $itm->start, $itm->end) > 0) {
                            $errors['username_ketua'] = 'Ketua Bentrok';
                        }
                    }
                }
                if (count($sek) > 0) {
                    foreach ($sek as $itm) {
                        if ($this->calculateIntersectionTime($data['start'], $data['end'], $itm->start, $itm->end) > 0) {
                            $errors['username_sekretaris'] = 'Sektretaris Bentrok';
                        }
                    }
                }

                if (count($penguji1) > 0) {
                    foreach ($penguji1 as $itm) {
                        if ($this->calculateIntersectionTime($data['start'], $data['end'], $itm->start, $itm->end) > 0) {
                            $errors['username_penguji_1'] = 'Penguji 1 Bentrok';
                        }
                    }
                }
                if (count($penguji2) > 0) {
                    foreach ($penguji2 as $itm) {
                        if ($this->calculateIntersectionTime($data['start'], $data['end'], $itm->start, $itm->end) > 0) {
                            $errors['username_penguji_2'] = 'Penguji 2 Bentrok';
                        }
                    }
                }
            }

            foreach ($errors as $key => $value) {
                if ($value !== null) {
                    $status = 'error';
                    break;
                }
            }

            if ($status !== 'error') {
                $result = Booking::create($data);
                $response['data'] = $result;
            }
        }


        $response['status'] = $status;
        $response['errors'] = $errors;

        return response()->json($response);
    }



    public function calculateIntersectionTime($start1, $end1, $start2, $end2)
    {
        $start1 = Carbon::createFromFormat('H:i:s', $start1);
        $end1 = Carbon::createFromFormat('H:i:s', $end1);
        $start2 = Carbon::createFromFormat('H:i:s', $start2);
        $end2 = Carbon::createFromFormat('H:i:s', $end2);

        $overlapStart = $start1->max($start2);
        $overlapEnd = $end1->min($end2);

        if ($overlapStart->lt($overlapEnd)) {
            $duration = $overlapStart->diffInSeconds($overlapEnd);
            return $duration;
        }

        return 0;
    }
}
