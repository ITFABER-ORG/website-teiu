<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductsController;

Route::get('/products', [ProductsController::class, 'index']);
Route::get('/products/{id}', [ProductsController::class, 'getProductbyId']);

Route::get('/test', [ContactController::class, 'test']);
Route::post('/sendEmail', [ContactController::class, 'sendEmail']);
Route::get('/pageWebsite/{path}', [PageController::class, 'index']);
Route::get('/productsEmphasis', [ProductsController::class, 'getProductsWithEmphasisVariants']);
