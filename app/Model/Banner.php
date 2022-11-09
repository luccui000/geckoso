<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $table = 'banners';

    const INACTIVE  = 0;
    const ACTIVE    = 1;

    protected $fillable = [
        'title',
        'link',
        'desktop_image',
        'mobile_image',
        'order',
        'active',
    ];
}
