<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UserCategory extends Model
{
    protected $table = 'user_categories';

    protected $fillable = [
        'name',
        'parent_id'
    ];

    public function parent()
    {
        return $this->belongsTo(UserCategory::class, 'parent_id', 'id');
    }

    public function child()
    {
        return $this->hasMany(UserCategory::class, 'parent_id');
    }

    public function discount()
    {
        return $this->hasOne(Discount::class, 'user_category_id', 'id');
    }
}
