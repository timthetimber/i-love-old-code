import React from 'react';
import { Nav } from './nav';
import { Separator } from './ui/separator';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { IFolder, ISideBarItem } from '@/lib/interfaces';
import { ContextMenuContent, ContextMenuItem } from './ui/context-menu';
import { FolderNav } from './folder-nav';

interface SideBarNavProps {
  isCollapsed: boolean;
  folders: IFolder[];
  activeLink: string | null;
  getSideBarItems: () => ISideBarItem[];
  setShowNewFolder: (show: boolean) => void;
  onNavItemClick: (id?: string) => void;
  onFolderEdit: (folder: IFolder) => void;
  onFolderDelete: (folder: IFolder) => void;
}

const SideBarNav: React.FC<SideBarNavProps> = ({
  isCollapsed,
  folders,
  activeLink,
  getSideBarItems,
  setShowNewFolder,
  onNavItemClick,
  onFolderEdit,
  onFolderDelete,
}) => {
  const handleNavClick = (id?: string) => {
    if (id === 'new-folder') {
      setShowNewFolder(true);
      return;
    }
    onNavItemClick(id);
  };

  const folderContextMenu = (item: IFolder): React.ReactNode => {
    return (
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onFolderEdit(item)}>
          <Edit2 />
          <label className='ml-3'>Edit</label>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>
          <Trash2 />
          <label className='ml-3'>Delete</label>
        </ContextMenuItem>
      </ContextMenuContent>
    );
  };

  return (
    <>
      <Nav
        onNavItemClick={handleNavClick}
        isCollapsed={isCollapsed}
        navItems={getSideBarItems()}
      />
      <Separator />
      <Nav
        onNavItemClick={handleNavClick}
        isCollapsed={isCollapsed}
        navItems={[
          {
            id: 'new-folder',
            title: 'New Folder',
            label: '',
            icon: Plus,
            variant: 'secondary',
          },
        ]}
      />
      <FolderNav
        onClick={handleNavClick}
        isCollapsed={isCollapsed}
        folders={folders.map(
          (folder) =>
            ({
              ...folder,
              variant: activeLink === folder.id ? 'default' : 'ghost',
            } as IFolder)
        )}
        onFolderEdit={onFolderEdit}
        onFolderDelete={onFolderDelete}
      />
    </>
  );
};

export default SideBarNav;
