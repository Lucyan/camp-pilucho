<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function() use ($app) {
    return $app->welcome();
});

$app->group(["prefix" => "user", "namespace" => "App\Http\Controllers"], function ($app) {

	$app->post('login', [
		'as' => 'userLogin',
		'uses' => 'UserController@login'
	]);

	$app->get('me', [
		'as' => 'userMe',
		'middleware' => 'auth',
		'uses' => 'UserController@me'
	]);

	$app->post('upload', [
		'as' => 'userUpload',
		'middleware' => 'auth',
		'uses' => 'UserController@upload'
	]);

	$app->post('newrecord', [
		'as' => 'userNewRecord',
		'middleware' => 'auth',
		'uses' => 'UserController@newRecord'
	]);
});

$app->group(["prefix" => "galeria", "namespace" => "App\Http\Controllers"], function ($app) {

	$app->get('/', [
		'as' => 'getGaleria',
		'uses' => 'GaleriaController@get'
	]);

	$app->get('/get', [
		'as' => 'getSingleGaleria',
		'uses' => 'GaleriaController@getSingle'
	]);
});

$app->group(["prefix" => "admin", "namespace" => "App\Http\Controllers"], function ($app) {

	$app->get('/galeria', [
		'as' => 'asdminGetGaleria',
		'middleware' => 'admin',
		'uses' => 'GaleriaController@adminGet'
	]);

	$app->post('/toogleactive', [
		'as' => 'toogleActive',
		'middleware' => 'admin',
		'uses' => 'GaleriaController@toogleActive'
	]);

	$app->post('/markwinner', [
		'as' => 'markWinner',
		'middleware' => 'admin',
		'uses' => 'GaleriaController@markWinner'
	]);

	$app->get('/packs', [
		'as' => 'packs',
		'middleware' => 'admin',
		'uses' => 'GaleriaController@packs'
	]);

	$app->post('/toogleactivepack', [
		'as' => 'toogleActivePack',
		'middleware' => 'admin',
		'uses' => 'GaleriaController@toogleActivePack'
	]);
});