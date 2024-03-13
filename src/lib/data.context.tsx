'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { IFolder, ISnippet } from './interfaces';
import { uuid } from 'uuidv4';

const DataContext = createContext<{ handler: DataHandlerBase } | undefined>(
  undefined
);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within MultiSelectProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: any }> = ({ children }) => {
  const dataHanlder: DataHandlerBase = new SessionDataHandler();
  return (
    <DataContext.Provider value={{ handler: dataHanlder }}>
      {children}
    </DataContext.Provider>
  );
};

abstract class DataHandlerBase {
  /**
   * Retrieves an array of folders.
   * @abstract
   * @returns {IFolder[]} The array of folders.
   */
  abstract getFolders(): IFolder[];

  /**
   * Creates a new folder.
   * @abstract
   * @param {IFolder} newFolder The folder to create.
   * @returns {void}
   * @example createFolder({ title: 'Hello World', ... });
   */
  abstract createFolder(newFolder: IFolder): void;

  /**
   * Updates a folder.
   * @abstract
   * @param {IFolder} folder The folder to update.
   * @returns {void}
   * @example updateFolder({ title: 'Hello World', ... });
   */
  abstract updateFolder(folder: IFolder): void;

  /**
   * Deletes a folder.
   * @abstract
   * @param {string} id The id of the folder to delete.
   * @returns {void}
   * @example deleteFolder('123');
   */
  abstract deleteFolder(id: string): void;

  /**
   * Retrieves an array of snippets.
   * @abstract
   * @returns {ISnippet[]} The array of snippets.
   */
  abstract getSnippets(): ISnippet[];

  /**
   * Creates a new snippet.
   * @abstract
   * @param {ISnippet} snippet The snippet to create.
   * @returns {void}
   * @example createSnippet({ title: 'Hello World', language: 'javascript' });
   */
  abstract createSnippet(snippet: ISnippet): void;

  /**
   * Soft deletes a snippet.
   * @abstract
   * @param {string} id The id of the snippet to soft delete.
   * @returns {void}
   * @example deleteSnippet('123');
   */
  abstract softDeleteSnippet(id: string): void;

  /**
   * Restores a soft deleted snippet.
   * @abstract
   * @param {string} id The id of the snippet to restore.
   * @returns {void}
   * @example restoreSnippet('123');
   */
  abstract restoreSnippet(id: string): void;

  /**
   * Updates a snippet.
   * @abstract
   * @param {ISnippet} snippet The snippet to update.
   * @returns {void}
   * @example updateSnippet({ title: 'Hello World', language: 'javascript' });
   */
  abstract updateSnippet(snippet: ISnippet): void;

  /**
   * Initializes the data handler.
   * @abstract
   * @returns {void}
   * @example init();
   */
  abstract init(): void;
}

class SessionDataHandler extends DataHandlerBase {
  private folders: IFolder[] = [];
  private snippets: ISnippet[] = [];

  init(): void {
    this.loadFromSession();
  }

  private loadFromSession() {
    const sessionFolders = sessionStorage.getItem('folders');
    const sessionSnippets = sessionStorage.getItem('snippets');

    console.log('sessionFolders', sessionFolders);
    console.log('sessionSnippets', sessionSnippets);

    if (sessionFolders) {
      this.folders = JSON.parse(sessionFolders);
    }

    if (sessionSnippets) {
      this.snippets = JSON.parse(sessionSnippets);
    }
  }

  private saveToSession() {
    sessionStorage.setItem('folders', JSON.stringify(this.folders));
    sessionStorage.setItem('snippets', JSON.stringify(this.snippets));
  }

  getFolders(): IFolder[] {
    return this.folders;
  }

  createFolder(newFolder: IFolder): void {
    this.folders.push(newFolder);
    this.saveToSession();
  }

  updateFolder(folder: IFolder): void {
    const index = this.folders.findIndex((f) => f.id === folder.id);
    if (index !== -1) {
      this.folders[index] = folder;
      this.saveToSession();
    }
  }

  deleteFolder(id: string): void {
    this.snippets = this.snippets.map((s) =>
      s.path === id ? { ...s, path: 'snippets' } : s
    );
    this.folders = this.folders.filter((f) => f.id !== id);
    this.saveToSession();
  }

  getSnippets(): ISnippet[] {
    return this.snippets;
  }

  createSnippet(snippet: ISnippet): void {
    const newSnippet: ISnippet = { ...snippet, id: uuid() };
    this.snippets.push(newSnippet);
    this.saveToSession();
  }

  softDeleteSnippet(id: string): void {
    this.snippets = this.snippets.map((s) =>
      s.id === id ? { ...s, isDeleted: true } : s
    );
    this.saveToSession();
  }

  restoreSnippet(id: string): void {
    this.snippets = this.snippets.map((s) =>
      s.id === id ? { ...s, isDeleted: false } : s
    );
    this.saveToSession();
  }

  updateSnippet(snippet: ISnippet): void {
    const index = this.snippets.findIndex((s) => s.id === snippet.id);
    if (index !== -1) {
      this.snippets[index] = snippet;
      this.saveToSession();
    }
  }
}

export default SessionDataHandler;
