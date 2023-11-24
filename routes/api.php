<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoItemController;
use App\Http\Controllers\TodoListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('/list')->group(function () {
        Route::get('/', [TodoListController::class, 'index']);
        Route::get('/{todoList}', [TodoListController::class, 'show']);
        Route::post('/', [TodoListController::class, 'create']);
        Route::put('/{todoList}', [TodoListController::class, 'update']);
        Route::delete('/{id}', [TodoListController::class, 'destroy']);
    });

    Route::prefix('/item')->group(function () {
        Route::get('/', [TodoItemController::class, 'index']);
        Route::get('/{todoItem}', [TodoItemController::class, 'show']);
        Route::post('/{todoList}', [TodoItemController::class, 'create']);
        Route::put('/{todoList}/{item}', [TodoItemController::class, 'update']);
        Route::delete('/{todoList}/{item}', [TodoItemController::class, 'delete']);
    });

});

