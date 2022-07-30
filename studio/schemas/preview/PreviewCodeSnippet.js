import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function PreviewCodeSnippet(props) {
    const { snippet, language } = props.value;

    if (!snippet) {
        console.log('No markup found for embeded code.');
        return null;
    }

    return (
        <SyntaxHighlighter
            language={language}
            style={atomOneLight}
            wrapLongLines
            startingLineNumber
        >
            {snippet}
        </SyntaxHighlighter>
    );
}
