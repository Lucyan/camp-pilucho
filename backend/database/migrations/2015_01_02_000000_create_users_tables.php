<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTables extends Migration
{

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {

    Schema::create('users', function($table){
      $table->increments('id');
      $table->string('name');
      $table->string('email');
      $table->string('password');
      $table->rememberToken();
      $table->softDeletes();
      $table->timestamps();
    });

    Schema::create('user_credentials', function($table){
      $table->increments('id');
      $table->integer('user_id');
      $table->string('provider');
      $table->string('provider_endpoint');
      $table->string('oauth_token');
      $table->binary('data');
      $table->softDeletes();
      $table->timestamps();
    });

  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::drop('user_credentials');
    Schema::drop('users');
  }

}
