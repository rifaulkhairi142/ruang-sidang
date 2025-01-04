<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('mahasiswa_tbl', function (Blueprint $table) {
            $table->id();
            $table->string('nim');
            $table->string('link_nota')->nullable();
            $table->string('status')->default('5'); //1. Inreview, 2.Revisi, 3.Ditolak, 4. Diterima, 5. Draft
            $table->unsignedBigInteger('id_prodi')->nullable();
            $table->text('message')->nullable();
            $table->foreign('nim')->references('username')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_prodi')->references('id')->on('prodi_tbl')->onDelete('set null');

            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('mahasiswa_tbl');
    }
};
