<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'group',
        'key',
        'value',
        'type',
    ];

    /**
     * Get a setting by key with optional fallback.
     */
    public static function getValue(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    /**
     * Get all settings belonging to a specific group as an associative array.
     */
    public static function getGroup(string $group): array
    {
        return static::where('group', $group)
            ->pluck('value', 'key')
            ->toArray();
    }

    /**
     * Bulk update or create settings for a specific group.
     */
    public static function setGroup(string $group, array $settings): void
    {
        foreach ($settings as $key => $value) {
            static::updateOrCreate(
                ['key' => $key],
                [
                    'group' => $group,
                    'value' => $value,
                ]
            );
        }
    }
}
