<?php

namespace App\Repositories;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Container\Container as App;

abstract class AbstractRepository
{
    /**
     * @var App
     */
    private $app;

    /**
     * @var Model|Builder
     */
    protected $model;

    /**
     * AbstractRepository constructor.
     *
     * @param App $app
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function __construct(App $app)
    {
        $this->app = $app;
        $this->makeModel();
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    abstract protected function model(): string;

    /**
     * @param array $columns
     * @return Collection
     */
    public function all(array $columns = ['*']): Collection
    {
        return $this->model
            ->get($columns);
    }

    /**
     * @param int $perPage
     * @param array $columns
     * @return LengthAwarePaginator
     */
    public function paginate($perPage = 10, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->model
            ->paginate($perPage, $columns);
    }

    /**
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        $this->model->fill($data);
        $this->model->save();

        return $this->model;
    }

    /**
     * @param $id
     * @param array $data
     * @param string $attribute
     * @return bool
     */
    public function update($id, array $data, $attribute = 'id'): bool
    {
        return $this->model
            ->where($attribute, '=', $id)
            ->update($data);
    }

    /**
     * @param $id
     * @return bool
     */
    public function delete($id): bool
    {
        return $this->model
            ->destroy($id);
    }

    /**
     * @param $id
     * @param array $columns
     * @return mixed
     */
    public function find($id, array $columns = ['*'])
    {
        return $this->model
            ->find($id, $columns);
    }

    /**
     * @return Model|mixed
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function makeModel()
    {
        $model = $this->app->make($this->model());

        if (!$model instanceof Model) {
            throw new \RuntimeException("Class {$this->model()} must be an instance of " . Model::class);
        }

        return $this->model = $model;
    }
}
