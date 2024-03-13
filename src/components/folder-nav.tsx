'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buttonVariants } from './ui/button';
import { Edit2, Folder, Trash2 } from 'lucide-react';
import { IFolder } from '@/lib/interfaces';
import { ContextMenu, ContextMenuTrigger } from '@radix-ui/react-context-menu';
import { ContextMenuContent, ContextMenuItem } from './ui/context-menu';

interface FolderNavProps {
  isCollapsed: boolean;
  folders: IFolder[];
  onClick: (id?: string) => void;
  onFolderEdit: (folder: IFolder) => void;
  onFolderDelete: (folder: IFolder) => void;
}

export function FolderNav({
  folders,
  isCollapsed,
  onClick,
  onFolderEdit,
  onFolderDelete,
}: FolderNavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'
    >
      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {folders.map((folder, index) => (
          <ContextMenu key={folder.id}>
            <ContextMenuTrigger>{NavItem(folder, index)}</ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => onFolderEdit(folder)}>
                <Edit2 />
                <label className='ml-3'>Edit</label>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onFolderDelete(folder)}>
                <Trash2 />
                <label className='ml-3'>Delete</label>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </nav>
    </div>
  );

  function NavItem(folder: IFolder, index: number) {
    return isCollapsed ? (
      <Tooltip key={index} delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href='#'
            onClick={() => onClick(folder.id)}
            className={cn(
              buttonVariants({ variant: folder.variant, size: 'icon' }),
              'h-9 w-9',
              folder.variant === 'default' &&
                'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
            )}
          >
            <Folder className='h-4 w-4' />
            <span className='sr-only'>{folder.title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {folder.title}
        </TooltipContent>
      </Tooltip>
    ) : (
      <Link
        key={index}
        onClick={() => onClick(folder.id)}
        href='#'
        className={cn(
          buttonVariants({ variant: folder.variant, size: 'sm' }),
          folder.variant === 'default' &&
            'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
          'justify-start',
          'w-full'
        )}
      >
        <Folder className='mr-2 h-4 w-4' />
        {folder.title}
      </Link>
    );
  }
}
