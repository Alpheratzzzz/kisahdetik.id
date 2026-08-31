<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GalleryItemController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('posts', PostController::class);
    Route::apiResource('gallery-items', GalleryItemController::class);
    Route::apiResource('testimonials', TestimonialController::class);
});

Route::get('/public/posts', [PostController::class, 'publicIndex']);
Route::get('/public/gallery-items', [GalleryItemController::class, 'publicIndex']);
Route::get('/public/testimonials', [TestimonialController::class, 'publicIndex']);
