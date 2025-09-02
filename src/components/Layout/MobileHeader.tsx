import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Menu,
  X,
  FileText, 
  LayoutDashboard, 
  CheckSquare,
  LogOut,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
  { title: 'Operations', href: '/departments/operations', icon: LayoutDashboard, key: 'operations' },
  { title: 'Engineering & Maintenance', href: '/departments/engineeringmaintenance', icon: LayoutDashboard, key: 'engineeringmaintenance' },
  { title: 'Finance & Procurement', href: '/departments/financeprocurement', icon: LayoutDashboard, key: 'financeprocurement' },
  { title: 'Human Resources', href: '/departments/humanresources', icon: LayoutDashboard, key: 'humanresources' },
  { title: 'Safety & Regulatory', href: '/departments/safetyregulatory', icon: LayoutDashboard, key: 'safetyregulatory' },
];

export const MobileHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = sidebarItems.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  const userDeptKey = user?.department?.toLowerCase().replace(/\s+/g, '').replace('&', '');
  const filteredDepartments = user?.role === 'admin' 
    ? departmentItems 
    : departmentItems.filter(dept => dept.key === userDeptKey);

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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="h-16 bg-gradient-to-r from-primary to-orange-400 border-b border-border flex items-center justify-between px-4 md:hidden">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-xl">
          <FileText className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-bold text-primary-foreground">KMRL-iDMS</h2>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 p-0">
          <div className="h-full bg-card flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary to-orange-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-primary-foreground">KMRL-iDMS</h2>
                    <p className="text-xs text-primary-foreground/80">Document Management</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
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
                      <Link key={item.href} to={item.href} onClick={handleLinkClick}>
                        <div className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive 
                            ? "bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-premium" 
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        )}>
                          <Icon className="w-5 h-5" />
                          <span className="flex-1">{item.title}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Departments Navigation */}
              {filteredDepartments.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    DEPARTMENTS
                  </h3>
                  <div className="space-y-1">
                    {filteredDepartments.map((item) => {
                      const isActive = location.pathname === item.href;
                      const Icon = item.icon;
                      
                      return (
                        <Link key={item.href} to={item.href} onClick={handleLinkClick}>
                          <div className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive 
                              ? "bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-premium" 
                              : "text-foreground hover:bg-accent hover:text-accent-foreground"
                          )}>
                            <Icon className="w-5 h-5" />
                            <span className="flex-1">{item.title}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className={cn("w-12 h-12", getDepartmentColor(user?.department))}>
                  <AvatarFallback className="text-white font-medium">
                    {user?.role === 'admin' ? <Shield className="w-6 h-6" /> : user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role === 'admin' ? 'System Administrator' : user?.department}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="default" 
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={logout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};