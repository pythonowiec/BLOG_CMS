<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\NotifyController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('posts/{string}', function () {
    return view('show');
});
Route::get('example', function () {
    return view('editor');
});
Route::get('profile', function () {
    return view('profile');
});


Route::group(['prefix' => 'admin_panel'], function () {
    Auth::routes();
    Route::get('/', function() {
        return redirect('admin_panel/posts');
    })->name('user');
    Route::get('/posts', function () {
        return view('admin');
    })->name('posts');
    Route::get('/add', function () {
        return view('editor');
    })->name('add');
    Route::get('/edit/{string}', function () {
        return view('edit');
    })->name('edit');
   
    
});
// Route::name('admin.')->group(function () {
//     Auth::routes();
//     Route::get('/', function () {
//         return view('editor');
//     });
// });

Route::get('test/{name}', function ($name) {
    event(new App\Events\CommentAdded($name));
    return "Event has been sent!";
});

Route::get('notifications', [NotifyController::class, 'index']);
Route::post('notification', [NotifyController::class, 'send']);
Route::post('viewed', [NotifyController::class, 'markAsViewed']);
Route::get('notviewed', [NotifyController::class, 'getNotViewed']);


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/api/private', function () {
    return response()->json([
        'message' => 'Hello from a private endpoint! You need to be authenticated to see this.',
        'authorized' => Auth::check(),
        'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize']);

    Route::get('/api/private-scoped', function () {
        return response()->json([
            'message' => 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
            'authorized' => Auth::check(),
            'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
        ], 200, [], JSON_PRETTY_PRINT);
    })->middleware(['auth0.authorize:read:messages']);


