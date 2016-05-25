<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('users', function($table){
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('fb_id');
            $table->string('oauth_token');
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('recordings', function($table){
            $table->increments('id');
            $table->integer('user_id');
            $table->string('audio');
            $table->boolean('active')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('winners', function($table){
            $table->increments('id');
            $table->integer('user_id');
            $table->string('type');
            $table->date('sorteo');
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
        //
        Schema::drop('winner');
        Schema::drop('galery');
        Schema::drop('users');
    }
}
