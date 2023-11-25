<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Http\Services\StatusService;
use App\Models\Status;
use App\Services\UserService;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $userService = new UserService();
        $statusService = new StatusService();

        $admin = $userService->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => 'password',
        ]);

        $statusArr = ['open' => '#3498db', 'done' => '#2ecc71', 'in process' => '#f39c12', 'overdue' => '#e74c3c', 'new info' => '#8e44ad'];
        foreach($statusArr as $s => $status) {
            Status::create([
                'status' => $s,
                'color' => $status
            ]);
        }
    }
}
