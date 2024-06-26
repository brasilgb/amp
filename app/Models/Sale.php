<?php

namespace App\Models;

use App\Traits\TenantAttributeTrait;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'cnpj',
        'filial',
        'descfilial',
        'dtvenda',
        'valdevolucao',
        'valvenda',
        'margem',
        'representa'
    ];
}
