<?php

namespace App\Http\Controllers;

use App\Http\Services\StatusService;
use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    private $statusService;

    public function __construct(StatusService $statusService)
    {
        $this->statusService = $statusService;
    }

    public function index(Request $request)
    {
        return Status::where(function ($query) use ($request) {
            $query->where('user_id', null)
                ->orWhere('user_id', $request->user()->id);
        })->get();
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7',
        ]);

        return response()->json([
            'data' => $this->statusService->create($request->user(), $input['name'], $input['color'])
        ], 201);
    }

    public function update(Request $request, Status $status)
    {
        $input = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7',
        ]);

        return response()->json([
            'data' => $this->statusService->update($status, $input['name'], $input['color']),
        ]);
    }

    public function destroy(Status $status)
    {
        $status->delete();
    }
}
