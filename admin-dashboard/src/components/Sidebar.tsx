import { Link } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  ShoppingCart,
  Mail,
  HelpCircle,
  LogOut,
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers (CRM)', href: '/customers', icon: Users },
  { name: 'Content (CMS)', href: '/content', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Messages', href: '/messages', icon: Mail },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, theme, setTheme, logout, user } = useAuthStore();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b">
            <h1 className="text-xl font-bold text-primary">Admin Pro</h1>
          </div>

          {/* User info */}
          {user && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="h-5 w-5" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                  Light Mode
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
