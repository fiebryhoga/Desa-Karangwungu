<?php

namespace App\Http\Controllers;

use App\Models\ApbdesRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransparencyController extends Controller
{
    /**
     * Display public APBDes Transparency page.
     */
    public function index(Request $request)
    {
        $availableYears = ApbdesRecord::select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        if (empty($availableYears)) {
            $availableYears = [2026, 2025, 2024];
        }

        $selectedYear = (int) $request->query('year', $availableYears[0] ?? 2026);

        if (!in_array($selectedYear, $availableYears)) {
            $selectedYear = $availableYears[0];
        }

        $records = ApbdesRecord::where('year', $selectedYear)->get();

        $incomes = $records->where('type', 'income')->values();
        $expenses = $records->where('type', 'expense')->values();
        $financings = $records->where('type', 'financing')->values();

        $totalIncomeBudget = $incomes->sum('budget_amount');
        $totalIncomeRealized = $incomes->sum('realized_amount');

        $totalExpenseBudget = $expenses->sum('budget_amount');
        $totalExpenseRealized = $expenses->sum('realized_amount');

        $totalFinancingBudget = $financings->sum('budget_amount');
        $totalFinancingRealized = $financings->sum('realized_amount');

        // Color & code map for known income types
        $incomeMeta = [
            'Dana Desa (DD)' => ['code' => 'DD', 'color' => '#dc2626'],
            'Alokasi Dana Desa (ADD)' => ['code' => 'ADD', 'color' => '#ea580c'],
            'Bantuan Keuangan APBD Kabupaten (PBK)' => ['code' => 'PBK', 'color' => '#2563eb'],
            'Bantuan Keuangan Kabupaten (PBK)' => ['code' => 'PBK', 'color' => '#2563eb'],
            'Pendapatan Asli Desa (PAD)' => ['code' => 'PAD', 'color' => '#d97706'],
            'Bagi Hasil Pajak & Retribusi Daerah (PBH)' => ['code' => 'PBH', 'color' => '#059669'],
            'Bagi Hasil Pajak & Retribusi (PBH)' => ['code' => 'PBH', 'color' => '#059669'],
            'Lain-Lain Pendapatan Asli Desa Yang Sah (DLL)' => ['code' => 'DLL', 'color' => '#7c3aed'],
            'Pendapatan Lain-Lain Sah (DLL)' => ['code' => 'DLL', 'color' => '#7c3aed'],
            'Bantuan Keuangan APBD Provinsi (PBP)' => ['code' => 'PBP', 'color' => '#0891b2'],
        ];

        // Format income list with calculated percent
        $formattedIncomes = $incomes->map(function ($item) use ($totalIncomeBudget, $incomeMeta) {
            $bAmount = (int) $item->budget_amount;
            $meta = $incomeMeta[$item->category_name] ?? ['code' => 'LAIN', 'color' => '#64748b'];

            return [
                'id' => $item->id,
                'name' => $item->category_name,
                'desc' => $item->subcategory_name ?: 'Alokasi Penerimaan Desa',
                'code' => $meta['code'],
                'color' => $meta['color'],
                'amount' => $bAmount,
                'realized' => (int) $item->realized_amount,
                'percent' => $totalIncomeBudget > 0 ? number_format(($bAmount / $totalIncomeBudget) * 100, 2) : '0.00',
            ];
        });

        // 5 Official Expense Bidang
        $officialBidangDefs = [
            [
                'key' => 'Bidang Pelaksanaan Pembangunan Desa',
                'title' => 'Pelaksanaan Pembangunan Desa',
                'color' => '#dc2626',
                'icon' => 'Hammer',
            ],
            [
                'key' => 'Bidang Penyelenggaraan Pemerintahan Desa',
                'title' => 'Penyelenggaraan Pemerintahan',
                'color' => '#2563eb',
                'icon' => 'Landmark',
            ],
            [
                'key' => 'Bidang Penanggulangan Bencana',
                'title' => 'Penanggulangan Bencana & Mendesak',
                'color' => '#ea580c',
                'icon' => 'AlertTriangle',
            ],
            [
                'key' => 'Bidang Pemberdayaan Masyarakat',
                'title' => 'Pemberdayaan Masyarakat',
                'color' => '#7c3aed',
                'icon' => 'Users',
            ],
            [
                'key' => 'Bidang Pembinaan Kemasyarakatan',
                'title' => 'Pembinaan Kemasyarakatan',
                'color' => '#059669',
                'icon' => 'HeartHandshake',
            ],
        ];

        $expenseCategories = [];
        foreach ($officialBidangDefs as $def) {
            $matchingItems = $expenses->filter(function ($e) use ($def) {
                return str_contains(strtolower($e->category_name), strtolower(str_replace('Bidang ', '', $def['key'])));
            })->values();

            $subtotal = $matchingItems->sum('budget_amount');
            $subtotalRealized = $matchingItems->sum('realized_amount');

            $expenseCategories[] = [
                'key' => $def['key'],
                'title' => $def['title'],
                'color' => $def['color'],
                'icon' => $def['icon'],
                'items' => $matchingItems->toArray(),
                'subtotal' => $subtotal,
                'subtotal_realized' => $subtotalRealized,
                'percent' => $totalExpenseBudget > 0 ? number_format(($subtotal / $totalExpenseBudget) * 100, 2) : '0.00',
            ];
        }

        return Inertia::render('Transparency/Index', [
            'selectedYear' => $selectedYear,
            'availableYears' => $availableYears,
            'incomeItems' => $formattedIncomes,
            'expenseCategories' => $expenseCategories,
            'financings' => $financings,
            'summary' => [
                'income_budget' => $totalIncomeBudget,
                'income_realized' => $totalIncomeRealized,
                'income_percent' => $totalIncomeBudget > 0 ? round(($totalIncomeRealized / $totalIncomeBudget) * 100, 1) : 0,

                'expense_budget' => $totalExpenseBudget,
                'expense_realized' => $totalExpenseRealized,
                'expense_percent' => $totalExpenseBudget > 0 ? round(($totalExpenseRealized / $totalExpenseBudget) * 100, 1) : 0,

                'financing_budget' => $totalFinancingBudget,
                'financing_realized' => $totalFinancingRealized,
                'financing_percent' => $totalFinancingBudget > 0 ? round(($totalFinancingRealized / $totalFinancingBudget) * 100, 1) : 0,

                'surplus_budget' => $totalIncomeBudget - $totalExpenseBudget,
                'surplus_realized' => $totalIncomeRealized - $totalExpenseRealized,
            ],
        ]);
    }
}
