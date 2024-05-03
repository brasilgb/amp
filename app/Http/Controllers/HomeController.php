<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sales = Sale::first();
        return Inertia::render('Home/index', ["sales" => $sales]);
    }
}
