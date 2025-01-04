<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WaktuModel extends Model
{
    protected $fillable = ['start', 'end'];

    protected $table = 'data_waktu_tbl';
}
