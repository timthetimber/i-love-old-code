import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ISnippet } from './interfaces';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shouldDisplaySnippet(
  snippet: ISnippet,
  activeLink: string | null
) {
  if (activeLink === 'favorites') {
    return !snippet.isDeleted && snippet.isFavourite;
  }
  if (activeLink === 'deleted') {
    return snippet.isDeleted;
  }
  if (activeLink === 'snippets') {
    return !snippet.isDeleted;
  }
  return !snippet.isDeleted && snippet.path === activeLink;
}
