<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $loginUserData = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required',
        ]);

        if (!auth()->attempt($loginUserData)) {
            return response(['message' => 'Invalid credentials']);
        }
    }

    public function logout()
    {
        auth()->logout();
    }
}
