<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;

use Exception;

class StripeController extends Controller
{
   
    public function processpayment(Request $request)
    {
        $token = $request->input('token'); // Récupérer le token envoyé depuis le client

        Stripe::setApiKey('sk_test_51KtYRUD3HS4vNAwa7ANL32HQqRTywhV3JHWIp3BxAIHv04bWoz22aKlRs9Q1L6znSX2i5fu5i3Xkl9i2Goz7jAkC00LL0T3lTL');

        try {
            $charge = Charge::create([
                'amount' => $request->input('amount'), // Le montant à payer en cents (100 = 1 dollar)
                'currency' => 'usd', // La devise
                'source' => $token, // Le token Stripe de la carte de crédit
                'description' => 'Paiement via Stripe', // Description facultative
                'receipt_email'=>$request->input('email') // L'adresse e-mail à laquelle envoyer un reçu de paiement.
            ]);

            // Le paiement a réussi, vous pouvez enregistrer les détails de la transaction dans votre base de données ou effectuer d'autres actions nécessaires

            return response()->json(['message' => 'Paiement réussi']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}


