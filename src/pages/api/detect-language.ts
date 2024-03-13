// pages/api/detect-language.js

import { ModelOperations } from '@vscode/vscode-languagedetection';
import { NextApiRequest, NextApiResponse } from 'next';

const languageMapping: { [key: string]: string } = {
  asm: 'plaintext',
  bat: 'bat',
  c: 'c',
  cbl: 'plaintext',
  clj: 'plaintext',
  cmake: 'plaintext',
  coffee: 'plaintext',
  cpp: 'cpp',
  cs: 'csharp',
  css: 'css',
  csv: 'plaintext',
  dart: 'dart',
  dm: 'plaintext',
  dockerfile: 'dockerfile',
  erl: 'plaintext',
  ex: 'plaintext',
  f90: 'plaintext',
  go: 'go',
  groovy: 'plaintext',
  hs: 'plaintext',
  html: 'html',
  ini: 'ini',
  java: 'java',
  jl: 'julia',
  js: 'javascript',
  json: 'json',
  kt: 'kotlin',
  lisp: 'plaintext',
  lua: 'lua',
  makefile: 'plaintext',
  md: 'markdown',
  matlab: 'plaintext',
  mm: 'plaintext',
  ml: 'plaintext',
  pas: 'pascal',
  php: 'php',
  pm: 'perl',
  ps1: 'powershell',
  prolog: 'plaintext',
  py: 'python',
  rb: 'ruby',
  rs: 'rust',
  r: 'r',
  scala: 'scala',
  sh: 'shell',
  sql: 'sql',
  swift: 'swift',
  tex: 'plaintext',
  toml: 'plaintext',
  ts: 'typescript',
  v: 'plaintext',
  vba: 'vb',
  xml: 'xml',
  yaml: 'yaml',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { codeSnippet } = req.body;
    const modelOperations = new ModelOperations();

    try {
      const results = await modelOperations.runModel(codeSnippet);
      if (results && results.length > 0) {
        const language = languageMapping[results[0].languageId.toString()];
        // Return the most confident language detection result
        res.status(200).json({ language });
      } else {
        res.status(200).json({ language: 'plaintext' });
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      res.status(500).json({ error: 'Error detecting language' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
