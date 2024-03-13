'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn, shouldDisplaySnippet } from '@/lib/utils';
import React, { use, useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodePreviewer from '@/components/code-previewer';
import Navbar from '@/components/navbar';
import SideBarNav from '@/components/sidebar';
import {
  IFolder,
  IFolder as FolderItem,
  ISideBarItem,
  ISnippet,
} from '@/lib/interfaces';
import { sideBarItems } from '@/lib/constants';
import CodeSnippet from '@/components/snippet';
import { uuid } from 'uuidv4';
import { CodeSnippetDialog } from '@/components/snippet.dialog';
import { useDataContext } from '@/lib/data.context';
import { FolderDialog } from '@/components/folder.dialog';

export default function Home() {
  // States and variables for the component
  const { handler } = useDataContext();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState<string | null>('snippets');

  const [folderEditMode, setFolderEditMode] = React.useState(false);
  const [activeFolder, setActiveFolder] = React.useState<IFolder | null>(null);
  const [showFolderDialog, setShowFolderDialog] = React.useState(false);
  const [folders, setFolders] = React.useState<FolderItem[]>(
    handler.getFolders()
  );

  const [showCodeSnippetDialog, setShowCodeSnippetDialog] =
    React.useState(false);
  const [activeSnippet, setActiveSnippet] = React.useState<string | null>(null);
  const [codeSnippets, setCodeSnippets] = React.useState<ISnippet[]>(
    handler.getSnippets()
  );
  const [snippetEditMode, setSnippetEditMode] = React.useState(false);
  const [activeCodeSnippetRef, setActiveSnippetRef] = React.useState<
    ISnippet | undefined
  >();

  const getSideBarItems = (): ISideBarItem[] => {
    return sideBarItems.map((sideBarItem) => ({
      ...sideBarItem,
      variant: activeLink === sideBarItem.id ? 'default' : 'ghost',
    }));
  };

  const handleFolderCreate = (value: string | null) => {
    setShowFolderDialog(false);
    if (value === null) {
      return;
    }
    var id = uuid();
    var newFolder: FolderItem = {
      id,
      title: value,
      variant: activeLink === id ? 'default' : 'ghost',
    };
    handler.createFolder(newFolder);
    setFolders(handler.getFolders());
  };

  useEffect(() => {
    setActiveSnippetRef(
      codeSnippets.find((snippet) => snippet.id === activeSnippet)
    );
  }, [activeSnippet, codeSnippets]);

  useEffect(() => {
    handler.init();
    setFolders(handler.getFolders());
    setCodeSnippets(handler.getSnippets());
  }, []);

  const handleCodeSnippetCreate = (
    value: string | null,
    path: string | null,
    tags: string[] | null
  ): void => {
    setShowCodeSnippetDialog(false);

    if (value === null) {
      return;
    }
    var id = uuid();
    var newCodeSnippet: ISnippet = {
      id,
      title: value,
      language: '',
      code: '',
      tags: tags ?? [],
      path: path ?? 'snippets',
    };

    handler.createSnippet(newCodeSnippet);
    setCodeSnippets(handler.getSnippets());
  };

  const onSnippetFavorite = (id: string) => {
    console.log('onSnippetFavorite', id);
    var snippet = codeSnippets.find((s) => s.id === id);
    if (!snippet) return;

    snippet.isFavourite = !snippet.isFavourite;

    handler.updateSnippet(snippet);
    setCodeSnippets((prev) => {
      const updatedSnippets = prev.map((s) => (s.id === id ? snippet : s));
      return updatedSnippets as ISnippet[];
    });
  };

  const onSnippetChange = (snippet: ISnippet) => {
    handler.updateSnippet(snippet);
    setCodeSnippets((prev) => {
      const updatedSnippets = prev.map((s) =>
        s.id === snippet.id ? snippet : s
      );
      return updatedSnippets;
    });
  };

  const onSnippetDelete = (id: string) => {
    handler.softDeleteSnippet(id);
    setCodeSnippets(handler.getSnippets());
  };

  const onSnippetRestore = (id: string) => {
    handler.restoreSnippet(id);
    setCodeSnippets(handler.getSnippets());
  };

  const navItemClicked = (id?: string) => {
    if (!id) {
      return;
    }
    setActiveLink(id);

    if (
      activeCodeSnippetRef &&
      !shouldDisplaySnippet(activeCodeSnippetRef, id)
    ) {
      setActiveSnippet(null);
    }
  };

  const handleSnippetEdited = (
    value: string | null,
    path: string | null,
    tags: string[] | null
  ) => {
    if (activeCodeSnippetRef) {
      const updatedSnippet = { ...activeCodeSnippetRef };
      if (value !== null) {
        updatedSnippet.title = value;
      }
      if (tags !== null) {
        updatedSnippet.tags = tags;
      }
      if (path !== null) {
        updatedSnippet.path = path;
      }
      onSnippetChange(updatedSnippet);
    }
    setShowCodeSnippetDialog(false);
    setActiveSnippet(null);
  };

  const onSnippetEdit = (id: string) => {
    setSnippetEditMode(true);
    setActiveSnippet(id);
    setShowCodeSnippetDialog(true);
  };

  const onFolderEdit = (name: string | null) => {
    if (!activeFolder || !name) {
      return;
    }
    var updatedFolder = { ...activeFolder, title: name };

    handler.updateFolder(updatedFolder);
    setFolders((prev) =>
      prev.map((f) => (f.id === updatedFolder.id ? updatedFolder : f))
    );

    setShowFolderDialog(false);
    setActiveFolder(null);
  };

  return (
    <div>
      <FolderDialog
        show={showFolderDialog}
        onCreate={handleFolderCreate}
        className='z-10 h-auto'
        editMode={folderEditMode}
        folderName={folderEditMode ? activeFolder?.title ?? '' : ''}
        onEdit={onFolderEdit}
      />
      <CodeSnippetDialog
        show={showCodeSnippetDialog}
        onCreate={handleCodeSnippetCreate}
        onEdit={handleSnippetEdited}
        snippetName={snippetEditMode ? activeCodeSnippetRef?.title ?? '' : ''}
        snippetTags={snippetEditMode ? activeCodeSnippetRef?.tags ?? [] : []}
        editMode={snippetEditMode}
        folders={folders}
        activeLink={
          (snippetEditMode ? activeCodeSnippetRef?.path : activeLink) ??
          'snippets'
        }
      />
      <div
        className={
          showFolderDialog || showCodeSnippetDialog
            ? 'h-screen flex flex-col blur'
            : 'h-screen flex flex-col'
        }
      >
        <Navbar
          showNewCodeSnippet={() => {
            setSnippetEditMode(false);
            setShowCodeSnippetDialog(true);
          }}
        />
        <TooltipProvider>
          <ResizablePanelGroup
            direction={'horizontal'}
            className='items-stretch'
          >
            <ResizablePanel
              collapsible={true}
              minSize={8}
              maxSize={10}
              defaultSize={10}
              onCollapse={() => setIsCollapsed(true)}
              onExpand={() => setIsCollapsed(false)}
              className={cn(
                isCollapsed &&
                  'min-w-[50px] transition-all duration-300 ease-in-out'
              )}
            >
              <SideBarNav
                onNavItemClick={navItemClicked}
                folders={folders}
                getSideBarItems={getSideBarItems}
                activeLink={activeLink}
                isCollapsed={isCollapsed}
                setShowNewFolder={setShowFolderDialog}
                onFolderEdit={(folder) => {
                  setActiveFolder(folder);
                  setFolderEditMode(true);
                  setShowFolderDialog(true);
                }}
                onFolderDelete={(folder) => {
                  handler.deleteFolder(folder.id);
                  setFolders(handler.getFolders());
                  setCodeSnippets(handler.getSnippets());
                  if (activeLink === folder.id) {
                    setActiveLink('snippets');
                  }
                }}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel collapsible={false} defaultSize={15} minSize={15}>
              <ScrollArea className='h-screen'>
                <div className='flex flex-col gap-2 p-1'>
                  {codeSnippets
                    .filter((snippet) =>
                      shouldDisplaySnippet(snippet, activeLink)
                    )
                    .map((snippet) => (
                      <CodeSnippet
                        key={snippet.title}
                        snippet={snippet}
                        selected={activeSnippet === snippet.id}
                        onSnippetClick={(id) => setActiveSnippet(id)}
                        onFavourite={onSnippetFavorite}
                        onSnippetDelete={onSnippetDelete}
                        onSnippetRestore={onSnippetRestore}
                        onSnippetEdit={onSnippetEdit}
                      />
                    ))}
                </div>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel collapsible={false} defaultSize={40} minSize={15}>
              {activeCodeSnippetRef && (
                <CodePreviewer
                  snippet={activeCodeSnippetRef}
                  onEntityChange={onSnippetChange}
                />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </TooltipProvider>
      </div>
    </div>
  );
}
