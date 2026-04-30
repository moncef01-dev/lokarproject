import { type FC } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';
import type { RevenueData } from '../../utils/mockAnalyticsData';

interface RevenueChartProps {
    data: RevenueData[];
}

const RevenueChart: FC<RevenueChartProps> = ({ data }) => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-navy">Revenue Trend</h3>
                <p className="text-sm text-gray-500">Daily revenue over time</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0A1633" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0A1633" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `DZD ${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: any) => [`DZD ${value}`, 'Revenue']}
                    />
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#0A1633"
                        strokeWidth={3}
                        fill="url(#colorRevenue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
