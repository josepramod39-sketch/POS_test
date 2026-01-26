import { startOfMonth, endOfMonth, eachDayOfInterval, format, subDays } from 'date-fns';

export interface SalesData {
    date: string;
    revenue: number;
    orders: number;
}

export interface TopProduct {
    id: string;
    name: string;
    sales: number;
    revenue: number;
}

export const generateSalesTrend = (days = 30): SalesData[] => {
    const data: SalesData[] = [];
    const today = new Date();

    for (let i = days; i >= 0; i--) {
        const date = subDays(today, i);
        // Random revenue between 500 and 3000 with some "weekend" spikes
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const baseRevenue = isWeekend ? 2000 : 800;
        const itemsSold = Math.floor(Math.random() * 20) + 10;
        const dailyRev = baseRevenue + Math.floor(Math.random() * 1000);

        data.push({
            date: format(date, 'MMM dd'),
            revenue: dailyRev,
            orders: itemsSold,
        });
    }
    return data;
};

export const generateTopProducts = (): TopProduct[] => {
    return [
        { id: '1', name: 'Grey Goose Vodka', sales: 120, revenue: 5400 },
        { id: '2', name: 'Casamigos Blanco', sales: 95, revenue: 5225 },
        { id: '3', name: 'Jameson Whiskey', sales: 88, revenue: 2640 },
        { id: '4', name: 'Titos Vodka', sales: 150, revenue: 3750 },
        { id: '5', name: 'Hennessy VS', sales: 70, revenue: 3150 },
    ];
};

export const getSummaryStats = () => {
    return {
        totalRevenue: 45231.50,
        totalTransactions: 1243,
        avgOrderValue: 36.38,
        growth: 12.5 // percentage
    };
};
