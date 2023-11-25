<?php

namespace App\Http\Services;

use App\Models\Status;
use App\Models\TodoItem;
use App\Models\TodoList;

class TodoItemService
{
    public function create(TodoList $todoList, $input)
    {
        return TodoItem::create([
            'list_id' => $todoList->id,
            'title' => $input['title'],
            'check' => $input['check'],
        ]);
    }
    public function update(TodoItem $todoItem, $input)
    {
        $todoItem->update([
            'title' => $input['title'],
            'check' => $input['check']
        ]);

        return TodoItem::find($todoItem->id);
    }
}
