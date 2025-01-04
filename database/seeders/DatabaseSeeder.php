<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\Mahasiswa;
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

        foreach ($status_code as $cd) {
            StatusCode::create($cd);
        }

        foreach ($data_mahasiswa as $itm) {
            User::factory()->create($itm);
            Mahasiswa::create([
                'nim' => Str::before($itm['email'], '@')
            ]);
        }


        for ($i = 1; $i < 13; $i++) {
            RoomModel::factory()->create([
                'name' => 'Ruang Sidang ' . $i,
            ]);
        }
        RoomModel::factory()->count(10)->create();


        Dosen::factory()->count(10)->create();
    }
}
