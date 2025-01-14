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
        'student_nim',
        'booking_date',
        'time_slot_id',
        'student_id_prodi',
        'username_penguji_1',
        'username_penguji_2',
        'username_sekretaris',
        'username_ketua',
        'link_nota',
        // 'start',
        // 'end',
        'time_slot_id',
        'student_name',
        'id_prodi',
    ];
}
