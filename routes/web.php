<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FeedbackController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/feedback/index', [FeedbackController::class, 'index'])->name('feedback.index');
    Route::get('/feedback/form', [FeedbackController::class, 'form'])->name('feedback.form');
    Route::patch('/feedback/submit', [FeedbackController::class, 'submit'])->name('feedback.submit');
    Route::get('/feedback/{id}', [FeedbackController::class, 'get'])->name('feedback.get');
    Route::post('/feedback/comment', [FeedbackController::class, 'comment'])->name('feedback.comment');
});

require __DIR__.'/auth.php';
