<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Meta;
use App\Models\Sale;
use App\Models\Subsidiary;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class JsonToDatabaseController extends Controller
{

    public function index(Request $request, Sale $sale)
    {
        $req = $request->all();
        // dd($req);
        // dd($req["type"]);

        if ($req["type"] === "meta") {
            foreach ($req["dbdata"] as $dbdata) {
                $existcnpj = Subsidiary::where('cnpj', $dbdata["CNPJ"])->exists();
                if (!$existcnpj) {

                    return response()->json([
                        "response" => [
                            "message" => "CNPJ Inexistente na base de dados!",
                        ],
                    ], 201);
                } else {
                    $existmeta = Meta::where('anomes', $dbdata['ANOMES'])->where('cnpj', $dbdata["CNPJ"])->exists();
                    $data[] = [
                        "filial" => $dbdata['FILIAL'],
                        "cnpj" => $dbdata['CNPJ'],
                        "anomes" => $dbdata['ANOMES'],
                        "valormeta" => $dbdata['VALORMETA'],
                        "metajuros" => $dbdata['METAJUROS'],
                    ];
                }
                if (!$existmeta) {
                    Meta::insert($data);
                } else {
                    Meta::where('anomes', $dbdata['ANOMES'])->where('cnpj', $dbdata['CNPJ'])->update(
                        [
                            "anomes" => $dbdata['ANOMES'],
                            "valormeta" => $dbdata['VALORMETA'],
                            "metajuros" => $dbdata['METAJUROS'],
                        ]
                    );
                }
                return response()->json([
                    "response" => [
                        "message" => "Vendas cadastradas com sucesso!",
                        "success" => true,
                        "status" => 201,
                    ],
                ], 201);
            }
        }
    }
}
