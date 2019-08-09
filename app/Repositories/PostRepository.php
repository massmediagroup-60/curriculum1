<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class PostRepository extends AbstractRepository
{
    /**
     * Specify Post class name
     *
     * @return string
     */
    protected function model(): string
    {
        return \App\Post::class;
    }

    /**
     * @param string $queryStr
     * @param int $perPage
     * @param array $columns
     * @return LengthAwarePaginator
     */
    public function search(string $queryStr, int $perPage = 10, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->model
            ->whereHas('tags', function (Builder $q) use ($queryStr) {
                $q->where('name', 'like', "%$queryStr%");
            })
            ->orWhere('title', 'like', "%$queryStr%")
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, $columns);
    }

    /**
     * @param int $perPage
     * @param array $columns
     * @return LengthAwarePaginator
     */
    public function paginate($perPage = 10, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->model
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, $columns);
    }
}
