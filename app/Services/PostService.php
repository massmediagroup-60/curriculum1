<?php

namespace App\Services;

use App\Post;
use App\Repositories\PostRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class PostService
{
    /**
     * @var PostRepository
     */
    private $postRepository;

    /**
     * @var TagService
     */
    private $tagService;

    /**
     * PostService constructor.
     *
     * @param PostRepository $postRepository
     * @param TagService $tagService
     */
    public function __construct(PostRepository $postRepository, TagService $tagService)
    {
        $this->postRepository = $postRepository;
        $this->tagService = $tagService;
    }

    /**
     * @param array $data
     * @return Post|\Illuminate\Database\Eloquent\Model
     */
    public function store(array $data): Post
    {
        $postAttrs = Arr::only($data, [
            'title',
            'description',
        ]);
        $post = $this->createPost($postAttrs);

        $tags = $this->tagService
            ->createFromList($data['tags']);

        $post->tags()->attach(
            Arr::pluck($tags, 'id')
        );

        return $post;
    }

    /**
     * @param array $data
     * @return LengthAwarePaginator
     */
    public function getPosts(array $data): LengthAwarePaginator
    {
        if (Arr::exists($data, 'q')) {
            return $this->postRepository
                ->search($data['q']);
        }

        return $this->postRepository
            ->paginate();
    }

    /**
     * @param array $attrs
     * @return Post|\Illuminate\Database\Eloquent\Model
     */
    private function createPost(array $attrs): Post
    {
        $attrs['user_id'] = Auth::id();

        return $this->postRepository
            ->create($attrs);
    }
}
