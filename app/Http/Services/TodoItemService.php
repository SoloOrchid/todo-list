<?php

namespace App\Http\Services;

use App\Models\Status;
use App\Models\TodoItem;
use App\Models\TodoList;

class TodoItemService
{
    public function create(TodoList $todoList, $input, $status = null)
    {
        if($status === null) {
            $status = Status::where('status', 'open')->first()->id;
        }

        return TodoItem::create([
            'list_id' => $todoList->id,
            'status_id' => $status,
            'title' => $input['title'],
            'description' => $input['description'],
        ]);
    }
    public function update(TodoItem $todoItem, $input)
    {
        $todoItem->udpate([
            'title' => $input['title'],
            'description' => $input['description'],
            'status_id' => $input['status'],
        ]);
    }
}
