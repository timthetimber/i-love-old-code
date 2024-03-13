import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './ui/menubar';
import { useTheme } from 'next-themes';

const Navbar = ({
  showNewCodeSnippet,
}: {
  showNewCodeSnippet: () => void;
}): JSX.Element => {
  const { setTheme } = useTheme();

  return (
    <Menubar className='v-100'>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => showNewCodeSnippet()}>
            New Code-Snippet
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Theme</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => setTheme('light')}>Light</MenubarItem>
              <MenubarItem onClick={() => setTheme('dark')}>Dark</MenubarItem>
              <MenubarItem onClick={() => setTheme('system')}>
                System
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Navbar;
