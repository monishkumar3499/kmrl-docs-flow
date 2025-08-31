import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'operations' | 'engineering' | 'finance' | 'hr' | 'safety' | 'primary';
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorVariants = {
  operations: 'from-operations/10 to-operations/5 border-operations/20',
  engineering: 'from-engineering/10 to-engineering/5 border-engineering/20',
  finance: 'from-finance/10 to-finance/5 border-finance/20',
  hr: 'from-hr/10 to-hr/5 border-hr/20',
  safety: 'from-safety/10 to-safety/5 border-safety/20',
  primary: 'from-primary/10 to-primary/5 border-primary/20',
};

const iconBgVariants = {
  operations: 'bg-operations',
  engineering: 'bg-engineering',
  finance: 'bg-finance',
  hr: 'bg-hr',
  safety: 'bg-safety',
  primary: 'bg-primary',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  description,
  trend
}) => {
  return (
    <Card className={cn(
      "relative overflow-hidden border-2 bg-gradient-to-br",
      colorVariants[color]
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className={cn(
                "inline-flex items-center text-xs font-medium",
                trend.isPositive ? "text-status-approved" : "text-status-rejected"
              )}>
                {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
              </div>
            )}
          </div>
          
          <div className={cn(
            "p-3 rounded-xl shadow-sm",
            iconBgVariants[color]
          )}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};