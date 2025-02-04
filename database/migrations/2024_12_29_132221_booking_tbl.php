<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('booking_tbl', function (Blueprint $table) {
            $table->id();
            $table->string('student_name');
            $table->string('student_nim')->unique();
            $table->unsignedBigInteger('student_id_prodi')->nullable();
            $table->unsignedBigInteger('room_id');
            $table->date('booking_date')->nullable();
            $table->unsignedBigInteger('time_slot_id')->nullable();
            $table->string('username_penguji_1')->nullable();
            // $table->time('start');
            // $table->time('end');
            $table->string('username_penguji_2')->nullable();
            $table->string('username_sekretaris')->nullable();
            $table->string('username_ketua')->nullable();
            $table->string('link_nota')->nullable();
            $table->timestamps();

            $table->foreign('username_ketua')->references('nip')->on('dosen_tbl')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('username_penguji_1')->references('nip')->on('dosen_tbl')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('username_penguji_2')->references('nip')->on('dosen_tbl')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('username_sekretaris')->references('nip')->on('dosen_tbl')->onDelete('set null')->onUpdate('cascade');
            $table->foreign('time_slot_id')->references('id')->on('data_waktu_tbl')->onDelete('set null');
            $table->foreign('room_id')->references('id')->on('data_ruang_tbl')->onDelete('cascade');
            $table->foreign('student_id_prodi')->references('id')->on('prodi_tbl')->onDelete('set null')->onUpdate('cascade');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('booking_tbl');
    }
};
