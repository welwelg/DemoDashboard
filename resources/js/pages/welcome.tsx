import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BarChart3, ShieldCheck, ShoppingBag, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to RetailFlow">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* MAIN WRAPPER */}
            <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC] selection:bg-blue-500 selection:text-white">

                {/* 1. RESPONSIVE NAVBAR */}
                <header className="fixed top-0 w-full z-50 border-b border-zinc-200 bg-white/80 dark:bg-zinc-950/80 dark:border-zinc-800 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tighter">
                            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <ShoppingBag className="h-5 w-5 text-white" />
                            </div>
                            <span>RetailFlow</span>
                        </div>

                        {/* Navigation Buttons */}
                        <nav className="flex items-center gap-2 sm:gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    {/* Hide 'Log in' text on very small screens if needed, mostly fine though */}
                                    <Link
                                        href={login()}
                                        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 px-3 py-2 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-500 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* 2. HERO SECTION */}
                {/* Added 'pt-24' to account for fixed navbar */}
                <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                        {/* LEFT SIDE: Text Content */}
                        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">

                            {/* Badge */}
                            <div className="flex justify-center lg:justify-start">
                                <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-400">
                                    <Zap className="w-3 h-3 mr-1 fill-current" /> v1.0 Released
                                </Badge>
                            </div>

                            {/* Responsive Headline: text-4xl mobile -> text-7xl desktop */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white">
                                Manage your shop <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
                                    like a Pro.
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Stop using spreadsheets. RetailFlow is the modern ERP built for fast-moving businesses. Track sales, monitor stock, and analyze growth in real-time.
                            </p>

                            {/* Action Buttons: Full width on mobile, auto on desktop */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link href={login()} className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full h-12 text-base sm:text-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                                        Try Demo Account
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={register()} className="w-full sm:w-auto">
                                    <Button size="lg" variant="outline" className="w-full h-12 text-base sm:text-lg border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                        Create Free Account
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Indicators: Stack on very small screens, row on others */}
                            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5" /> Secure Data
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" /> Analytics Ready
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Abstract Visual */}
                        <div className="w-full lg:w-1/2 relative group mt-8 lg:mt-0">
                            {/* Background Glow */}
                            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                            {/* Dashboard Card Container */}
                            <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden">

                                {/* Fake Browser Header */}
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700 px-4 py-3 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    {/* URL Bar - Responsive Width */}
                                    <div className="ml-4 h-6 w-full max-w-50 bg-zinc-200 dark:bg-zinc-800 rounded-md text-[10px] flex items-center px-2 text-zinc-500 font-mono overflow-hidden whitespace-nowrap">
                                        retailflow.app/dashboard
                                    </div>
                                </div>

                                {/* Fake Content Area */}
                                <div className="p-4 sm:p-6 space-y-6">

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-20 sm:h-24 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-700/50 p-3 space-y-2">
                                                <div className="h-1.5 sm:h-2 w-8 sm:w-12 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                                                <div className={`h-4 sm:h-6 w-12 sm:w-20 rounded ${
                                                    i === 1 ? 'bg-blue-100 dark:bg-blue-500/20' :
                                                    i === 2 ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20'
                                                }`}></div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart Placeholder */}
                                    <div className="h-32 sm:h-48 bg-zinc-50 dark:bg-zinc-800/30 rounded-lg border border-zinc-100 dark:border-zinc-700/50 flex items-end justify-between p-2 sm:p-4 gap-1 sm:gap-2">
                                        {[40, 70, 45, 90, 60, 80, 50, 95, 65].map((h, i) => (
                                            <div key={i} className="w-full bg-blue-500/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>

                                    {/* Table Placeholder */}
                                    <div className="space-y-2 sm:space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center justify-between h-8 sm:h-10 border-b border-zinc-100 dark:border-zinc-800">
                                                <div className="h-1.5 sm:h-2 w-16 sm:w-24 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                                                <div className="h-1.5 sm:h-2 w-8 sm:w-12 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                                                <div className="h-3 sm:h-4 w-10 sm:w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* 3. FOOTER */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center px-4">
                    <p className="text-zinc-500 text-xs sm:text-sm">
                        &copy; {new Date().getFullYear()} RetailFlow Systems.
                        <span className="mx-2">•</span>
                        Built with Laravel 12 & Inertia
                    </p>
                </div>
            </div>
        </>
    );
}
