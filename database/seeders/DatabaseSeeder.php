<?php

namespace Database\Seeders;

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
        // User::factory(10)->create();

       // 1. Create YOUR Admin Account (Para may login ka)
                User::factory()->create([
                'name' => 'Admin Boss',
                'email' => 'admin@demo.com',
                'password' => bcrypt('password'),
            ]);

            // 2. Gumawa ng 50 Products
            \App\Models\Product::factory(50)->create();

            // 3. Gumawa ng 500 Orders (Para maganda ang Chart curve)
            \App\Models\Order::factory(500)->create();
            }

}
