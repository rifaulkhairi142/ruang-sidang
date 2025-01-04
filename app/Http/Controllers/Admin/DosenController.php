<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/Data/Dosen/ListDosen', ['base_url' => url('/')]);
    }

    public function all(Request $request)
    {
        $query = Dosen::query();
        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where('name', 'like', '%' . $request->search_key . '%');
        }
        $query->selectRaw(
            'ROW_NUMBER() OVER (ORDER BY id) AS row_index, dosen_tbl.*'
        );
        $data = $query->paginate(10);



        return response()->json($data);
    }

    public function edit($id)
    {
        $dosen = Dosen::find($id);

        return Inertia::render('Admin/Data/Dosen/EditDosen', ['dosen' => $dosen]);
    }

    public function delete($id)
    {
        $dosen = Dosen::find($id);
        $result = $dosen->delete();
        return response()->json($result);
    }

    public function add()
    {

        return Inertia::render('Admin/Data/Dosen/AddDosen');
    }

    public function save(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'nip' => 'required|regex:/^\d{5,17}$/'
        ], [
            'name.required' => 'Nama wajib diisi',
            'nip.required' => 'NIP/NIDN wajib diisi',
            'nip.regex' => 'NIP/NIDN berupa angka dengan panjang dari 5 s.d 17 digit'

        ]);

        $result = Dosen::create($validated);
        if ($result) {
            return redirect('/admin/data/dosen')->with('messsage', ['success' => 'Menambahkan dosen']);
        }
        return redirect('/admin/data/dosen')->with('message', ['error' => 'Gagal menambahkan dosen']);
    }

    public function update(Request $request, $id)
    {
        $dosen = Dosen::find($id);

        $validated = $request->validate([
            'name' => 'required',
            'nip' => 'required|regex:/^\d{5,17}$/'
        ], [
            'name.required' => 'Nama wajib diisi',
            'nip.required' => 'NIP/NIDN wajib diisi',
            'nip.regex' => 'NIP/NIDN berupa angka dengan panjang dari 5 s.d 17 digit'

        ]);

        $result = $dosen->update($validated);
        if ($result) {
            return redirect('/admin/data/dosen')->with('message', ['success' => 'Berhasil memperbaharui data dosen']);
        }
        return redirect('/admin/data/dosen')->with('message', ['error' => 'Gagal memperbaharui data dosen']);
    }
}
