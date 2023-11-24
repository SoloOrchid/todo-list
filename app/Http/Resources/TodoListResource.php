<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "sub" => TodoListResource::collection($this->whenLoaded('sublists')),
            "status" => $this->status->status,
            "title" => $this->title,
            'items' => TodoItemResource::collection($this->items),
            "description" => $this->description,
            "updated_at" => $this->updated_at,
        ];
    }
}
