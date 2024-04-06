<?php

namespace Database\Seeders;

use App\Models\Feedback;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'John Wick',
            'email' => 'wick@john.com',
            'password' => 'Password??1',
        ]);

        User::factory(10)->create();

        Feedback::factory(20)->create();
    }
}
