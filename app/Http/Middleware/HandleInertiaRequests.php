<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                    'is_active' => (bool) $request->user()->is_active,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'app_url' => config('app.url'),
            'village_info' => [
                'name' => 'Desa Karangwungu',
                'subdistrict' => 'Kecamatan Karanggeneng',
                'regency' => 'Kabupaten Lamongan',
                'province' => 'Jawa Timur',
                'postal_code' => '62254',
                'phone' => '+62 812-3456-7890',
                'email' => 'pemdes@karangwungu-lamongan.desa.id',
                'address' => 'Jl. Raya Karangwungu No. 01, Kec. Karanggeneng, Kab. Lamongan, Jawa Timur 62254',
            ],
        ];
    }
}
