import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div className={cn("bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl backdrop-saturate-150 text-card-foreground rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-lg dark:shadow-none hover:shadow-xl transition-shadow duration-300", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }) {
  return <h3 className={cn("font-semibold leading-none tracking-tight", className)} {...props}>{children}</h3>;
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props}>{children}</div>;
}
