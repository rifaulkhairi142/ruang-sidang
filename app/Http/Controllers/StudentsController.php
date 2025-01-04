<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentsController extends Controller
{
    public function home()
    {
        return Inertia::render('Students/Home', ['base_url' => url('/')]);
    }
}
