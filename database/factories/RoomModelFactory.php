<?php

namespace Database\Factories;

use App\Models\RoomModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RoomModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = RoomModel::class;
    public function definition(): array
    {
        return [
            "name" => fake()->sentence(10)
        ];
    }
}
