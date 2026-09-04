<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'image',
        'photos',
        'description',
        'date',
        'location',
        'order',
        'is_published',
    ];

    protected $casts = [
        'photos' => 'array',
        'date' => 'date:Y-m-d',
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    protected $appends = [
        'photo_count',
    ];

    /**
     * Get total number of photos in this album.
     */
    public function getPhotoCountAttribute(): int
    {
        if (is_array($this->photos) && count($this->photos) > 0) {
            return count($this->photos);
        }
        return !empty($this->image) ? 1 : 0;
    }
}
