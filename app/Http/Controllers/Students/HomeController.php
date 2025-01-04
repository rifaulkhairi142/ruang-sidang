<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function all(Request $request)
    {
        $booking_date = !empty($request->booking_date) && strtotime($request->booking_date)
            ? Carbon::parse($request->booking_date)->setTimezone('Asia/Jakarta')->format('Y-m-d')
            : null;

        $query = Booking::join('users as us', 'booking_tbl.username_mahasiswa', '=', 'us.username')
            ->join('data_ruang_tbl as dt_ruang', 'booking_tbl.room_id', '=', 'dt_ruang.id');

        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where(function ($subQuery) use ($request) {
                $subQuery->where('us.name', 'like', '%' . $request->search_key . '%')
                    ->orWhere('dt_ruang.name', 'like', '%' . $request->search_key . '%');
            });
        }
        if ($booking_date !== null) {
            $query->where('booking_tbl.booking_date', $booking_date);
        }
        $query->selectRaw(
            'ROW_NUMBER() OVER (ORDER BY booking_tbl.id) AS row_index,
                booking_tbl.id,
                us.name as name,
                us.username as nim,
                dt_ruang.name as nama_ruang,
                booking_tbl.booking_date,
                CONCAT(booking_tbl.start, " s.d ", booking_tbl.end) as jam'
        );
        $data = $query->paginate(10);



        return response()->json($data);
    }
}
