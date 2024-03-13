import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Option = {
  value: string;
  label: string;
};

type ComboboxProps = {
  options: Option[];
  initialValue?: string;
  onChange?: (value: string) => void;
  expanded?: boolean;
};

const Combobox: React.FC<ComboboxProps> = ({
  options,
  initialValue = '',
  onChange,
  expanded = false,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
    if (onChange) {
      onChange(currentValue);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={(!expanded && 'w-[200px]') + ' justify-between'}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : 'Select option...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={(!expanded && 'w-[200px]') + ' p-0'}>
        <Command>
          <CommandInput placeholder='Search option...' />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
