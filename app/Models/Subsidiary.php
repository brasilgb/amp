<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subsidiary extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'subnumber',
        'subname',
        'address',
        'number',
        'cep',
        'county',
        'state',
        'neighborhood',
        'cnpj',
        'statereg',
        'telephone',
        'whatsapp',
        'observation'
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

}
