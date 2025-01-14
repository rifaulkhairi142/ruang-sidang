<?php

namespace App\Http\Middleware;

use App\Models\AdminProdi;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'user_data' => fn() => $request->user() && $request->user()->role === 'opt_prodi'
                    ? AdminProdi::where('email', $request->user()->email)
                    ->join('prodi_tbl as prd_tbl', 'opt_prodi_tbl.id_prodi', '=', 'prd_tbl.id')
                    ->select('prd_tbl.kode')
                    ->first()
                    : null,
            ],
        ];
    }
}
