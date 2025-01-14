<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Student
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->role != 'student') {
            if ($request->user()->role == 'opt_prodi') {
                return redirect('/operator-prodi/dashboard');
            }
            return redirect('/admin/dashboard');
        }
        return $next($request);
    }
}
