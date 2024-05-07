<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Association;
use App\Models\Meta;
use App\Models\Sale;
use App\Models\Subsidiary;
use Illuminate\Http\Request;

class JsonToDatabaseController extends Controller
{

    public function index(Request $request)
    {
        $req = $request->all();

        if ($req["type"] === "meta") {
            foreach ($req["dbdata"] as $dbdata) {
                $existcnpj = Subsidiary::where('cnpj', $dbdata["CNPJ"])->exists();
                if (!$existcnpj) {

                    return response()->json([
                        "response" => [
                            "message" => "CNPJ Inexistente na base de dados de filiais (metas)!",
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
            }
            return response()->json([
                "response" => [
                    "message" => "Metas cadastradas com sucesso!",
                    "success" => true,
                    "status" => 201,
                ],
            ], 201);
        }

        if ($req["type"] === "assoc") {
            foreach ($req["dbdata"] as $dbdata) {
                $existcnpj = Subsidiary::where('cnpj', $dbdata["CNPJ"])->exists();
                if (!$existcnpj) {

                    return response()->json([
                        "response" => [
                            "message" => "CNPJ Inexistente na base de dados de filiais (associações)!",
                        ],
                    ], 201);
                } else {
                    $existassoc = Association::where('dtvenda', $dbdata['DTVENDA'])->where('cnpj', $dbdata["CNPJ"])->exists();
                    $data[] = [
                        "cnpj" => $dbdata['CNPJ'],
                        "filial" => $dbdata['FILIAL'],
                        "dtvenda" => $dbdata['DTVENDA'],
                        "assoc" => $dbdata['ASSOCIACAO'],
                        "descassoc" => $dbdata['DESCASSOC'],
                        "valdevolucao" => $dbdata['VALDEVOLUCAO'],
                        "valvenda" => $dbdata['VALVENDA'],
                        "margem" => $dbdata['MARGEM'],
                        "representa" => $dbdata['REPRESENTA'],
                    ];
                }
                if (!$existassoc) {
                    Association::insert($data);
                } else {
                    Association::where('dtvenda', $dbdata['DTVENDA'])->where('cnpj', $dbdata['CNPJ'])->update(
                        [
                            "dtvenda" => $dbdata['DTVENDA'],
                            "assoc" => $dbdata['ASSOCIACAO'],
                            "descassoc" => $dbdata['DESCASSOC'],
                            "valdevolucao" => $dbdata['VALDEVOLUCAO'],
                            "valvenda" => $dbdata['VALVENDA'],
                            "margem" => $dbdata['MARGEM'],
                            "representa" => $dbdata['REPRESENTA'],
                        ]
                    );
                }
            }
            return response()->json([
                "response" => [
                    "message" => "Associacoes cadastradas com sucesso!",
                    "success" => true,
                    "status" => 201,
                ],
            ], 201);
        }

        if ($req["type"] === "venda") {
            foreach ($req["dbdata"] as $dbdata) {
                $existcnpj = Subsidiary::where('cnpj', $dbdata["CNPJ"])->exists();
                if (!$existcnpj) {

                    return response()->json([
                        "response" => [
                            "message" => "CNPJ Inexistente na base de dados de filiais (venda)!",
                        ],
                    ], 201);
                } else {
                    $existsale = Sale::where('dtvenda', $dbdata['DTVENDA'])->where('cnpj', $dbdata["CNPJ"])->exists();
                    $data[] = [
                        "cnpj" => $dbdata['CNPJ'],
                        "filial" => $dbdata['FILIAL'],
                        "descfilial" => $dbdata['DESCFILIAL'],
                        "dtvenda" => $dbdata['DTVENDA'],
                        "valdevolucao" => $dbdata['VALDEVOLUCAO'],
                        "valvenda" => $dbdata['VALVENDA'],
                        "margem" => $dbdata['MARGEM'],
                        "representa" => $dbdata['REPRESENTA'],
                    ];
                }
                if (!$existsale) {
                    Sale::insert($data);
                } else {
                    Sale::where('dtvenda', $dbdata['DTVENDA'])->where('cnpj', $dbdata['CNPJ'])->update(
                        [
                            "dtvenda" => $dbdata['DTVENDA'],
                            "valdevolucao" => $dbdata['VALDEVOLUCAO'],
                            "valvenda" => $dbdata['VALVENDA'],
                            "margem" => $dbdata['MARGEM'],
                            "representa" => $dbdata['REPRESENTA'],
                        ]
                    );
                }
            }
            return response()->json([
                "response" => [
                    "message" => "Associacoes cadastradas com sucesso!",
                    "success" => true,
                    "status" => 201,
                ],
            ], 201);
        }
        
    }
}
