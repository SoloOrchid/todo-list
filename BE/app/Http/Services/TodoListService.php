<?php

namespace App\Http\Services;

use App\Models\Status;
use App\Models\TodoList;
use App\Models\User;

class TodoListService
{
    public function create(User $user, $input, $parent = null, $status = null)
    {
        if($status === null) {
            $status = 'open';
        }

        return TodoList::create([
            'user_id' => $user->id,
            'sub_of_id' => $parent,
            'status_id' => Status::where('status', $status)->first()->id,
            'title' => $input['title'],
            'description' => $input['description'],
        ]);
    }
    public function update(TodoList $todoList, array $input, $status = null)
    {
        $todoList->update([
            'status_id' => $status->id ?? $todoList->status_id,
            'title' => $input['title'],
            'description' => $input['description'],
        ]);

        return TodoList::find($todoList->id);
    }
    public function delete(TodoList $todoList)
    {
        $todoList->delete();
    }
}
