<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(Request $request)
    {
        $input = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
        ]);

        $user = $this->userService->create($input);
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function login(Request $request)
    {
        $input = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if(!Auth::attempt(['email' => $input['email'], 'password' => $input['password']])) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        $user = $this->userService->findByEmail($input['email']);

        return response()->json([
            'user' => $user,
            'token' => $this->userService->createToken($user),
        ]);
    }

    public function logout(Request $request)
    {
        $this->userService->logout($request->user());

        return response()->json('', 204);
    }
}
