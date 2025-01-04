<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Booking extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'booking_tbl';
    protected $fillable = [
        'room_id',
        'username_mahasiswa',
        'booking_date',
        'time_slot_id',
        'username_penguji_1',
        'username_penguji_2',
        'username_sekretaris',
        'username_ketua',
        'start',
        'end',
    ];
}
