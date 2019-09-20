<?php

use Illuminate\Database\Seeder;

class PostTagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = App\Tag::all();

        App\Post::all()->each(function (App\Post $post) use ($tags) {
            $post->tags()->attach(
                $tags->random(random_int(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
