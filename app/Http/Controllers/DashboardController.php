<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // --- 1. KPI CARDS (Yung 3 Box sa taas) ---

        // Kunin ang total sales ng mga "completed" orders lang
        $totalRevenue = Order::where('status', 'completed')->sum('total_amount');

        // Bilangin lahat ng orders
        $totalOrders = Order::count();

        // Bilangin ang products na paubos na (stock is 10 or below)
        $lowStockCount = Product::where('stock', '<=', 10)->count();


        // --- 2. CHART DATA (Sales per Day - Last 30 Days) ---
        // Ito ang medyo advanced. SQL grouping ito.
        $salesChart = Order::where('created_at', '>=', now()->subDays(30)) // Huling 30 araw lang
            ->where('status', 'completed') // Valid sales lang
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total') // Pagsamahin ang sales sa isang araw
            ->groupBy('date') // I-group base sa petsa
            ->orderBy('date', 'asc') // Pagsunod-sunurin mula luma hanggang bago
            ->get();


        // --- 3. RECENT ORDERS (Yung Table sa baba) ---
        // Kumuha ng latest 5 orders
        $recentOrders = Order::latest()
            ->take(5)
            ->get();


        // --- 4. RETURN TO REACT (Inertia) ---
        // Dito natin ipapasa lahat ng nakuha natin papunta sa 'Dashboard.tsx'
        return Inertia::render('dashboard', [
            'stats' => [
                'revenue' => $totalRevenue,
                'orders' => $totalOrders,
                'low_stock' => $lowStockCount,
            ],
            'chartData' => $salesChart,
            'recentOrders' => $recentOrders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
