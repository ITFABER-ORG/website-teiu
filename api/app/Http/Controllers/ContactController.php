<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\ContactService;

class ContactController extends Controller
{
    public function test()
    {
        return response()->json([
            'teste' => 'fooooi'
        ]);
    }

    public function sendEmail(Request $request, ContactService $contactService)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:100',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|min:8|max:20',
            'message' => 'required|string|min:5|max:1000',
            'emailDestinatary' => 'required|string|min:5|max:1000',
        ]);
            
        return response()->json(
            $contactService->sendEmail($validated)
        );
    }
}