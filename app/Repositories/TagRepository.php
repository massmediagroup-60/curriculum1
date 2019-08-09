<?php

namespace App\Repositories;

class TagRepository extends AbstractRepository
{
    /**
     * Specify Tag class name
     *
     * @return string
     */
    protected function model(): string
    {
        return \App\Tag::class;
    }
}
