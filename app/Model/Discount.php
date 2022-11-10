<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $table = 'discounts';

    protected $fillable = [
        'user_category_id',
        'type',
        'value',
        'active',
    ];

    public function userCategory()
    {
        return $this->belongsTo(UserCategory::class);
    }
}
