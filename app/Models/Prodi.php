<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Prodi extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'prodi_tbl';
    protected $fillable = ['name', 'kode'];
}
