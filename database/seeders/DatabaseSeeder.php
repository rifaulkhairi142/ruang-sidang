<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use App\Models\RoomModel;
use App\Models\StatusCode;
use App\Models\User;
use App\Models\WaktuModel;
use Database\Factories\RoomFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::factory()->create(
            [
                'name' => 'Rifa Ulkhairi',
                'email' => 'rifaulkhairi05@gmail.com',
                'username' => 'rifaulkhairi05',
                'role' => 'admin',
            ]
        );

        $data_mahasiswa = [
            ['name' => 'Rifa Ulkhairi', 'email' => '200205002@student.ar-raniry.ac.id', 'username' => '200205002'],
            ['name' => 'Arya Putra', 'email' => '200205001@student.ar-raniry.ac.id', 'username' => '200205001'],
            ['name' => 'Naila Salsabila', 'email' => '200205003@student.ar-raniry.ac.id', 'username' => '200205003'],
            ['name' => 'Fahri Ramadhan', 'email' => '200205004@student.ar-raniry.ac.id', 'username' => '200205004'],
            ['name' => 'Aqila Zahra', 'email' => '200205005@student.ar-raniry.ac.id', 'username' => '200205005'],
            ['name' => 'Raka Pratama', 'email' => '200205006@student.ar-raniry.ac.id', 'username' => '200205006'],
            ['name' => 'Anisa Nuraini', 'email' => '200205007@student.ar-raniry.ac.id', 'username' => '200205007'],
            ['name' => 'Dimas Aditya', 'email' => '200205008@student.ar-raniry.ac.id', 'username' => '200205008'],
            ['name' => 'Rizky Amelia', 'email' => '200205009@student.ar-raniry.ac.id', 'username' => '200205009'],
            ['name' => 'Fathan Alfarizi', 'email' => '200205010@student.ar-raniry.ac.id', 'username' => '200205010'],

        ];

        $status_code = [
            ['order' => 1, 'name' => 'In Review'],
            ['order' => 2, 'name' => 'Revisi'],
            ['order' => 3, 'name' => 'Ditolak'],
            ['order' => 4, 'name' => 'Diterima'],
            ['order' => 5, 'name' => 'Draft'],
        ];

        $prodi_data = [
            ['name' => 'Pendidikan Matematika', 'kode' => 'PMA'],
            ['name' => 'Pendidikan Fisika', 'kode' => 'PFS'],
            ['name' => 'Pendidikan Bilogi', 'kode' => 'PBL'],
            ['name' => 'Pendidikan Kimia', 'kode' => 'PKM'],
            ['name' => 'Pendidikan Agama Islam', 'kode' => 'PAI'],
            ['name' => 'Pendidikan Anak Usia Dini', 'kode' => 'PIAUD'],
            ['name' => 'Pendidikan Guru Madrasah Ibtidaiyah', 'kode' => 'PGMI'],
            ['name' => 'Manajemen Pendidikan Islam', 'kode' => 'MPI'],
            ['name' => 'Pendidikan Teknik Elektro', 'kode' => 'PTE'],
            ['name' => 'Pendidikan Teknologi Informasi', 'kode' => 'PTI'],
            ['name' => 'Bimbingan Konseling', 'kode' => 'BK'],
            ['name' => 'Pendidikan Bahasa Inggris', 'kode' => 'PBI'],
            ['name' => 'Pendidikan Bahasa Arab', 'kode' => 'PBA'],
            ['name' => 'Pendidikan Profesi Guru', 'kode' => 'PPG'],

        ];



        foreach ($prodi_data as $dt) {
            Prodi::create($dt);
        }

        foreach ($status_code as $cd) {
            StatusCode::create($cd);
        }

        foreach ($data_mahasiswa as $itm) {
            User::factory()->create($itm);
            Mahasiswa::create([
                'nim' => Str::before($itm['email'], '@')
            ]);
        }


        $data_ruang = [
            ['name' => 'Ruang Sidang 1_UIN103 02'],
            ['name' => 'Ruang Sidang 2_UIN103 08'],
            ['name' => 'Ruang Sidang 3_UIN103 11'],
            ['name' => 'Ruang Sidang 4_UIN103 22'],
            ['name' => 'Ruang Sidang 5_UIN102 05'],
            ['name' => 'Ruang Sidang 6_UIN091 06'],
            ['name' => 'Ruang Sidang 7_UIN092 07'],
            ['name' => 'Ruang Sidang 8_UIN092 08'],
            ['name' => 'Ruang Sidang 9_UIN092 09'],
            ['name' => 'Ruang Sidang 10_UIN 241 01'],
            ['name' => 'Ruang Sidang 11_UIN 242 02'],
            ['name' => 'Ruang Sidang 12_UIN243 03'],


        ];

        $data_waktu = [
            ['start' => '08:00:00', 'end' => '10:00:00'],
            ['start' => '10:00:00', 'end' => '12:00:00'],
            ['start' => '12:00:00', 'end' => '14:00:00'],
            ['start' => '14:00:00', 'end' => '16:00:00'],
            ['start' => '16:00:00', 'end' => '18:00:00'],
        ];

        foreach ($data_waktu as $dt) {
            WaktuModel::create($dt);
        }

        foreach ($data_ruang as $dt) {
            RoomModel::create($dt);
        }


        Dosen::factory()->count(10)->create();
    }
}
