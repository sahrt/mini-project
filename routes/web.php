<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('pengguna', [UsersController::class, 'index'])->middleware(['auth', 'verified'])->name('pengguna.index');
Route::get('pengguna/create', [UsersController::class, 'create'])->middleware(['auth', 'verified'])->name('pengguna.create');
Route::get('/pengguna/{user}/edit', [UsersController::class, 'edit'])->name('pengguna.edit');
Route::post('pengguna/create', [UsersController::class, 'store'])->middleware(['auth', 'verified'])->name('pengguna.store');
Route::put('pengguna/update/{user}', [UsersController::class, 'updateUser'])->middleware(['auth', 'verified'])->name('pengguna.updateUser');
Route::delete('pengguna/delete/{user}', [UsersController::class, 'deleteUser'])->middleware(['auth', 'verified'])->name('pengguna.deleteUser');
Route::get('activity-log', [ActivityLogController::class, 'index'])->middleware(['auth', 'verified'])->name('activity-log.index');
Route::get('activity-log/detail/{id}', [ActivityLogController::class, 'detail'])->middleware(['auth', 'verified'])->name('activity-log.detail');


require __DIR__.'/settings.php';
