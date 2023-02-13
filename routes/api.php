<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('posts', [PostController::class, 'index']);
Route::post('posts', [PostController::class, 'store'])->middleware(['auth0.authorize']);
Route::get('posts/{title}', [PostController::class, 'show']);
Route::get('posts/{id}/edit', [PostController::class, 'edit']);
Route::put('posts/{id}', [PostController::class, 'update'])->middleware(['auth0.authorize']);
Route::delete('posts/{id}', [PostController::class, 'destroy'])->middleware(['auth0.authorize']);
// Route::resource('posts', PostController::class)->middleware('auth0.authorize')->except(['index', 'show', 'edit']);
// Route::get('posts', [PostController::class, 'index']);
// Route::get('posts/{title}', [PostController::class, 'show']);

Route::get('posts/{id}/edit', [PostController::class, 'edit']);
Route::resource('posts', PostController::class);

Route::resource('comments', CommentController::class);
Route::post('likes', [CommentController::class, 'addLike']);
Route::post('dislikes', [CommentController::class, 'addDislike']);
Route::get('vis/{comment}', [CommentController::class, 'getVisitors']);
// Route::get('notifications/{type}', [NotificationController::class, 'index']);
// Route::post('notification', [ProductController::class, 'send']);

Route::get('/public', function () {
    return response()->json([
        'message' => 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
        'authorized' => Auth::check(),
        'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize.optional']);