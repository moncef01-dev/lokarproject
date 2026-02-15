import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BookingPieChartProps {
    confirmed: number;
    pending: number;
    cancelled: number;
}

const BookingPieChart: React.FC<BookingPieChartProps> = ({
    confirmed,
    pending,
    cancelled,
}) => {
    const data = [
        { name: 'Confirmed', value: confirmed, color: '#00C853' },
        { name: 'Pending', value: pending, color: '#FFA726' },
        { name: 'Cancelled', value: cancelled, color: '#EF5350' },
    ];

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-navy">Booking Status</h3>
                <p className="text-sm text-gray-500">Distribution by status</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => (
                            <span className="text-sm font-medium text-gray-700">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BookingPieChart;
