<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\RoomModel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

class Dashboard extends Controller
{
    public function index()
    {
        $data = [];
        $data['total_user'] = User::all()->count();
        $data['total_dosen'] = Dosen::all()->count();
        $data['total_rooms'] = RoomModel::all()->count();
        $data['total_pending_approval'] = Mahasiswa::where('status', '1')->count();
        $data['total_reservation'] = Booking::all()->count();
        $reservationsThisWeek = DB::table('booking_tbl')
            ->selectRaw('booking_date, COUNT(*) as total')
            ->whereBetween('booking_date', [
                Carbon::now()->startOfWeek()->toDateString(),
                Carbon::now()->endOfWeek()->toDateString()
            ])
            ->groupBy('booking_date')
            ->pluck('total', 'booking_date');
        $datesThisWeek = $this->getDatesInRange(Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek());
        $formattedThisWeek = $this->fillZeroBookings($datesThisWeek, $reservationsThisWeek);

        $data['this_week'] = $formattedThisWeek;
        return Inertia::render('Welcome', [

            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'data' => $data
        ]);
    }

    function fillZeroBookings($dates, $reservations)
    {
        $data = [];

        foreach ($dates as $date) {
            // Ensure $date is a Carbon instance
            $formattedDate = $date instanceof Carbon ? $date->format('Y-m-d') : $date;

            $data[] = [
                'date' => $formattedDate,
                'total' => $reservations[$formattedDate] ?? 0, // Default to 0 if no reservations
            ];
        }

        return $data;
    }

    function getDatesInRange(Carbon $start, Carbon $end): array
    {
        return array_map(
            fn($date) => $date->format('Y-m-d'),
            iterator_to_array($start->toPeriod($end, '1 day'))
        );
    }
}
