<?php

use Illuminate\Support\Facades\Route;

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
    })->middleware('auth')->name('add');
    Route::get('/edit/{string}', function () {
        return view('edit');
    })->middleware('auth')->name('edit');
   
    
});
// Route::name('admin.')->group(function () {
//     Auth::routes();
//     Route::get('/', function () {
//         return view('editor');
//     })->middleware('auth');
// });

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');




