<?php

namespace App\Http\Services;

use App\Models\Product;
use App\Models\Variation;
use App\Models\Log; 
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function list()
    {
        $products = Product::with('variations')
        ->where('status', 'in_production')
        ->get();

        return $products->map(function ($product) {

            $specs = json_decode($product->specs_json, true);

            $variants = $product->variations->map(function ($variation) use ($product) {
                return [
                    'id' => $variation->id,
                    'label' => $variation->label,
                    'color' => $variation->color,
                    'textColor' => $variation->color,
                    'image' => $variation->url_image,
                    'volume' => $product->volume,
                    'featured' => (bool) $variation->emphasis,
                ];
            });

            return [
                'id' => $product->id,
                'title' => $product->title,
                'tagline' => $product->tagline,
                'category' => $product->category,
                'volume' => $product->volume,
                'brand' =>  'Teiú',
                'usage' => $product->used,
                'specs' => $specs,
                'defaultVariantId' => $variants->first()['id'] ?? null,
                'variants' => $variants,
            ];
        });
    }

}