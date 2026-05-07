<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'component_id',
        'title',
        'tagline',
        'category',
        'used',
        'specs_json',
        'status',
        'volume',
        'product_key',
        'id_log', 
        'brand'
    ];

    public function component()
    {
        return $this->belongsTo(Component::class);
    }

    public function variations()
    {
        return $this->hasMany(Variation::class);
    }
}