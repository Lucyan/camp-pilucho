<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateWinnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        if (Schema::hasTable('winners')) {
            Schema::table('winners', function ($table) {
                $table->integer('record_id');
                $table->boolean('active')->default(0);
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
        if (Schema::hasColumn('winners', 'record_id')) {
            Schema::table('winners', function ($table) {
                $table->dropColumn('record_id');
            });
        }

        if (Schema::hasColumn('winners', 'active')) {
            Schema::table('winners', function ($table) {
                $table->dropColumn('active');
            });
        }
    }
}
