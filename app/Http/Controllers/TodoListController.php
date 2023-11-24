<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoListResource;
use App\Http\Services\TodoListService;
use App\Models\Status;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    private $todoListService;
    public function __construct(TodoListService $todoListService)
    {
        $this->todoListService = $todoListService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return TodoListResource::collection(TodoList::with(['sublists', 'parent'])->where('user_id', $request->user()->id)->whereNull('sub_of_id')->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $input = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $parent = null;
        if($request->has('parent')) {
            $parent = TodoList::find($request->query('parent'));
        }

        $status = null;
        if($request->has('status')) {
            $status = Status::where('status', $request->query('status'))->first();
        }

        return new TodoListResource($this->todoListService->create($request->user(), $input, $parent, $status));
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoList $todoList)
    {
        return new TodoListResource(TodoList::with(['sublists', 'parent', 'items'])->where('id', $todoList->id)->first());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TodoList $todoList)
    {
        $input = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|numeric'
        ]);

        $status = Status::findOrFail($input['status']);

        $this->todoListService->update($todoList, $input, $status);

        return new TodoListResource(TodoList::find($todoList->id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoList $todoList)
    {
        $todoList->delete();

        return response()->json('', 204);
    }
}
