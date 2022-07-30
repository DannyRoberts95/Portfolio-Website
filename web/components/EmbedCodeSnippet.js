import SyntaxHighlighter from 'react-syntax-highlighter'
import style from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light'

export default function EmbedCodeSnippet(props) {
  const {snippet, language} = props.value

  if (!snippet) {
    console.warn('No markdown found for embeded code preview.')
    return null
  }

  return (
    <SyntaxHighlighter language={language} style={style} wrapLongLines showLineNumbers>
      {snippet}
    </SyntaxHighlighter>
  )
}
