<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoItemResource;
use App\Http\Services\TodoItemService;
use App\Models\Status;
use App\Models\TodoItem;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoItemController extends Controller
{
    private $todoItemService;
    public function __construct(TodoItemService $todoItemService)
    {
        $this->todoItemService = $todoItemService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(TodoList $todoList)
    {
        return TodoItemResource::collection(TodoItem::where('list_id', $todoList->id)->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, TodoList $todoList)
    {
        $input = $request->validate([
            'title' => 'required|string',
            'check' => 'required|boolean'
        ]);

        return new TodoItemResource($this->todoItemService->create($todoList, $input));
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoItem $todoItem)
    {
        return new TodoItemResource($todoItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TodoList $todoList, TodoItem $todoItem)
    {
        $input = $request->validate([
            'title' => 'required|string',
            'check' => 'required|boolean',
        ]);

        //dd($todoItem, $todoList);

        if($todoItem->list_id != $todoList->id) {
            return response()->json('this item belongs to another list', 404);
        }

        return new TodoItemResource($this->todoItemService->update($todoItem, $input));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoList $todoList, TodoItem $todoItem)
    {
        $todoItem->delete();

        return response()->json('', 204);
    }
}
