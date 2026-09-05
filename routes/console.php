<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

use App\Models\LetterRequest;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    LetterRequest::where('status', 'ditolak')
        ->where('updated_at', '<', now()->subDays(7))
        ->delete();
})->daily()->name('prune-rejected-letters');
