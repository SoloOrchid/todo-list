<?php

namespace App\Http\Services;

use App\Models\Status;
use App\Models\User;

class StatusService
{
    public function create(User $user, string $name, string $color)
    {
        return Status::create([
            'user_id' => $user->id,
            'status' => $name,
            'color' => $color
        ]);
    }

    public function update(Status $status, string $name, string $color)
    {
        $status->update([
            'name' => $name,
            'color' => $color
        ]);

        return Status::find($status->id);
    }

    public function delete(Status $status)
    {
        $status->delete();
    }
}
