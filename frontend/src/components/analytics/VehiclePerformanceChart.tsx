import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import type { VehiclePerformance } from '../../utils/mockAnalyticsData';

interface VehiclePerformanceChartProps {
    data: VehiclePerformance[];
}

const VehiclePerformanceChart: React.FC<VehiclePerformanceChartProps> = ({
    data,
}) => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-navy">
                    Top Performing Vehicles
                </h3>
                <p className="text-sm text-gray-500">By revenue and rental count</p>
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                    />
                    <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value: number, name: string) => [
                            name === 'revenue' ? `$${value}` : value,
                            name === 'revenue' ? 'Revenue' : 'Rentals',
                        ]}
                    />
                    <Legend
                        verticalAlign="top"
                        height={36}
                        formatter={(value) => (
                            <span className="text-sm font-medium text-gray-700">
                                {value === 'revenue' ? 'Revenue ($)' : 'Rentals'}
                            </span>
                        )}
                    />
                    <Bar dataKey="rentals" fill="#0A1633" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="revenue" fill="#C8102E" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VehiclePerformanceChart;
