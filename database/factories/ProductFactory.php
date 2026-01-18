<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'   => ucfirst(fake()->words(2, true)), // E.g., "Ergonomic Rubber Shirt"
            'sku'    => fake()->unique()->ean8(),          // 8-digit barcode
            'price'  => fake()->randomFloat(2, 100, 5000), // Random price 100-5000
            'stock'  => fake()->numberBetween(0, 100),     // Random stock

            'category' => fake()->randomElement(['Electronics', 'Clothing', 'Home & Living', 'Toys', 'Books']),
            'status' => 'active',
            'image' => 'https://placehold.co/400',
            'description' => fake()->sentence(),
        ];
    }
}
