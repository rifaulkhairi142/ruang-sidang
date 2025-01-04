<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RoomModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        // $rooms = RoomModel::all();
        return Inertia::render('Admin/Rooms/Room/Room', [
            'base_url' => url('/'),
            // 'rooms' => $rooms
        ]);
    }

    public function edit($id)
    {
        $room = RoomModel::find($id);
        return Inertia::render('Admin/Rooms/Room/EditRoom', [
            'room' => $room
        ]);
    }

    public function all(Request $request)
    {
        $query = RoomModel::query();
        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where('name', 'like', '%' . $request->search_key . '%');
        }
        $query->selectRaw(
            'ROW_NUMBER() OVER (ORDER BY id) AS row_index, data_ruang_tbl.*'
        );
        $data = $query->paginate(10);



        return response()->json($data);
    }

    public function add()
    {
        return Inertia::render('Admin/Rooms/Room/AddRoom');
    }

    public function save(Request $request)
    {
        $data = ['name' => $request->name];
        $result = RoomModel::create($data);
        if ($result) {
            return redirect('/admin/rooms')->with('message', ['success' => 'Ruangan Berhasil Ditambah']);
        }
        return redirect('/admin/rooms')->with('message', ['error' => 'Ruangan Gagal Ditambah']);
    }

    public function update(Request $request, $id)
    {
        $data = ['name' => $request->name];
        $room = RoomModel::find($id);

        $result = $room->update($data);
        if ($result) {
            return redirect('/admin/rooms')->with('message', ['success' => 'Berhasil Memperbaharui']);
        }
        return redirect('/admin/rooms')->with('message', ['error' => 'Gagal Memperbaharui']);
    }

    public function delete($id)
    {
        $room = RoomModel::find($id);
        $result = $room->delete();
        if ($result) {
            return redirect('/admin/rooms')->with('message', ['success' => 'Ruangan Berhasil Dihapus']);
        }

        return redirect('/admin/rooms')->with('message', ['error' => 'Ruangan Gagal Dihapus']);
    }
}
