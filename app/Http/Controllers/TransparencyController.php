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

        // Palette of colors for income categories
        $palette = ['#dc2626', '#ea580c', '#d97706', '#059669', '#2563eb', '#7c3aed', '#0891b2', '#ec4899'];
        $codeColorMap = [
            'DD' => '#dc2626',
            'ADD' => '#ea580c',
            'PBK' => '#2563eb',
            'PAD' => '#d97706',
            'PBH' => '#059669',
            'DLL' => '#7c3aed',
            'PBP' => '#0891b2',
        ];

        // Format income list with calculated percent
        $formattedIncomes = $incomes->values()->map(function ($item, $index) use ($totalIncomeBudget, $codeColorMap, $palette) {
            $bAmount = (int) $item->budget_amount;

            // Determine code from model or category name
            $code = !empty($item->code) ? trim($item->code) : null;
            if (!$code && preg_match('/\(([^)]+)\)/', $item->category_name, $m)) {
                $code = strtoupper(trim($m[1]));
            }
            if (!$code) {
                $code = 'POS ' . ($index + 1);
            }

            $color = $codeColorMap[$code] ?? $palette[$index % count($palette)];

            return [
                'id' => $item->id,
                'name' => $item->category_name,
                'desc' => $item->subcategory_name ?: 'Alokasi Penerimaan Desa',
                'code' => $code,
                'color' => $color,
                'amount' => $bAmount,
                'realized' => (int) $item->realized_amount,
                'percent' => $totalIncomeBudget > 0 ? number_format(($bAmount / $totalIncomeBudget) * 2, 2) : '0.00', // recalculated below
            ];
        });

        // Recalculate percent cleanly
        $formattedIncomes = $formattedIncomes->map(function ($item) use ($totalIncomeBudget) {
            $item['percent'] = $totalIncomeBudget > 0 ? number_format(($item['amount'] / $totalIncomeBudget) * 100, 2) : '0.00';
            return $item;
        });

        // Dynamic Expense Bidang from database records
        $paletteBidang = ['#dc2626', '#2563eb', '#ea580c', '#7c3aed', '#059669', '#0891b2', '#d97706', '#db2777'];
        $officialMeta = [
            'pembangunan' => ['color' => '#dc2626', 'icon' => 'Hammer'],
            'pemerintahan' => ['color' => '#2563eb', 'icon' => 'Landmark'],
            'bencana' => ['color' => '#ea580c', 'icon' => 'AlertTriangle'],
            'pemberdayaan' => ['color' => '#7c3aed', 'icon' => 'Users'],
            'pembinaan' => ['color' => '#059669', 'icon' => 'HeartHandshake'],
        ];

        $groupedExpenses = $expenses->groupBy('category_name');
        $expenseCategories = [];
        $catIndex = 0;

        foreach ($groupedExpenses as $catName => $items) {
            $subtotal = $items->sum('budget_amount');
            $subtotalRealized = $items->sum('realized_amount');

            $color = $paletteBidang[$catIndex % count($paletteBidang)];
            $icon = 'Layers';
            $lower = strtolower($catName);
            foreach ($officialMeta as $keyword => $meta) {
                if (str_contains($lower, $keyword)) {
                    $color = $meta['color'];
                    $icon = $meta['icon'];
                    break;
                }
            }

            // If a custom icon is saved on database records, use it
            $firstCustom = $items->first(fn($i) => !empty($i->icon));
            if ($firstCustom && !empty($firstCustom->icon)) {
                $icon = $firstCustom->icon;
            }

            $title = preg_replace('/^Bidang\s+/i', '', $catName);

            $expenseCategories[] = [
                'key' => $catName,
                'title' => $title ?: $catName,
                'color' => $color,
                'icon' => $icon,
                'items' => $items->values()->toArray(),
                'subtotal' => $subtotal,
                'subtotal_realized' => $subtotalRealized,
                'percent' => $totalExpenseBudget > 0 ? number_format(($subtotal / $totalExpenseBudget) * 100, 2) : '0.00',
            ];
            $catIndex++;
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
