<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminActivityLog extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'username',
        'action',
        'ip_address',
        'user_agent',
        'details',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Helper to log an admin activity.
     */
    public static function record(string $action, string $username, ?int $userId = null, ?string $details = null): self
    {
        return self::create([
            'user_id' => $userId,
            'username' => $username,
            'action' => $action,
            'ip_address' => request()->ip() ?? '127.0.0.1',
            'user_agent' => request()->userAgent(),
            'details' => $details,
            'created_at' => now(),
        ]);
    }

    /**
     * Alias helper for convenience: AdminActivityLog::log('action', 'details').
     */
    public static function log(string $action, ?string $details = null, ?string $username = null, ?int $userId = null): self
    {
        $user = request()->user();
        $username = $username ?? ($user->username ?? 'admin');
        $userId = $userId ?? ($user->id ?? null);

        return self::record($action, $username, $userId, $details);
    }
}
