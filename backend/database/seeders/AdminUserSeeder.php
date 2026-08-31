<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'tinatuntun@kisahdetik.id'],
            [
                'name' => 'Tina Tuntun',
                'password' => Hash::make('tinatuun kicik pendek'),
                'is_admin' => true,
            ]
        );
    }
}
