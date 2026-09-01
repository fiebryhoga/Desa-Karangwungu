<?php

namespace App\Http\Controllers;

use App\Models\ApbdesRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransparencyController extends Controller
{
    public function index(Request $request)
    {
        $year = (int) $request->query('year', 2026);

        $records = ApbdesRecord::where('year', $year)->get();

        $incomes = $records->where('type', 'income')->values();
        $expenses = $records->where('type', 'expense')->values();
        $financings = $records->where('type', 'financing')->values();

        $totalIncomeBudget = $incomes->sum('budget_amount');
        $totalIncomeRealized = $incomes->sum('realized_amount');

        $totalExpenseBudget = $expenses->sum('budget_amount');
        $totalExpenseRealized = $expenses->sum('realized_amount');

        $totalFinancingBudget = $financings->sum('budget_amount');
        $totalFinancingRealized = $financings->sum('realized_amount');

        return Inertia::render('Transparency/Index', [
            'selectedYear' => $year,
            'availableYears' => [2026, 2025, 2024],
            'incomes' => $incomes,
            'expenses' => $expenses,
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
            ],
        ]);
    }
}
