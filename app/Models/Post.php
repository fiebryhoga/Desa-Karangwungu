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
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class)->where('is_approved', true)->whereNull('parent_id')->with('replies')->latest();
    }
}
