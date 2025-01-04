<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdiController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Data/Prodi/ListProdi', ['base_url' => url('/')]);
    }

    public function all(Request $request)
    {
        $query = Prodi::query();
        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where('name', 'like', '%' . $request->search_key . '%');
        }
        $query->selectRaw(
            'ROW_NUMBER() OVER (ORDER BY id) AS row_index, prodi_tbl.*'
        );
        $data = $query->paginate(10);



        return response()->json($data);
    }

    public function add()
    {
        return Inertia::render('Admin/Data/Prodi/AddProdi');
    }

    public function edit($id)
    {
        $prodi = Prodi::find($id);

        return Inertia::render('Admin/Data/Prodi/EditProdi', ['prodi' => $prodi]);
    }

    public function save(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required',
                'kode' => 'required|unique:prodi_tbl,kode',
            ],
            [
                'name.required' => 'Nama wajib diisi',
                'kode.required' => 'Kode wajib diisi',
                'kode.unique' => 'Kode harus unik'
            ]
        );

        $result = Prodi::create($validated);
        if ($result) {
            return redirect('/admin/data/prodi')->with('message', ['success' => 'Berhasil menambahkan prodi']);
        }
        return redirect('/admin/data/prodi')->with('message', ['error' => 'Gagal menambahkan prodi']);
    }

    public function delete($id)
    {
        $prodi = Prodi::find($id);
        $result = $prodi->delete();

        return response()->json($result);
    }

    public function update(Request $request, $id)
    {

        $prodi = Prodi::find($id);

        $validated = $request->validate(
            [
                'name' => 'required',
                'kode' => 'required',
            ],
            [
                'name.required' => 'Nama wajib diisi',
                'kode.required' => 'Kode wajib diisi',
            ]
        );

        $result = $prodi->update($validated);
        if ($result) {
            return redirect('/admin/data/prodi')->with('message', ['success' => 'Data prodi berhasil diupdate']);
        }
        return redirect('/admin/data/prodi')->with('message', ['error' => 'Data prodi gagal diupdate']);
    }
}
