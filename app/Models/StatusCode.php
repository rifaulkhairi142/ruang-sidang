<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatusCode extends Model
{
    protected $table = 'status_code_tbl';
    protected $fillable = ['name', 'order'];
}
