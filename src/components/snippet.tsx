import { ISnippet } from '@/lib/interfaces';
import { ArchiveRestore, Code, Edit2, Star, Trash, Trash2 } from 'lucide-react';
import React from 'react';
import { Badge } from './ui/badge';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu';

interface CodeSnippetProps {
  snippet: ISnippet;
  selected: boolean;
  onSnippetClick: (id: string) => void;
  onFavourite: (id: string) => void;
  onSnippetDelete: (id: string) => void;
  onSnippetRestore: (id: string) => void;
  onSnippetEdit: (id: string) => void;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  snippet,
  selected,
  onSnippetClick,
  onFavourite,
  onSnippetDelete,
  onSnippetRestore,
  onSnippetEdit,
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <button
          key={snippet.title}
          className={
            'flex flex-row items-center justify-between w-full min-h-20 border rounded-md p-3 ' +
            (selected
              ? 'bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600'
              : '')
          }
          onClick={() => onSnippetClick(snippet.id)}
        >
          <div className='flex flex-row items-center gap-2'>
            <div className='flex flex-row items-center gap-2'>
              <Code size={24} />
              <div className='flex flex-col items-start ml-2'>
                <div className='text-lg'>{snippet.title}</div>
                <div className='text-sm'>{snippet.language}</div>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <div className='flex flex-row items-center gap-2'>
              <div className='flex flex-col'>
                <div className='text-lg'>
                  {snippet.tags?.map((tag) => (
                    <Badge key={tag} variant='outline' className='m-1'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Star
                className='z-10'
                size={24}
                fill={snippet.isFavourite ? 'yellow' : 'none'}
                onClick={() => onFavourite(snippet.id)}
              />
            </div>
          </div>
        </button>
      </ContextMenuTrigger>
      {snippet.isDeleted ? (
        <ContextMenuContent>
          <ContextMenuItem onClick={() => onSnippetRestore(snippet.id)}>
            <ArchiveRestore />
            <label className='ml-3'>Restore</label>
          </ContextMenuItem>
        </ContextMenuContent>
      ) : (
        <ContextMenuContent>
          <ContextMenuItem onClick={() => onSnippetEdit(snippet.id)}>
            <Edit2 />
            <label className='ml-3'>Edit</label>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onSnippetDelete(snippet.id)}>
            <Trash2 />
            <label className='ml-3'>Delete</label>
          </ContextMenuItem>
        </ContextMenuContent>
      )}
    </ContextMenu>
  );
};

export default CodeSnippet;
