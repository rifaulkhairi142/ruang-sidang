<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminProdi;
use App\Models\Booking;
use App\Models\Prodi;
use App\Models\User;
use Exception;
use Illuminate\Container\Attributes\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

use function Pest\Laravel\json;

class AdminProdiController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/ListOpProdi', ['base_url' => url('/')]);
        // return Inertia::render('Admin/Users/AddOpProdi', ['base_url' => url('/')]);
    }
    public function info(Request $request)
    {
        $data = AdminProdi::where('email', $request->email)->first();
        return response()->json($data);
    }

    public function all(Request $request)
    {
        $query = User::where('role', 'opt_prodi')
            ->join('opt_prodi_tbl as opt_t', 'users.email', '=', 'opt_t.email')
            ->join('prodi_tbl as pd_t', 'opt_t.id_prodi', '=', 'pd_t.id');
        if ($request->has('search_key') && !empty($request->search_key)) {
            $query->where('users.name', 'like', '%' . $request->search_key . '%');
        }
        $query->selectRaw(
            'ROW_NUMBER() OVER (ORDER BY users.name) AS row_index,
                    users.id,
                    users.name as name,
                    users.email as email,
                    pd_t.name as nama_prodi'
        );
        $data = $query->paginate(10);

        return response()->json($data);
    }

    public function add()
    {
        $prodi = Prodi::all();


        return Inertia::render('Admin/Users/AddOpProdi', ['listProdi' => $prodi]);
    }

    public function view($id)
    {
        return Inertia::render('AdminProdi/Users/EditOpProdi');
    }

    public function delete($id)
    {
        $user = User::find($id);
        $result = $user->delete();
        if ($result) {
            return response()->json('success');
        } else {
            return response()->json('error');
        }
    }

    public function edit($id) {}

    public function update(Request $request) {}



    public function save(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'unique:' . User::class, 'email'],
            'username' => ['required', 'unique:' . User::class],
            'password' => ['required', Rules\Password::defaults()],
            'id_prodi' => ['required']
        ]);
        FacadesDB::beginTransaction();
        try {

            User::factory()->create([
                'name' => $request->name,
                'email' => $request->username,
                'password' => Hash::make($request->password),
                'username' => $request->username,
                'role' => 'opt_prodi',

            ]);

            AdminProdi::create([
                'email' => $request->email,
                'id_prodi' => $request->id_prodi,
            ]);
            FacadesDB::commit();
            return redirect('/admin/users/operator-prodi')->with('message', ['success' => 'Berhasil Menambahkan Operator Prodi']);
        } catch (Exception $e) {
            FacadesDB::rollBack();
            return redirect('/admin/users/operator-prodi')->with('message', ['error' => $e->getMessage()]);
        }
    }
}
