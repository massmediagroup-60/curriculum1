<?php

use App\Tag;
use Faker\Generator as Faker;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Tag::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->word,
    ];
});
