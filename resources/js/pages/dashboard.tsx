import { Head } from '@inertiajs/react';
import { AlertTriangle, DollarSign, ShoppingBag } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

// ALPHABETICAL ORDER: C -> L -> R -> T
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        revenue: number;
        orders: number;
        low_stock: number;
    };
    chartData: {
        date: string;
        total: number;
    }[];
    recentOrders: {
        id: number;
        customer_name: string;
        total_amount: number;
        status: string;
        created_at: string;
    }[];
}

export default function Dashboard({ stats, chartData, recentOrders }: DashboardProps) {

    const chartConfig = {
        total: {
            label: "Revenue",
            color: "#2563eb",
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-hidden rounded-xl p-4">

                {/* SECTION 1: KPI CARDS
                    Responsive: 1 col (Mobile) -> 2 cols (Tablet) -> 3 cols (Desktop)
                */}
                <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ₱{Number(stats?.revenue || 0).toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">Total earnings from completed orders</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.orders || 0}</div>
                            <p className="text-xs text-muted-foreground">All time orders placed</p>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 md:col-span-1">
                        {/* Note: sm:col-span-2 ensures the 3rd card takes full width on tablet rows for balance */}
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-500">{stats?.low_stock || 0}</div>
                            <p className="text-xs text-muted-foreground">Products with less than 10 stock</p>
                        </CardContent>
                    </Card>
                </div>

                {/* SECTION 2: CHARTS & TABLES
                    Responsive: Stack Vertically (Mobile/Tablet) -> Split 4/3 (Large Screens)
                */}
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">

                    {/* CHART AREA */}
                    <Card className="col-span-1 lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Sales Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            {/* Responsive Height: Shorter on mobile (h-60), Taller on desktop (h-75) */}
                            <div className="h-60 sm:h-75 w-full">
                                <ChartContainer config={chartConfig} className="h-full w-full">
                                    <BarChart data={chartData || []}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                                        <XAxis
                                            dataKey="date"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={10}
                                            tickFormatter={(value) => value.slice(5)}
                                        />
                                        <YAxis hide />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RECENT ORDERS TABLE */}
                    <Card className="col-span-1 lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Overflow X allows table to scroll horizontally on very small phones */}
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentOrders && recentOrders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    <div className="font-medium">{order.customer_name}</div>
                                                    <div className="text-xs text-muted-foreground hidden sm:inline">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right whitespace-nowrap">
                                                    ₱{Number(order.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
