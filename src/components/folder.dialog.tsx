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

interface FolderDialogProps {
  onCreate: (value: string | null) => void;
  onEdit: (value: string | null) => void;
  show: boolean;
  className: string | undefined;
  editMode: boolean; // New prop for edit mode
  folderName: string;
}

export function FolderDialog({
  onCreate,
  onEdit,
  show,
  className,
  editMode,
  folderName,
}: FolderDialogProps) {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    editMode ? onEdit(inputValue) : onCreate(inputValue);
    setInputValue('');
  };

  const handleCancel = () => {
    setInputValue('');
    onCreate(null);
  };

  React.useEffect(() => {
    setInputValue(folderName);
  }, [folderName]);

  return (
    <div
      className={
        show
          ? 'absolute h-screen w-screen flex justify-center items-center'
          : 'hidden'
      }
    >
      <Card className={`w-[350px] ${className}`}>
        <CardHeader>
          <CardTitle>{editMode ? 'Edit Folder' : 'Create Folder'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder='Name of the folder'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button onClick={handleCancel} variant='outline'>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{editMode ? 'Save' : 'Create'}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
