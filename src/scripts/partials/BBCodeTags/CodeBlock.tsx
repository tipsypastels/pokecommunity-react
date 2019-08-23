import React, { ReactNode } from 'react';
import SyntaxHighlighterWithSupportedLanguages from './CodeBlock/SyntaxHighlighterWithSupportedLanguages';
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { codeBlock } from '../../../configs/config.json';
import { capitalize } from '../../helpers/StringHelpers';

const { aliases } = codeBlock;

function realLanguageName(lang: string) {
  if (aliases[lang]) {
    return aliases[lang];
  }
  return lang;
}

interface IProps {
  language?: string;
  children: ReactNode;
}

// TODO this doesn't work with newline, figure out a better way of doing it
export default function CodeBlock(props: IProps) {
  const language = props.language || 'text';
  const langNamePretty = language === 'text'
    ? 'Code Block'
    : capitalize(realLanguageName(language));

  return (
    <div className="CodeBlock">
      <strong className="flex-grows">
        {langNamePretty}
      </strong>

      <SyntaxHighlighterWithSupportedLanguages 
        language={language}
        style={a11yDark}
        showLineNumbers={true}
      >
        {props.children.toString()}
      </SyntaxHighlighterWithSupportedLanguages>
    </div>
  );
}