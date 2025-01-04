<?php

use App\Http\Controllers\Admin\Dashboard;
use App\Http\Controllers\Admin\DosenController;
use App\Http\Controllers\Admin\ProdiController;
use App\Http\Controllers\Admin\ReservasiController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\WaktuController;
use App\Http\Controllers\Students\ProfileController;
use App\Http\Controllers\Students\BookingController;
use App\Http\Controllers\Students\HistoryController;
use App\Http\Controllers\StudentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/admin/dashboard', [Dashboard::class, 'index'])->middleware('auth', 'admin');

Route::get('/', [StudentsController::class, 'home'])->name('mahasiswa.home');
Route::get('/booking', [BookingController::class, 'index'])->middleware(['auth', 'verified', 'student', 'diterima'])->name('student.booking');
Route::get('/history', [HistoryController::class, 'index'])->middleware(['auth', 'verified', 'student', 'diterima'])->name('student.history');
Route::post('/history/pesanan/delete/{id}', [HistoryController::class, 'delete']);
Route::get('/profile', [ProfileController::class, 'index'])->middleware(['auth', 'verified', 'student'])->name('student.profile');


Route::get('/admin/rooms', [RoomController::class, 'index'])->middleware(['auth', 'admin'])->name('admin.rooms');
Route::get('/admin/rooms/add', [RoomController::class, 'add'])->middleware(['auth', 'admin'])->name('admin.rooms.add');
Route::post('/admin/rooms/save', [RoomController::class, 'save'])->middleware(['auth', 'admin'])->name('admin.rooms.save');
Route::get('/admin/rooms/edit/{id}', [RoomController::class, 'edit'])->middleware(['auth', 'admin'])->name('admin.rooms.edit');
Route::post('/admin/rooms/update/{id}', [RoomController::class, 'update'])->middleware(['auth', 'admin'])->name('admin.rooms.edit');

Route::get('/admin/data/dosen', [DosenController::class, 'index'])->middleware(['auth', 'admin'])->name('admin.data.dosen');
Route::get('/admin/data/dosen/add', [DosenController::class, 'add'])->middleware(['auth', 'admin'])->name('admin.data.dosen.add');
Route::post('/admin/data/dosen/save', [DosenController::class, 'save'])->middleware(['auth', 'admin'])->name('admin.data.dosen.save');
Route::post('admin/data/dosen/update/{id}', [DosenController::class, 'update'])->middleware(['auth', 'admin'])->name('admin.data.dosen.update');
Route::get('/admin/data/dosen/edit/{id}', [DosenController::class, 'edit'])->middleware(['auth', 'admin'])->name('admin.data.dosen.edit');

Route::get('/admin/data/prodi', [ProdiController::class, 'index'])->middleware(['auth', 'admin'])->name('admin.data.prodi');
Route::get('/admin/data/prodi/add', [ProdiController::class, 'add'])->middleware(['auth', 'admin'])->name('admin.data.prodi.add');
Route::post('/admin/data/prodi/save', [ProdiController::class, 'save'])->middleware(['auth', 'admin'])->name('admin.data.prodi.save');
Route::get('/admin/data/prodi/edit/{id}', [ProdiController::class, 'edit'])->middleware(['auth', 'admin'])->name('admin.data.prodi.edit');
Route::post('/admin/data/prodi/update/{id}', [ProdiController::class, 'update'])->middleware(['auth', 'admin'])->name('admin.data.prodi.update');



Route::get('/admin/rooms/waktu', [WaktuController::class, 'index'])->middleware(['auth', 'admin'])->name('admin.rooms.waktu');
Route::get('/admin/rooms/waktu/add', [WaktuController::class, 'add'])->middleware(['auth', 'admin'])->name('admin.rooms.waktu.add');
Route::post('/admin/rooms/waktu/save', [WaktuController::class, 'save'])->middleware(['auth', 'admin'])->name('admin.rooms.waktu.save');
Route::delete('/admin/rooms/waktu/delete/{id}', [WaktuController::class, 'delete'])->middleware(['auth', 'admin'])->name('admin.rooms.waktu.delete');
Route::get('/admin/rooms/waktu/edit/{id}', [WaktuController::class, 'edit'])->middleware(['auth', 'admin'])->name('admin.waktu.rooms.edit');
Route::post('/admin/rooms/waktu/update/{id}', [WaktuController::class, 'update'])->middleware(['auth', 'admin'])->name('admin.rooms.waktu.update');

Route::get('/admin/rooms/reservasi', [ReservasiController::class, 'index'])->middleware(['auth', 'admin']);
Route::get('/admin/rooms/reservasi/detail/{id}', [ReservasiController::class, 'detail'])->middleware('auth', 'admin');
Route::get('/admin/users/student', [StudentController::class, 'index'])->middleware(['auth', 'admin']);
Route::get('/admin/users/student/edit/{id}', [StudentController::class, 'edit'])->middleware(['auth', 'admin']);
Route::post('/admin/users/student/update/{id}', [StudentController::class, 'update'])->middleware(['auth', 'admin']);
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
