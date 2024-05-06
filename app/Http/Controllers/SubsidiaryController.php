<?php

namespace App\Http\Controllers;

use App\Models\Subsidiary;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SubsidiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Subsidiary::with('tenant')->orderBy('id', 'DESC');

        if ($search) {
            $query->where('subname', 'like', '%' . $search . '%')
                ->orWhere('cnpj', 'like', '%' . $search . '%');
        }

        $subsidiarys = $query->paginate(12);
        return Inertia::render('Subsidiary/index', ['subsidiaries' => $subsidiarys]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subsidiaries = Tenant::get();

        return Inertia::render('Subsidiary/addSubsidiary', ['subsidiaries' => $subsidiaries]);
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
                'tenant_id' => 'required',
                'subnumber' => 'required',
                'subname' => 'required',
                'address' => 'required',
                'number' => 'required',
                'cep' => 'required',
                'county' => 'required',
                'state' => 'required',
                'neighborhood' => 'required',
                'cnpj' => 'required|cnpj|unique:subsidiaries',
                'statereg' => 'required|inscricao_estadual_rs',
                'telephone' => 'required',
            ],
            $messages,
            [
                'tenant_id' => 'empresa',
                'subnumber' => 'número filial',
                'subname' => 'nome filial',
                'address' => 'endereço',
                'number' => 'número',
                'county' => 'município',
                'state' => 'estado',
                'neighborhood' => 'bairro',
                'statereg' => 'inscrição estadual',
                'telephone' => 'telefone',
            ]
        );

        Subsidiary::create($data);
        Session::flash('success', 'Filial cadastrado com sucesso!');
        return redirect()->route('subsidiaries.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subsidiary $subsidiary)
    {
        return Inertia::render('Subsidiary/editSubsidiary', ['subsidiaries' => $subsidiary]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subsidiary $subsidiary)
    {
        return Redirect::route('subsidiaries.show', ['subsidiary' => $subsidiary->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subsidiary $subsidiary)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido',
            'cnpj' => 'CNPJ inválido',
            'unique' => 'CNPJ já está em uso',
        ];
        $request->validate(
            [
                'tenant_id' => 'required',
                'subnumber' => 'required',
                'subname' => 'required',
                'address' => 'required',
                'number' => 'required',
                'cep' => 'required',
                'county' => 'required',
                'state' => 'required',
                'neighborhood' => 'required',
                'cnpj' => ['required', Rule::unique('subsidiaries')->ignore($subsidiary->id), 'cnpj'],
                'statereg' => 'required|inscricao_estadual_rs',
                'telephone' => 'required',
            ],
            $messages,
            [
                'tenant_id' => 'empresa',
                'subnumber' => 'número filial',
                'subname' => 'nome filial',
                'address' => 'endereço',
                'number' => 'número',
                'county' => 'município',
                'state' => 'estado',
                'neighborhood' => 'bairro',
                'statereg' => 'inscrição estadual',
                'telephone' => 'telefone',
            ]
        );
        $subsidiary->update($data);
        Session::flash('success', 'Filial editado com sucesso!');
        return Redirect::route('subsidiaries.index', ['tenant' => $subsidiary->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subsidiary $subsidiary)
    {
        $subsidiary->delete();
        Session::flash('success', 'Filial deletado com sucesso');
        return Redirect::route('subsidiaries.index');
    }
}
