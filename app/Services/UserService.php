<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function create($input)
    {
        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => bcrypt($input['password']),
        ]);
    }

    public function findByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    public function createToken(User $user)
    {
        $this->logout($user);

        return $user->createToken('auth_token')->plainTextToken;
    }

    public function logout(User $user)
    {
        //delete all other tokens
        $user->tokens()->delete();
    }
}
