import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

export const StatCard = ({
  title,
  value,
  icon,
  color,
  description,
  trend
}) => {
  return (
    <Card className={cn(
      'border-l-4 bg-gradient-to-br shadow-premium',
      colorVariants[color]
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-bold tracking-tight text-muted-foreground">
            {title}
          </h3>
          <div className={cn(
            'p-2 rounded-xl text-white',
            iconBgVariants[color]
          )}>
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs font-bold text-muted-foreground">
              {description}
            </p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center text-xs font-medium',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              <span className="mr-1">
                {trend.isPositive ? '↗' : '↘'}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};