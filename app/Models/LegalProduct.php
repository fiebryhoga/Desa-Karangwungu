<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class LegalProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'document_type',
        'document_number',
        'year',
        'effective_date',
        'status',
        'description',
        'file_url',
        'file_name',
        'file_size',
        'download_count',
        'is_active',
        'order',
    ];

    protected $casts = [
        'year' => 'integer',
        'effective_date' => 'date',
        'is_active' => 'boolean',
        'download_count' => 'integer',
        'order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            if (empty($item->slug)) {
                $item->slug = Str::slug($item->title . '-' . ($item->document_number ?: uniqid()));
            }
        });
    }

    /**
     * Scope for active records.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get human-readable status label.
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'active' => 'Berlaku',
            'amended' => 'Diubah',
            'repealed' => 'Dicabut',
            default => 'Berlaku',
        };
    }
}
