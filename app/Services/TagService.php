<?php

namespace App\Services;

use App\Repositories\TagRepository;
use App\Tag;

class TagService
{
    /**
     * @var TagRepository
     */
    private $tagRepository;

    /**
     * TagService constructor.
     *
     * @param TagRepository $tagRepository
     */
    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * @param array $attrsList
     * @return array
     */
    public function createFromList(array $attrsList): array
    {
        $created = [];
        foreach ($attrsList as $name) {
            $created[] = $this->create([
                'name' => $name
            ]);
        }

        return $created;
    }

    /**
     * @param array $attrs
     * @return Tag|\Illuminate\Database\Eloquent\Model
     */
    private function create(array $attrs): Tag
    {
        return $this->tagRepository
            ->create($attrs);
    }
}
