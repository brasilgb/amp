<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class JsonToDatabaseController extends Controller
{
    public function index(Request $request, Sale $sale)
    {
        $requser = $request->all();

        if ($requser["type"] === "company") {

            foreach ($requser["dbdata"] as $user) {
                $existcompany = Company::where('cnpj', $user['cnpj'])->exists();
                $cdata[] = [
                    "cnpj" => $user['cnpj'],
                    "razao" => $user['razao'],
                ];
            }
            if (!$existcompany) {
                Company::insert($cdata);
            }

            foreach ($requser["dbdata"] as $user) {
                $tenant = Company::where('cnpj', $user['cnpj'])->first();
                $existuser = User::where('email', $user['email'])->exists();
                $udata[] = [
                    "tenant_id" => $tenant->id,
                    "name" => $user['name'],
                    "email" => $user['email'],
                    "password" => Hash::make($user['password']),
                    "roles" => $user['roles'],
                ];
            }

            if (!$existuser) {
                User::insert($udata);
            }
            return response()->json([
                "response" => [
                    "message" => "User e company cadastradas com sucesso!",
                    "success" => true,
                    "status" => 201,
                ],
            ], 201);
        }
        if ($requser["type"] === "sale") {
            foreach ($requser["dbdata"] as $sale) {
                $tenant = Company::where('cnpj', $sale['cnpj'])->first();
                $existsale = Sale::whereDate('dtfat', $sale['data'])->exists();

                $data[] = [
                    "tenant_id" => $tenant->id,
                    "faturamento" => $sale['faturamento'],
                    "meta" => $sale['meta'],
                    "repfat" => $sale['repfat'],
                    "margem" => $sale['margem'],
                    "dtfat" => $sale['data'],
                ];
            }
            if (!$existsale) {
                Sale::insert($data);
            } else {
                Sale::whereDate('dtfat', $sale['data'])->update(
                    [
                        "faturamento" => $sale['faturamento'],
                        "meta" => $sale['meta'],
                        "repfat" => $sale['repfat'],
                        "margem" => $sale['margem'],
                    ]
                );
            }

            return response()->json([
                "response" => [
                    "message" => "Vendas cadastradas com sucesso!" . $existsale,
                    "success" => true,
                    "status" => 201,
                ],
            ], 201);
        }
    }
}
