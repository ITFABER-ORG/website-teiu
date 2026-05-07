<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variation extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'label',
        'color',
        'url_image',
        'emphasis'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}