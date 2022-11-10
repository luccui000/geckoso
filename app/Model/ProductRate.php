<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ProductRate extends Model
{
    protected $table = 'product_rates';

    protected $fillable = [
        'product_id',
        'rate_id',
    ];
}
