<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LetterRequest extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'birth_date' => 'date',
        'letter_date' => 'date',
        'extra_data' => 'array',
    ];

    protected $appends = [
        'formatted_letter_date',
        'formatted_birth_date',
    ];

    /**
     * Normalize status: map legacy 'pending' to 'menunggu'.
     */
    public function getStatusAttribute($value): string
    {
        return ($value === 'pending' || empty($value)) ? 'menunggu' : $value;
    }

    /**
     * Get formatted letter date string (e.g. 05 September 2026).
     */
    public function getFormattedLetterDateAttribute(): string
    {
        $d = $this->letter_date ?: ($this->created_at ?: now());
        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        return sprintf('%02d %s %d', $d->day, $months[$d->month] ?? '', $d->year);
    }

    /**
     * Get formatted birth date string (e.g. 05 Juni 1978).
     */
    public function getFormattedBirthDateAttribute(): string
    {
        if (!$this->birth_date) {
            return '';
        }
        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        $d = $this->birth_date;
        return sprintf('%02d %s %d', $d->day, $months[$d->month] ?? '', $d->year);
    }
}
