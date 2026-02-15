import React, { useState, useMemo } from 'react';
import {
    DollarSign,
    Calendar,
    Car,
    Users,
    TrendingUp,
} from 'lucide-react';
import MetricCard from './MetricCard';
import RevenueChart from './RevenueChart';
import BookingPieChart from './BookingPieChart';
import VehiclePerformanceChart from './VehiclePerformanceChart';
import { generateAnalyticsData } from '../../utils/mockAnalyticsData';

type DateRange = '7' | '30' | '90';

const AnalyticsDashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState<DateRange>('30');

    // Generate analytics data based on selected date range
    const analyticsData = useMemo(
        () => generateAnalyticsData(parseInt(dateRange)),
        [dateRange]
    );

    return (
        <div className="space-y-8">
            {/* Header with Date Range Filters */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-brand-navy text-2xl font-bold">
                        Analytics Dashboard
                    </h2>
                    <p className="mt-1 text-gray-500">
                        Track your agency's performance and insights
                    </p>
                </div>

                <div className="flex gap-2 rounded-xl border border-gray-200 bg-white p-1">
                    <button
                        onClick={() => setDateRange('7')}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${dateRange === '7'
                                ? 'bg-brand-navy text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Last 7 Days
                    </button>
                    <button
                        onClick={() => setDateRange('30')}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${dateRange === '30'
                                ? 'bg-brand-navy text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Last 30 Days
                    </button>
                    <button
                        onClick={() => setDateRange('90')}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${dateRange === '90'
                                ? 'bg-brand-navy text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Last 90 Days
                    </button>
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Revenue"
                    value={`$${analyticsData.revenue.total.toLocaleString()}`}
                    trend={analyticsData.revenue.trend}
                    icon={<DollarSign className="h-6 w-6 text-green-600" />}
                    iconBgColor="bg-green-100"
                />
                <MetricCard
                    title="Total Bookings"
                    value={analyticsData.bookings.total}
                    icon={<Calendar className="h-6 w-6 text-blue-600" />}
                    iconBgColor="bg-blue-100"
                />
                <MetricCard
                    title="Fleet Utilization"
                    value={`${analyticsData.vehicles.utilization}%`}
                    icon={<Car className="h-6 w-6 text-purple-600" />}
                    iconBgColor="bg-purple-100"
                />
                <MetricCard
                    title="New Customers"
                    value={analyticsData.customers.new}
                    icon={<Users className="h-6 w-6 text-orange-600" />}
                    iconBgColor="bg-orange-100"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RevenueChart data={analyticsData.revenue.daily} />
                <BookingPieChart
                    confirmed={analyticsData.bookings.confirmed}
                    pending={analyticsData.bookings.pending}
                    cancelled={analyticsData.bookings.cancelled}
                />
            </div>

            {/* Vehicle Performance Chart - Full Width */}
            <VehiclePerformanceChart data={analyticsData.vehicles.topPerformers} />

            {/* Additional Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-lg bg-green-100 p-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-700">Confirmed Bookings</h4>
                    </div>
                    <p className="text-3xl font-bold text-brand-navy">
                        {analyticsData.bookings.confirmed}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {(
                            (analyticsData.bookings.confirmed /
                                analyticsData.bookings.total) *
                            100
                        ).toFixed(0)}
                        % of total bookings
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-lg bg-orange-100 p-2">
                            <Calendar className="h-5 w-5 text-orange-600" />
                        </div>
                        <h4 className="font-semibold text-gray-700">Pending Bookings</h4>
                    </div>
                    <p className="text-3xl font-bold text-brand-navy">
                        {analyticsData.bookings.pending}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Awaiting confirmation</p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Car className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-700">Total Fleet</h4>
                    </div>
                    <p className="text-3xl font-bold text-brand-navy">
                        {analyticsData.vehicles.totalFleet}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Active vehicles</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
