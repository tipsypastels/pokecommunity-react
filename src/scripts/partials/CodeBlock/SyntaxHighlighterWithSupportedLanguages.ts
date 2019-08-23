import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { codeBlock } from '../../../configs/config.json'; 


const { languages, aliases } = codeBlock;

function fetchLang(name: string) {
  return require(`react-syntax-highlighter/dist/esm/languages/hljs/${name}`).default;
}

(function(s) {
  for (let lang of languages) {
    s.registerLanguage(lang, fetchLang(lang));
  }

  for (let alias of Object.keys(aliases)) {
    s.registerLanguage(alias, fetchLang(aliases[alias]));
  }
})(SyntaxHighlighter);

export default SyntaxHighlighter;