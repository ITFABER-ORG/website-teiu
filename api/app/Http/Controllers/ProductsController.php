<?php

namespace App\Http\Controllers;

use App\Http\Services\ProductService;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function __construct(
        private ProductService $service
    ) {}

    public function index()
    {
        return response()->json(
            $this->service->list()
        );
    }
    public function getProductById($id)
{
    return response()->json(
        $this->service->getProductById($id)
    );
}

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'tagline' => 'required|string',
            'brand' => 'required|string',
            'category' => 'required|string',
            'usage' => 'required|string',
            'volume' => 'required|string',
            'specs' => 'required|array',
            'variants' => 'required|array|min:1',
        ]);

        return response()->json([
            'message' => 'Produto criado com sucesso',
            'data' => $this->service->create($data)
        ], 201);
    }

    public function update(Request $request, $id)
    {

        
        $data = $request->validate([
            'title' => 'sometimes|string',
            'tagline' => 'sometimes|string',
            'category' => 'sometimes|string',
            'usage' => 'sometimes|string',
            'volume' => 'sometimes|string',
            'specs' => 'sometimes|array',
            'variants' => 'sometimes|array',
            'status' => 'sometimes|in:pending,in_production,rejected',
        ]);
        $data['status'] = $request->status;

        return response()->json([
            'message' => 'Produto atualizado com sucesso',
            'data' => $this->service->update($data, $id)
        ]);
    }
    public function destroy($id)
    {
        $this->service->delete($id);

        return response()->json([
            'message' => 'Produto deletado com sucesso'
        ]);
    }
}