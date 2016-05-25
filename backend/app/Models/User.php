<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class User extends Model
{

    public function recordings()
    {
        return $this->hasMany('App\Models\Record');
    }
}