<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'color',
    ];

    /**
     * the status for the todo lists
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function list()
    {
        return $this->hasMany(TodoList::class, 'status_id');
    }

    /**
     * the status for the todo items
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tasks()
    {
        return $this->hasMany(TodoItem::class, 'status_id');
    }
}
