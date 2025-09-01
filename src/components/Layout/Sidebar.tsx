import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Shield,
  CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard, adminOnly: true },
  { title: 'All Documents', href: '/documents', icon: FileText },
  { title: 'Approvals', href: '/approvals', icon: CheckSquare },
];

const departmentItems = [
  { title: 'Operations', href: '/departments/operations', icon: LayoutDashboard },
  { title: 'Engineering & Maintenance', href: '/departments/engineeringmaintenance', icon: LayoutDashboard },
  { title: 'Finance & Procurement', href: '/departments/financeprocurement', icon: LayoutDashboard },
  { title: 'Human Resources', href: '/departments/humanresources', icon: LayoutDashboard },
  { title: 'Safety & Regulatory', href: '/departments/safetyregulatory', icon: LayoutDashboard },
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredItems = sidebarItems.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  const getDepartmentColor = (department?: string) => {
    if (!department) return 'bg-primary';
    
    const dept = department.toLowerCase();
    if (dept.includes('operations')) return 'bg-operations';
    if (dept.includes('engineering')) return 'bg-engineering';
    if (dept.includes('finance')) return 'bg-finance';
    if (dept.includes('human') || dept.includes('hr')) return 'bg-hr';
    if (dept.includes('safety')) return 'bg-safety';
    return 'bg-primary';
  };

  return (
    <div className="h-full bg-card border-r border-border flex flex-col shadow-premium">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary to-orange-400 rounded-xl">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">KMRL-iDMS</h2>
            <p className="text-xs text-muted-foreground">Document Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Main Navigation */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {user?.role === 'admin' ? 'ADMINISTRATION' : 'NAVIGATION'}
          </h3>
          <div className="space-y-1">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.href} to={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-premium" 
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}>
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{item.title}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Departments Navigation */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            DEPARTMENTS
          </h3>
          <div className="space-y-1">
            {departmentItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link key={item.href} to={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-premium" 
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}>
                    <Icon className="w-4 h-4" />
                    <span className="flex-1 text-xs sm:text-sm">{item.title}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className={cn("w-10 h-10", getDepartmentColor(user?.department))}>
            <AvatarFallback className="text-white font-medium">
              {user?.role === 'admin' ? <Shield className="w-5 h-5" /> : user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role === 'admin' ? 'System Administrator' : user?.department}
            </p>
          </div>
        </div>
        
        <Separator className="mb-3" />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};