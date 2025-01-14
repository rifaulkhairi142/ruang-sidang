<?php

use App\Http\Controllers\Admin\AdminProdiController;
use App\Http\Controllers\Admin\DosenController;
use App\Http\Controllers\Admin\ProdiController;
use App\Http\Controllers\Admin\ReservasiController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\WaktuController;
use App\Http\Controllers\Students\BookingController;
use App\Http\Controllers\Students\HomeController;
use App\Http\Controllers\Students\ProfileController;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\Dashboard;
use App\Http\Controllers\OperatorProdi\BookingController as OperatorProdiBookingController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/admin/rooms/waktu', [WaktuController::class, 'all']);
Route::get('/admin/rooms', [RoomController::class, 'all']);
Route::post('/admin/rooms/delete/{id}', [RoomController::class, 'delete'])->name('admin.rooms.delete');
Route::get('/admin/data/dosen', [DosenController::class, 'all'])->name('admin.data.dosen.all');
Route::post('/admin/data/dosen/delete/{id}', [DosenController::class, 'delete'])->name('admin.data.dosen.delete');
Route::get('/admin/data/prodi', [ProdiController::class, 'all'])->name('admin.data.prodi.all');
Route::post('/admin/data/prodi/delete/{id}', [ProdiController::class, 'delete'])->name('admin.data.prodi.delete');
Route::post('/admin/users/student/delete/{id}', [StudentController::class, 'delete']);
Route::get('/admin/users/student', [StudentController::class, 'all']);

Route::get('/admin/rooms/reservasi', [ReservasiController::class, 'all']);
Route::post('/admin/rooms/reservasi/delete/{id}', [ReservasiController::class, 'delete']);
Route::post('/booking/proceed', [BookingController::class, 'booking']);
Route::post('/profile/update', [ProfileController::class, 'update']);
Route::get('/profile', [ProfileController::class, 'view']);
Route::get('/data/booking', [HomeController::class, 'all']);

Route::get('/admin/users/operator-prodi', [AdminProdiController::class, 'all']);
Route::post('/admin/users/operator-prodi/delete/{id}', [AdminProdiController::class, 'delete']);
Route::post('/operator-prodi/booking/proceed', [OperatorProdiBookingController::class, 'booking']);
Route::get('/operator-prodi/rooms/reservasi', [OperatorProdiBookingController::class, 'all']);
Route::post('/operator-prodi/rooms/reservasi/delete/{id}', [OperatorProdiBookingController::class, 'delete']);
Route::get('/operator-prodi/info', [AdminProdiController::class, 'info']);
