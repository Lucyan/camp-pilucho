<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIsadminUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        if (Schema::hasTable('users')) {
            Schema::table('users', function ($table) {
                $table->boolean('is_admin')->default(0);
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        if (Schema::hasColumn('users', 'is_admin')) {
            Schema::table('users', function ($table) {
                $table->dropColumn('is_admin');
            });
        }
    }
}
