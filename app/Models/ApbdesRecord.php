<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApbdesRecord extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'budget_amount' => 'integer',
        'realized_amount' => 'integer',
        'year' => 'integer',
    ];
}
