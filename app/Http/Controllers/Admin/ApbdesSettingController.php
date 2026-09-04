<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\ApbdesRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ApbdesSettingController extends Controller
{
    /**
     * Standard official expenditure categories according to Permendagri.
     */
    public const OFFICIAL_EXPENSE_CATEGORIES = [
        'Bidang Penyelenggaraan Pemerintahan Desa',
        'Bidang Pelaksanaan Pembangunan Desa',
        'Bidang Pembinaan Kemasyarakatan',
        'Bidang Pemberdayaan Masyarakat',
        'Bidang Penanggulangan Bencana',
    ];

    /**
     * Standard income categories.
     */
    public const OFFICIAL_INCOME_CATEGORIES = [
        ['category_name' => 'Dana Desa (DD)', 'code' => 'DD', 'subcategory_name' => 'Pemerintah Pusat (APBN)'],
        ['category_name' => 'Alokasi Dana Desa (ADD)', 'code' => 'ADD', 'subcategory_name' => 'Pemerintah Kabupaten Lamongan'],
        ['category_name' => 'Bantuan Keuangan APBD Kabupaten (PBK)', 'code' => 'PBK', 'subcategory_name' => 'Bantuan Keuangan Khusus Kabupaten'],
        ['category_name' => 'Pendapatan Asli Desa (PAD)', 'code' => 'PAD', 'subcategory_name' => 'Hasil Tanah Kas Desa & Pemanfaatan Aset'],
        ['category_name' => 'Bagi Hasil Pajak & Retribusi Daerah (PBH)', 'code' => 'PBH', 'subcategory_name' => 'Bagi Hasil Pajak & Retribusi Daerah'],
        ['category_name' => 'Lain-Lain Pendapatan Asli Desa Yang Sah (DLL)', 'code' => 'DLL', 'subcategory_name' => 'Pendapatan Lain-Lain Yang Sah'],
        ['category_name' => 'Bantuan Keuangan APBD Provinsi (PBP)', 'code' => 'PBP', 'subcategory_name' => 'Pemerintah Provinsi Jawa Timur'],
    ];

    /**
     * Display the APBDes Settings page in Admin.
     */
    public function index(Request $request)
    {
        $years = ApbdesRecord::select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        if (empty($years)) {
            $years = [2026, 2025, 2024];
        }

        $selectedYear = (int) $request->query('year', $years[0] ?? (int) date('Y'));

        // Ensure selected year exists in the list for clean UI
        if (!in_array($selectedYear, $years)) {
            $selectedYear = $years[0];
        }

        $records = ApbdesRecord::where('year', $selectedYear)->get();

        // Separate by type
        $incomes = $records->where('type', 'income')->values();
        $expenses = $records->where('type', 'expense')->values();
        $financings = $records->where('type', 'financing')->values();

        // If records are empty for this year, populate default template structure
        if ($incomes->isEmpty()) {
            $incomes = collect(self::OFFICIAL_INCOME_CATEGORIES)->map(function ($item) use ($selectedYear) {
                return [
                    'id' => null,
                    'year' => $selectedYear,
                    'type' => 'income',
                    'category_name' => $item['category_name'],
                    'code' => $item['code'],
                    'subcategory_name' => $item['subcategory_name'],
                    'budget_amount' => 0,
                    'realized_amount' => 0,
                ];
            });
        } else {
            // Ensure every income has a code (extract from parentheses if null)
            $incomes = $incomes->map(function ($item) {
                if (empty($item->code) && !empty($item->category_name)) {
                    if (preg_match('/\(([^)]+)\)/', $item->category_name, $m)) {
                        $item->code = strtoupper(trim($m[1]));
                    }
                }
                return $item;
            });
        }

        // Summary calculations
        $totalIncomeBudget = $incomes->sum('budget_amount');
        $totalIncomeRealized = $incomes->sum('realized_amount');

        $totalExpenseBudget = $expenses->sum('budget_amount');
        $totalExpenseRealized = $expenses->sum('realized_amount');

        $totalFinancingBudget = $financings->sum('budget_amount');
        $totalFinancingRealized = $financings->sum('realized_amount');

        return Inertia::render('Admin/Settings/Apbdes', [
            'availableYears' => $years,
            'selectedYear' => $selectedYear,
            'incomes' => $incomes,
            'expenses' => $expenses,
            'financings' => $financings,
            'officialExpenseCategories' => self::OFFICIAL_EXPENSE_CATEGORIES,
            'summary' => [
                'income_budget' => $totalIncomeBudget,
                'income_realized' => $totalIncomeRealized,
                'expense_budget' => $totalExpenseBudget,
                'expense_realized' => $totalExpenseRealized,
                'financing_budget' => $totalFinancingBudget,
                'financing_realized' => $totalFinancingRealized,
                'surplus_budget' => $totalIncomeBudget - $totalExpenseBudget,
                'surplus_realized' => $totalIncomeRealized - $totalExpenseRealized,
            ],
        ]);
    }

    /**
     * Save/Update APBDes records for the selected year.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'incomes' => ['nullable', 'array'],
            'incomes.*.category_name' => ['required', 'string', 'max:255'],
            'incomes.*.code' => ['nullable', 'string', 'max:20'],
            'incomes.*.subcategory_name' => ['nullable', 'string', 'max:255'],
            'incomes.*.budget_amount' => ['nullable', 'numeric', 'min:0'],
            'incomes.*.realized_amount' => ['nullable', 'numeric', 'min:0'],

            'expenses' => ['nullable', 'array'],
            'expenses.*.category_name' => ['required', 'string', 'max:255'],
            'expenses.*.subcategory_name' => ['nullable', 'string', 'max:255'],
            'expenses.*.icon' => ['nullable', 'string', 'max:50'],
            'expenses.*.budget_amount' => ['nullable', 'numeric', 'min:0'],
            'expenses.*.realized_amount' => ['nullable', 'numeric', 'min:0'],

            'financings' => ['nullable', 'array'],
            'financings.*.category_name' => ['required', 'string', 'max:255'],
            'financings.*.subcategory_name' => ['nullable', 'string', 'max:255'],
            'financings.*.budget_amount' => ['nullable', 'numeric', 'min:0'],
            'financings.*.realized_amount' => ['nullable', 'numeric', 'min:0'],
        ]);

        $year = (int) $validated['year'];

        DB::transaction(function () use ($year, $validated) {
            // Delete existing records for this year
            ApbdesRecord::where('year', $year)->delete();

            // Insert Income Items
            if (!empty($validated['incomes'])) {
                foreach ($validated['incomes'] as $item) {
                    $bAmt = (int) ($item['budget_amount'] ?? 0);
                    $rAmt = isset($item['realized_amount']) && $item['realized_amount'] !== '' ? (int) $item['realized_amount'] : $bAmt;

                    $code = !empty($item['code']) ? strtoupper(trim($item['code'])) : null;
                    if (!$code && !empty($item['category_name']) && preg_match('/\(([^)]+)\)/', $item['category_name'], $m)) {
                        $code = strtoupper(trim($m[1]));
                    }

                    ApbdesRecord::create([
                        'year' => $year,
                        'type' => 'income',
                        'category_name' => $item['category_name'],
                        'code' => $code,
                        'subcategory_name' => $item['subcategory_name'] ?? null,
                        'budget_amount' => $bAmt,
                        'realized_amount' => $rAmt,
                    ]);
                }
            }

            // Insert Expense Items
            if (!empty($validated['expenses'])) {
                foreach ($validated['expenses'] as $item) {
                    $bAmt = (int) ($item['budget_amount'] ?? 0);
                    $rAmt = isset($item['realized_amount']) && $item['realized_amount'] !== '' ? (int) $item['realized_amount'] : $bAmt;

                    ApbdesRecord::create([
                        'year' => $year,
                        'type' => 'expense',
                        'category_name' => $item['category_name'],
                        'subcategory_name' => !empty($item['subcategory_name']) ? $item['subcategory_name'] : 'Kegiatan Belanja',
                        'icon' => !empty($item['icon']) ? $item['icon'] : 'Layers',
                        'budget_amount' => $bAmt,
                        'realized_amount' => $rAmt,
                    ]);
                }
            }

            // Insert Financing Items
            if (!empty($validated['financings'])) {
                foreach ($validated['financings'] as $item) {
                    $bAmt = (int) ($item['budget_amount'] ?? 0);
                    $rAmt = isset($item['realized_amount']) && $item['realized_amount'] !== '' ? (int) $item['realized_amount'] : $bAmt;

                    ApbdesRecord::create([
                        'year' => $year,
                        'type' => 'financing',
                        'category_name' => $item['category_name'],
                        'subcategory_name' => $item['subcategory_name'] ?? null,
                        'budget_amount' => $bAmt,
                        'realized_amount' => $rAmt,
                    ]);
                }
            }
        });

        AdminActivityLog::record(
            'update_apbdes_settings',
            "Memperbarui data anggaran dan realisasi APBDes Tahun Anggaran {$year}."
        );

        return back()->with('success', "Data APBDes Tahun {$year} berhasil disimpan.");
    }

    /**
     * Create a new APBDes Year (with optional clone from existing year).
     */
    public function storeYear(Request $request)
    {
        $validated = $request->validate([
            'new_year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'clone_from_year' => ['nullable', 'integer'],
        ]);

        $newYear = (int) $validated['new_year'];
        $cloneFrom = !empty($validated['clone_from_year']) ? (int) $validated['clone_from_year'] : null;

        // Check if year already exists
        $exists = ApbdesRecord::where('year', $newYear)->exists();
        if ($exists) {
            return back()->withErrors(['new_year' => "Tahun anggaran {$newYear} sudah ada dalam sistem."]);
        }

        DB::transaction(function () use ($newYear, $cloneFrom) {
            if ($cloneFrom && ApbdesRecord::where('year', $cloneFrom)->exists()) {
                $sourceRecords = ApbdesRecord::where('year', $cloneFrom)->get();
                foreach ($sourceRecords as $rec) {
                    ApbdesRecord::create([
                        'year' => $newYear,
                        'type' => $rec->type,
                        'category_name' => $rec->category_name,
                        'subcategory_name' => $rec->subcategory_name,
                        'budget_amount' => $rec->budget_amount,
                        'realized_amount' => 0, // Reset realization for new year
                    ]);
                }
            } else {
                // Initialize with default income template
                foreach (self::OFFICIAL_INCOME_CATEGORIES as $inc) {
                    ApbdesRecord::create([
                        'year' => $newYear,
                        'type' => 'income',
                        'category_name' => $inc['category_name'],
                        'subcategory_name' => $inc['subcategory_name'],
                        'budget_amount' => 0,
                        'realized_amount' => 0,
                    ]);
                }
                // Initialize with default expense sample
                ApbdesRecord::create([
                    'year' => $newYear,
                    'type' => 'expense',
                    'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa',
                    'subcategory_name' => 'Penghasilan Tetap dan Tunjangan Aparatur',
                    'budget_amount' => 0,
                    'realized_amount' => 0,
                ]);
            }
        });

        AdminActivityLog::record(
            'create_apbdes_year',
            "Membuat Tahun Anggaran APBDes baru: {$newYear}" . ($cloneFrom ? " (disalin dari tahun {$cloneFrom})" : '')
        );

        return redirect()->route('admin.settings.apbdes', ['year' => $newYear])
            ->with('success', "Tahun anggaran {$newYear} berhasil dibuat.");
    }

    /**
     * Delete an entire APBDes Year.
     */
    public function destroyYear($year)
    {
        $year = (int) $year;

        $totalYears = ApbdesRecord::select('year')->distinct()->count();
        if ($totalYears <= 1) {
            return back()->withErrors(['delete_year' => 'Tidak dapat menghapus satu-satunya tahun anggaran yang tersedia.']);
        }

        ApbdesRecord::where('year', $year)->delete();

        AdminActivityLog::record(
            'delete_apbdes_year',
            "Menghapus seluruh data APBDes Tahun Anggaran {$year}."
        );

        $nextYear = ApbdesRecord::select('year')->distinct()->orderBy('year', 'desc')->value('year') ?? date('Y');

        return redirect()->route('admin.settings.apbdes', ['year' => $nextYear])
            ->with('success', "Tahun anggaran {$year} berhasil dihapus.");
    }
}
