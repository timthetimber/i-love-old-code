import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MultiSelector,
  MultiSelectorInput,
  MultiSelectorTrigger,
} from './ui/multi-select-api';
import Combobox from './combobox';
import { IFolder } from '@/lib/interfaces';

interface CodeSnippetDialogProps {
  onCreate: (
    value: string | null,
    path: string | null,
    tags: string[] | null
  ) => void;
  onEdit: (
    value: string | null,
    path: string | null,
    tags: string[] | null
  ) => void; // Add onEdit prop
  show: boolean;
  className?: string | undefined;
  editMode?: boolean;
  snippetName?: string;
  snippetTags?: string[];
  snippetPath?: string;
  activeLink?: string;
  folders?: IFolder[];
}

export function CodeSnippetDialog({
  onCreate,
  onEdit, // Add onEdit prop
  show,
  className,
  editMode = false,
  snippetName = '',
  snippetTags = [],
  snippetPath = '',
  activeLink = 'snippets',
  folders = [],
}: CodeSnippetDialogProps) {
  const [textValue, setTextValue] = React.useState(snippetName);
  const [tags, setTags] = React.useState(snippetTags);
  const [path, setPath] = React.useState(snippetPath);
  const [currentPath, setCurrentPath] = React.useState(activeLink); // Add activeLink state

  const handleCreate = () => {
    onCreate(textValue, path, tags);
    setTextValue('');
    setTags([]);
    setPath('');
  };

  const handleEdit = () => {
    onEdit(textValue, path, tags);
    setTextValue('');
    setTags([]);
    setPath('');
  };

  const handleCancel = () => {
    onCreate(null, null, null);
  };

  React.useEffect(() => {
    setTextValue(snippetName);
    setTags(snippetTags);
    setCurrentPath(activeLink);
  }, [snippetName, snippetTags, activeLink]);

  return (
    <div
      className={
        show
          ? 'absolute h-screen w-screen flex justify-center items-center'
          : 'hidden'
      }
    >
      <Card className={`w-[350px] z-10 ${className}`}>
        <CardHeader>
          <CardTitle>
            {editMode ? 'Edit Code Snippet' : 'Create Code Snippet'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder='Name of the code snippet'
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Tags</Label>
                <MultiSelector
                  value={tags}
                  onValueChange={(value) => {
                    setTags(value);
                  }}
                  createTags={true}
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder='Write down your tags' />
                  </MultiSelectorTrigger>
                </MultiSelector>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Path</Label>
                <Combobox
                  expanded={true}
                  options={[
                    { label: 'Snippets', value: 'snippets' },
                    ...folders.map((folder) => ({
                      label: folder.title,
                      value: folder.id,
                    })),
                  ]}
                  initialValue={currentPath}
                  onChange={(value) => setPath(value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button onClick={handleCancel} variant='outline'>
            Cancel
          </Button>
          {editMode ? ( // Render different button based on editMode prop
            <Button onClick={handleEdit}>Save</Button>
          ) : (
            <Button onClick={handleCreate}>Create</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
