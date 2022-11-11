<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $table = 'rates';

    protected $fillable = [
        'name',
        'role',
        'avatar',
        'vote',
        'content',
        'status',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_rates');
    }

    public function getAvatarAttribute()
    {
        $defaultImage = url('public/images/no_photo.jpg');
        if(!$this->attributes['avatar'])
            return $defaultImage;

        return url('/public/storage/' . ltrim($this->attributes['avatar'], '/'));
    }
}
