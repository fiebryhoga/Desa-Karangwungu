<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
        'categories' => 'array',
    ];

    public function getCategoriesListAttribute(): array
    {
        if (!empty($this->categories) && is_array($this->categories)) {
            return array_values(array_filter($this->categories));
        }
        if (!empty($this->category)) {
            $decoded = json_decode($this->category, true);
            if (is_array($decoded)) {
                return array_values(array_filter($decoded));
            }
            return array_values(array_filter(array_map('trim', explode(',', $this->category))));
        }
        return ['Berita'];
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->where('is_approved', true)->whereNull('parent_id')->with('replies')->latest();
    }

    public function allComments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id')->with('allReplies')->latest();
    }
}
