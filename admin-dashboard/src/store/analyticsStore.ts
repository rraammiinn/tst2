import { create } from 'zustand';

export interface AnalyticsData {
  totalRevenue: number;
  totalCustomers: number;
  totalOrders: number;
  conversionRate: number;
  revenueHistory: { month: string; revenue: number }[];
  customerGrowth: { month: string; customers: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
}

export interface AnalyticsState {
  data: AnalyticsData;
  refreshData: () => void;
}

const initialData: AnalyticsData = {
  totalRevenue: 125430,
  totalCustomers: 1234,
  totalOrders: 5678,
  conversionRate: 3.2,
  revenueHistory: [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ],
  customerGrowth: [
    { month: 'Jan', customers: 800 },
    { month: 'Feb', customers: 850 },
    { month: 'Mar', customers: 920 },
    { month: 'Apr', customers: 980 },
    { month: 'May', customers: 1100 },
    { month: 'Jun', customers: 1234 },
  ],
  topProducts: [
    { name: 'Product A', sales: 1234, revenue: 45000 },
    { name: 'Product B', sales: 987, revenue: 38000 },
    { name: 'Product C', sales: 756, revenue: 29000 },
    { name: 'Product D', sales: 543, revenue: 21000 },
    { name: 'Product E', sales: 321, revenue: 15000 },
  ],
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  data: initialData,
  
  refreshData: () => {
    // Simulate data refresh with slight variations
    set((state) => ({
      data: {
        ...state.data,
        totalRevenue: state.data.totalRevenue + Math.floor(Math.random() * 1000),
        totalCustomers: state.data.totalCustomers + Math.floor(Math.random() * 10),
        totalOrders: state.data.totalOrders + Math.floor(Math.random() * 50),
      },
    }));
  },
}));
