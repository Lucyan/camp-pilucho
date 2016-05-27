<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Record extends Model
{
	protected $table = 'recordings';

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}