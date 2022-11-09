<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class PolicySetting extends Model
{
    protected $table = 'policy_settings';

    protected $fillable = [
        'title',
        'content',
        'href',
        'order',
        'active',
    ];

}
