import { LucideIcon } from 'lucide-react';

export interface INavItem {
  id?: string;
  title: string;
  icon?: LucideIcon;
  label?: string;
  variant?: 'default' | 'ghost' | 'secondary';
}

export interface ISideBarItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface IFolder {
  id: string;
  title: string;
  variant: 'default' | 'ghost';
}

export interface ISnippet {
  id: string;
  title: string;
  tags?: string[];
  language: string;
  code: string;
  isFavourite?: boolean;
  isDeleted?: boolean;
  deleteDate?: Date;
  path: string;
}
