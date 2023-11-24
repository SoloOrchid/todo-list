<?php

namespace App\Models;

use App\Models\Scopes\NoSubScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sub_of_id',
        'status_id',
        'title',
        'description',
    ];

//    protected static function booted(): void
//    {
//        static::addGlobalScope(new NoSubScope);
//    }

    /**
     * the owner of the list and all items created under it
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relationship to itself
    public function sublists()
    {
        return $this->hasMany(TodoList::class, 'sub_of_id');
    }

    // Relationship to its parent
    public function parent()
    {
        return $this->belongsTo(TodoList::class, 'sub_of_id');
    }

    public function items()
    {
        return $this->hasMany(TodoItem::class, 'list_id');
    }

    /**
     * the status of the model
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }
}
