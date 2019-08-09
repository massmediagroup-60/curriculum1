<?php

use App\Post;
use App\User;
use Faker\Generator as Faker;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->text(
            random_int(70, 255)
        ),
        'description' => $faker->paragraph(
            random_int(3, 7)
        ),
        'user_id' => User::all()->random()->id,
    ];
});
