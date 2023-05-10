<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CalculationController;
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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::get('me', 'profile');
});

Route::controller(CalculationController::class)->group(function () {
    Route::get('calculate', 'calculate');
    Route::get('history', 'getHistory');
    Route::delete('history', 'clearHistory');
    Route::delete('history/{id}', 'deleteHistory');
});

Route::get("/noauth", function () {
    return 'Bad Request';
})->name('noauth');
