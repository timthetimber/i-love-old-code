'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buttonVariants } from './ui/button';
import { INavItem } from '@/lib/interfaces';
import { Folder } from 'lucide-react';

interface NavProps {
  isCollapsed: boolean;
  navItems: INavItem[];
  onNavItemClick: (id?: string) => void;
}

export function Nav({ navItems, isCollapsed, onNavItemClick }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'
    >
      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {navItems.map((navItem, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href='#'
                  onClick={() => onNavItemClick(navItem.id)}
                  className={cn(
                    buttonVariants({ variant: navItem.variant, size: 'icon' }),
                    'h-9 w-9',
                    navItem.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                  )}
                >
                  {navItem.icon === undefined ? (
                    <Folder className='h-4 w-4' />
                  ) : (
                    <navItem.icon className='h-4 w-4' />
                  )}
                  <span className='sr-only'>{navItem.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right' className='flex items-center gap-4'>
                {navItem.title}
                {navItem.label && (
                  <span className='ml-auto text-muted-foreground'>
                    {navItem.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              onClick={() => onNavItemClick(navItem.id)}
              href='#'
              className={cn(
                buttonVariants({ variant: navItem.variant, size: 'sm' }),
                navItem.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                navItem.variant === 'secondary' &&
                  'bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-300 hover:bg-primary hover:text-white dark:hover:text-black',
                'justify-start'
              )}
            >
              {navItem.icon === undefined ? (
                <Folder className='mr-2 h-4 w-4' />
              ) : (
                <navItem.icon className='mr-2 h-4 w-4' />
              )}
              {navItem.title}
              {navItem.label && (
                <span
                  className={cn(
                    'ml-auto',
                    navItem.variant === 'default' &&
                      'text-background dark:text-white'
                  )}
                >
                  {navItem.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
