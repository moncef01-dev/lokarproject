import { subDays, format } from 'date-fns';

export interface RevenueData {
    date: string;
    amount: number;
}

export interface BookingData {
    date: string;
    count: number;
}

export interface VehiclePerformance {
    name: string;
    rentals: number;
    revenue: number;
}

export interface AnalyticsData {
    revenue: {
        total: number;
        trend: number;
        daily: RevenueData[];
    };
    bookings: {
        total: number;
        confirmed: number;
        pending: number;
        cancelled: number;
        trend: BookingData[];
    };
    vehicles: {
        totalFleet: number;
        utilization: number;
        topPerformers: VehiclePerformance[];
    };
    customers: {
        new: number;
        returning: number;
    };
}

// Generate random number between min and max
const randomBetween = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate revenue data for the last N days
export const generateRevenueData = (days: number): RevenueData[] => {
    const data: RevenueData[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = subDays(today, i);
        data.push({
            date: format(date, 'MMM dd'),
            amount: randomBetween(300, 1500),
        });
    }

    return data;
};

// Generate booking trend data
export const generateBookingData = (days: number): BookingData[] => {
    const data: BookingData[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = subDays(today, i);
        data.push({
            date: format(date, 'MMM dd'),
            count: randomBetween(2, 12),
        });
    }

    return data;
};

// Generate top performing vehicles
export const generateVehiclePerformance = (): VehiclePerformance[] => {
    const vehicles = [
        'BMW M4',
        'Mercedes C-Class',
        'Audi A6',
        'Tesla Model 3',
        'Toyota Camry',
        'Honda Accord',
        'Ford Mustang',
        'Porsche 911',
    ];

    return vehicles
        .map((name) => ({
            name,
            rentals: randomBetween(5, 25),
            revenue: randomBetween(2000, 8000),
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
};

// Generate complete analytics data
export const generateAnalyticsData = (days: number = 30): AnalyticsData => {
    const revenueDaily = generateRevenueData(days);
    const totalRevenue = revenueDaily.reduce((sum, day) => sum + day.amount, 0);
    const avgRevenue = totalRevenue / days;
    const lastWeekRevenue = revenueDaily.slice(-7).reduce((sum, day) => sum + day.amount, 0) / 7;
    const trend = ((lastWeekRevenue - avgRevenue) / avgRevenue) * 100;

    const bookingTrend = generateBookingData(days);
    const totalBookings = bookingTrend.reduce((sum, day) => sum + day.count, 0);
    const confirmed = Math.floor(totalBookings * 0.7);
    const pending = Math.floor(totalBookings * 0.2);
    const cancelled = totalBookings - confirmed - pending;

    const topPerformers = generateVehiclePerformance();
    const totalFleet = randomBetween(15, 30);
    const utilization = randomBetween(65, 95);

    return {
        revenue: {
            total: totalRevenue,
            trend: Math.round(trend * 10) / 10,
            daily: revenueDaily,
        },
        bookings: {
            total: totalBookings,
            confirmed,
            pending,
            cancelled,
            trend: bookingTrend,
        },
        vehicles: {
            totalFleet,
            utilization,
            topPerformers,
        },
        customers: {
            new: randomBetween(20, 50),
            returning: randomBetween(30, 70),
        },
    };
};
