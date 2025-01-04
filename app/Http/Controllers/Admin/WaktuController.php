<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WaktuModel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WaktuController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/Rooms/Waktu/Waktu', ['base_url' => url('/')]);
    }

    public function all()
    {
        $data_waktu = WaktuModel::all();
        return response()->json($data_waktu);
    }

    public function edit($id)
    {
        $waktu = WaktuModel::find($id);

        return Inertia::render('Admin/Rooms/Waktu/EditWaktu', ['data_waktu' => $waktu]);
    }
    public function add()
    {
        // dd("hello");
        return Inertia::render('Admin/Rooms/Waktu/AddWaktu', ['base_url' => url('/')]);
    }
    public function update(Request $request, $id)
    {
        $waktu = WaktuModel::find($id);
        $data = [];
        $data['start'] = Carbon::parse($request->start)->setTimezone('Asia/Jakarta')->format('H:i:s');
        $data['end'] = Carbon::parse($request->end)->setTimezone('Asia/Jakarta')->format('H:i:s');

        $result = $waktu->update($data);
        if ($result) {
            return redirect('/admin/rooms/waktu')->with('message', ['error' => 'Berhasil Memperbaharui']);
        }
        return redirect('/admin/rooms/waktu')->with('message', ['error' => 'Gagal memperbaharui']);
    }

    public function save(Request $request)
    {
        $data = [];
        $data['start'] = Carbon::parse($request->start)->setTimezone('Asia/Jakarta')->format('H:i:s');
        $data['end'] = Carbon::parse($request->end)->setTimezone('Asia/Jakarta')->format('H:i:s');

        $result = WaktuModel::create($data);
        if ($result) {
            return redirect('/admin/rooms/waktu')->with('message', ['success' => 'Berhasil Menambahkan Waktu']);
        }
        return redirect('/admin/rooms/waktu')->with('message', ['success' => 'Gagal Menambahkan Waktu']);
    }

    public function delete($id)
    {
        $waktu = WaktuModel::find($id);
        $result = $waktu->delete();
        if ($result) {
            return redirect()->back()->with('message', ['success' => 'Berhasil Menghapus']);
        }
        return redirect()->back()->with('message', ['error' => 'Gagal Menghapus']);
    }
}
