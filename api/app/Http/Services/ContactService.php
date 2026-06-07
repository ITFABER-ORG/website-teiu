<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Mail;

class ContactService
{
    private function formatPhone($phone)
    {
        $numbers = preg_replace('/\D/', '', $phone);

        if (strlen($numbers) === 11) {
            return preg_replace('/(\d{2})(\d{5})(\d{4})/', '($1) $2-$3', $numbers);
        }

        if (strlen($numbers) === 10) {
            return preg_replace('/(\d{2})(\d{4})(\d{4})/', '($1) $2-$3', $numbers);
        }

        return $phone;
    }

    public function sendEmail(array $data): array
    {
        try {

            $formattedPhone = $this->formatPhone($data['phone']);

            Mail::send([], [], function ($message) use ($data, $formattedPhone) {

                $logo = $message->embed(public_path('Logomarca.png')); 

                $message->to($data['emailDestinatary'])
                        ->replyTo($data['email'], $data['name'])
                        ->subject('Novo contato do site')
                        ->html("
                            <div style='font-family: Arial; background:#f4f4f4; padding:20px;'>
                            
                                
                                <div style='max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:20px; text-align:center;'>
                                    
                                    <table width='100%' style='margin-bottom:15px;'>
                                            <tr style='padding:100px'>
                                                <td style='vertical-align:middle;'>
                                                <img src='{$logo}' style='max-width:60px;'>
                                                </td>
                                                <td style='vertical-align:middle;'>
                                                <h2 style='color:#333; margin:0;'>Nova mensagem recebida</h2>
                                                </td>
                                            </tr>
                                    </table>
                                    

                                    <p><strong>Nome:</strong> {$data['name']}</p>
                                    <p><strong>Email:</strong> {$data['email']}</p>
                                    <p><strong>Telefone:</strong> {$formattedPhone}</p>

                                    <hr>

                                    <p><strong>Mensagem:</strong></p>
                                    <p style='background:#f9f9f9; padding:10px; border-radius:5px;'>
                                        {$data['message']}
                                    </p>

                                    <hr>

                                    <p style='font-size:12px; color:#999;'>
                                        Email enviado automaticamente
                                    </p>

                                </div>

                            </div>
                        ");
            });

            return [
                'success' => true,
                'message' => 'Email enviado com sucesso',
                'data' => $data
            ];

        } catch (\Throwable $e) {
            return [
                'success' => false,
                'message' => 'Erro ao enviar email',
                'error' => $e->getMessage()
            ];
        }
    }
}