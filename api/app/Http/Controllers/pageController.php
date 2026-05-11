<?php

namespace App\Http\Controllers;
use App\Models\Pages;

use Illuminate\Http\Request;

class pageController extends Controller
{
    public function index(Request $request, $path)
    {
        $language = $request->query('language', 'pt-br');
    
        $page = Pages::with([
            'components' => function ($query) use ($language) {
                $query->where('components.status', 'in_production')
                      ->where('components.language', $language)
                      ->with(['assets', 'texts']);
            },
            'customizationComponent'
        ])->where('path', $path)->first();
    
        if (!$page) {
            return response()->json([
                'message' => 'Página não encontrada'
            ], 404);
        }
    
        $componentsByKey = $page->components
            ->keyBy('key')
            ->map(function ($component) {
    
                $assetsByKey = $component->assets
                    ->keyBy('key')
                    ->map(function ($asset) {
                        return [
                            'id' => $asset->id,
                            'url' => $asset->path,
                        ];
                    });
    
                $textsByKey = $component->texts
                    ->keyBy('key')
                    ->map(function ($text) {
                        return [
                            'id' => $text->id,
                            'content' => $text->content,
                        ];
                    });
    
                return [
                    'id' => $component->id,
                    'key' => $component->key,
                    'language' => $component->language,
                    'texts' => $textsByKey ?? new \stdClass(),
                    'assets' => $assetsByKey ?? new \stdClass(),
                ];
            });
    
        return response()->json([
            'id' => $page->id,
            'name' => $page->name,
            'path' => $page->path,
            'language' => $language,
            'components' => $componentsByKey,
            'customization_component' => $page->customizationComponent
        ]);
    }
}
