<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
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
            $query->where('name', 'like', '%' . $search . '%');
        }

        $tenants = $query->paginate(12);
        return Inertia::render('Tenant/index', ['tenants' => $tenants]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tenant/addTenant');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido'
        ];
        $request->validate(
            [
                'name' => 'required',
            ],
            $messages,
            [
                'name' => 'nome',
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
        ];
        $request->validate(
            [
                'name' => 'required',
            ],
            $messages,
            [
                'name' => 'nome',
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
