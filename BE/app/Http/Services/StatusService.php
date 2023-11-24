<?php

namespace App\Http\Services;

use App\Models\Status;

class StatusService
{
        public function create(string $name, string $color)
        {
            return Status::create([
                'status' => $name,
                'color' => $color
            ]);
        }
}
