import { useAnalyticsStore } from '@/store/analyticsStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export function DashboardOverview() {
  const { data } = useAnalyticsStore();

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${data.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
    },
    {
      title: 'Total Customers',
      value: data.totalCustomers.toLocaleString(),
      icon: Users,
      change: '+8.2%',
    },
    {
      title: 'Total Orders',
      value: data.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      change: '+15.3%',
    },
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      icon: TrendingUp,
      change: '+2.1%',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 font-medium">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
