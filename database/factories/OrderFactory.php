<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'total_amount'  => fake()->randomFloat(2, 500, 20000),
            'status'        => fake()->randomElement(['pending', 'completed', 'cancelled']),

            // TRICK: Random date mula "30 days ago" hanggang "ngayon".
            // Kung wala ito, isang tuldok lang ang makikita mo sa chart.
            'created_at'    => fake()->dateTimeBetween('-30 days', 'now'),
            'updated_at'    => now(),
        ];
    }
}
