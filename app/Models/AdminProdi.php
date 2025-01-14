<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminProdi extends Model
{
    protected $table = 'opt_prodi_tbl';
    protected $fillable = ['email', 'id_prodi'];
}
