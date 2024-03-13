import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import 'highlight.js/styles/vs2015.css';
import { useTheme } from 'next-themes';

import Combobox from './combobox';
import { SUPPORTED_CODING_LANGUAGES } from '@/lib/constants';
import { Button } from './ui/button';
import { ISnippet } from '@/lib/interfaces';

function CodePreviewer({
  snippet,
  onEntityChange,
}: {
  snippet: ISnippet;
  onEntityChange: (snippet: ISnippet) => void;
}) {
  const [code, setCode] = useState(snippet.code);
  const [language, setLanguage] = useState(snippet.language);
  const [autoDetect, setAutoDetect] = useState(true);
  const { theme } = useTheme();

  const detectLanguage = async (codeSnippet: string) => {
    try {
      if (autoDetect) {
        const response = await fetch('/api/detect-language', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codeSnippet }),
        });
        const data = await response.json();
        setLanguage(data.language);
        snippet.language =
          SUPPORTED_CODING_LANGUAGES.find(
            (elem) => elem.value === data.language
          )?.label ?? '';
        onEntityChange(snippet);
      }
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  };

  useEffect(() => {
    if (code?.trim()) {
      detectLanguage(code);
    }
  }, [code, autoDetect]);

  useEffect(() => {
    setCode(snippet.code);
  }, [snippet]);

  const handleLanguageChange = (selectedLanguage: string) => {
    if (selectedLanguage === 'auto') {
      setAutoDetect(true);
    } else {
      setAutoDetect(false);
      setLanguage(selectedLanguage);
      snippet.language =
        SUPPORTED_CODING_LANGUAGES.find(
          (elem) => elem.value === selectedLanguage
        )?.label ?? '';
      onEntityChange(snippet);
    }
  };

  const saveCodeSnippet = () => {
    snippet.code = code;
    onEntityChange(snippet);
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='p-2 flex'>
        <Combobox
          options={SUPPORTED_CODING_LANGUAGES}
          initialValue={autoDetect ? 'auto' : language}
          onChange={handleLanguageChange}
        />
        {snippet.code !== code && (
          <Button
            className='ml-auto mr-2'
            variant='default'
            onClick={saveCodeSnippet}
          >
            Save
          </Button>
        )}
      </div>
      <Editor
        onChange={(value) => {
          setCode(value?.toString() || '');
        }}
        language={language}
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        value={code}
      />
      <div className='flex gap-4 bg-secondary'>
        <p>
          {autoDetect ? 'Detected language: ' : 'Selected language: '}
          {
            SUPPORTED_CODING_LANGUAGES.find((elem) => elem.value === language)
              ?.label
          }
        </p>
      </div>
    </div>
  );
}
export default CodePreviewer;
