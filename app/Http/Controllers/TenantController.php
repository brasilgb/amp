<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Tenant::orderBy('id', 'DESC');

        if ($search) {
            $query->where('descricao', 'like', '%' . $search . '%')
                ->orWhere('cnpj', 'like', '%' . $search . '%');
        }

        $tenants = $query->paginate(12);
        return Inertia::render('Tenant/index', ['tenants' => $tenants]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tenant = Tenant::exists() ? Tenant::orderBy('id', 'desc')->first()->id : [];
        return Inertia::render('Tenant/addTenant', ['tenant' => $tenant]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido',
            'cnpj' => 'CNPJ inválido',
            'unique' => 'CNPJ já está em uso',
        ];
        $request->validate(
            [
                'descricao' => 'required',
                'endereco' => 'required',
                'numero' => 'required',
                'cep' => 'required',
                'municipio' => 'required',
                'uf' => 'required',
                'bairro' => 'required',
                'cnpj' => 'required|cnpj|unique:tenants',
                'inscricao' => 'required',
                'telefone' => 'required',
            ],
            $messages,
            [
                'descricao' => 'descrição',
                'endereco' => 'endereço',
                'numero' => 'número',
                'municipio' => 'município',
                'inscricao' => 'inscrição',
            ]
        );

        Tenant::create($data);
        Session::flash('success', 'Cliente cadastrado com sucesso!');
        return redirect()->route('customers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        return Inertia::render('Tenant/editTenant', ['tenants' => $tenant]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant)
    {
        return Redirect::route('customers.show', ['tenant' => $tenant->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tenant $tenant)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido',
            'cnpj' => 'CNPJ inválido',
            'unique' => 'CNPJ já está em uso',
        ];
        $request->validate(
            [
                'descricao' => 'required',
                'endereco' => 'required',
                'numero' => 'required',
                'cep' => 'required',
                'municipio' => 'required',
                'uf' => 'required',
                'bairro' => 'required',
                'cnpj' => ['required', Rule::unique('tenants')->ignore($tenant->id), 'cnpj'],
                'inscricao' => 'required|inscricao_estadual_rs',
                'telefone' => 'required',
            ],
            $messages,
            [
                'descricao' => 'descrição',
                'endereco' => 'endereço',
                'numero' => 'número',
                'municipio' => 'município',
                'inscricao' => 'inscrição',
            ]
        );
        $tenant->update($data);
        Session::flash('success', 'Cliente editado com sucesso!');
        return Redirect::route('customers.index', ['tenant' => $tenant->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        $tenant->delete();
        Session::flash('success', 'Cliente deletado com sucesso');
        return Redirect::route('customers.index');
    }
}
