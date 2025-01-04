<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/Users/ListMahasiswa', ['base_url' => url('/')]);
    }

    public function all(Request $request)
    {
        $query = User::where('role', 'student')
            ->join('mahasiswa_tbl as m_t', 'users.username', '=', 'm_t.nim')
            ->join('status_code_tbl as sc', 'm_t.status', '=', 'sc.id');
        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where('users.name', 'like', '%' . $request->search_key . '%');
        }
        $query->selectRaw(
            'ROW_NUMBER() OVER (ORDER BY sc.order) AS row_index,
                    users.name as name,
                    m_t.nim,
                    sc.name as status'
        );
        $data = $query->paginate(10);



        return response()->json($data);
    }
    public function edit($id)
    {
        $mahasiswa = User::where('username', $id)
            ->join('mahasiswa_tbl as m_t', 'users.username', '=', 'm_t.nim')
            ->select(
                'users.name',
                'users.username',
                'users.email',
                'm_t.link_nota',
                'm_t.status',
                'm_t.message'
            )
            ->first();

        return Inertia::render('Admin/Users/EditMahasiswa', [
            'mahasiswa' => $mahasiswa
        ]);
    }
    public function delete($id)
    {
        $siswa = User::where("username", $id)->first();

        $result = $siswa->delete();
        if ($result) {
            return response()->json(['message' => 'success']);
        }
        return response()->json(['message' => 'Error']);
    }
    public function update(Request $request, $id)
    {
        $mahasiswa = Mahasiswa::where('nim', $id);
        $data = [
            'message' => $request->message,
            'status' => $request->status,
        ];
        $result = $mahasiswa->update($data);
        if ($result) {
            return redirect('/admin/users/student')->with('message', ['success' => 'Data berhasil diperbaharui']);
        }

        return redirect('/admin/users/student')->with('message', ['success' => 'Data gagal diperbaharui']);
    }
}
