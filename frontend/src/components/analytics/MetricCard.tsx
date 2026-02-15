import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: number;
    icon: React.ReactNode;
    iconBgColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    trend,
    icon,
    iconBgColor = 'bg-blue-100',
}) => {
    const isPositive = trend !== undefined && trend >= 0;

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-brand-navy">{value}</h3>
                    {trend !== undefined && (
                        <div className="mt-2 flex items-center gap-1">
                            {isPositive ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span
                                className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {isPositive ? '+' : ''}
                                {trend}%
                            </span>
                            <span className="text-xs text-gray-500">vs last period</span>
                        </div>
                    )}
                </div>
                <div className={`rounded-xl ${iconBgColor} p-3`}>{icon}</div>
            </div>
        </div>
    );
};

export default MetricCard;
