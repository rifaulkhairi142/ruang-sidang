<?php

namespace App\Http\Controllers\Students;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use App\Models\User;
use Exception;
use Illuminate\Container\Attributes\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB as FacadesDB;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {

        return Inertia::render('Students/Profile', ['base_url' => url('/')]);
    }
    public function view(Request $request)
    {
        $data = Mahasiswa::where('nim', $request->username)->first();
        return response()->json($data);
    }

    public function update(Request $request)
    {
        $data_mahasiswa = Mahasiswa::where('nim', $request->username)->first();

        FacadesDB::beginTransaction();
        try {
            if ($request->hasFile('nota')) {
                $file = $request->file('nota');

                $custome_file_name = 'nota_' . $request->username . '.' . $file->getClientOriginalExtension();
                $file_path = $file->storeAs('nota', $custome_file_name, 'public');

                $data_mahasiswa->update([
                    'status' => '1',
                    'link_nota' => $file_path,
                ]);
                FacadesDB::commit();
                return response()->json(['message' => 'success']);
            }
        } catch (Exception $e) {
            FacadesDB::rollBack();
            return response()->json(['message' => $e->getMessage()]);
        }
    }
}
