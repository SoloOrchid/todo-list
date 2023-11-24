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
            'description' => 'required|string'
        ]);

        $status = null;
        if($request->has('status')) {
            $status = Status::where('status', $request->query('status'))->first();
        }

        return new TodoItemResource($this->todoItemService->create($todoList, $input, $status));
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
            'description' => 'required|string',
            'status' => 'required|numeric'
        ]);

        if($todoItem->list_id != $todoList->id) {
            return response()->json('this item belongs to another list', 404);
        }

        $status = Status::findOrFail($input['id']);
        $this->todoItemService->update($todoItem, $input);

        return new TodoItemResource(TodoItem::find($todoItem->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoItem $todoItem)
    {
        $todoItem->delete();

        return response()->json('', 204);
    }
}
