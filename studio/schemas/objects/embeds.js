import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import EmbedPlayer from '../preview/EmbedPlayer';
import PreviewCodeSnippet from '../preview/PreviewCodeSnippet';
import PreviewEquation from '../preview/PreviewEquation';

const HTMLpreview = ({ value }) => (
    // eslint-disable-next-line
    <div dangerouslySetInnerHTML={{ __html: value.html }} />
);

export const embedHTML = {
    name: 'embedHTML',
    title: 'Embed HTML',
    type: 'object',
    fields: [
        {
            name: 'html',
            title: 'HTML',
            type: 'text',
            options: {
                language: 'html',
            },
        },
    ],
    preview: {
        select: {
            html: 'html',
        },
        component: HTMLpreview,
    },
};

export const embedVideo = {
    type: 'object',
    name: 'embedVideo',
    title: 'Embed Video',
    fields: [
        {
            type: 'string',
            name: 'caption',
        },
        {
            type: 'url',
            name: 'url',
        },
    ],
    preview: {
        select: { url: 'url', caption: 'caption' },
        component: EmbedPlayer,
    },
};

export const embedEquation = {
    type: 'object',
    name: 'embedEquation',
    title: 'Embed Equation',
    fields: [
        {
            type: 'text',
            name: 'markdown',
            validation: Rule => Rule.required(),
        },
    ],
    preview: {
        select: { markdown: 'markdown' },
        component: PreviewEquation,
    },
};

export const embedCodeSnippet = {
    type: 'object',
    name: 'embedCodeSnippet',
    title: 'Embed Code',
    fields: [
        {
            title: 'Language',
            name: 'language',
            type: 'string',
            options: {
                list: [...SyntaxHighlighter.supportedLanguages],
            },
            initialValue: 'python',
            validation: Rule => Rule.required(),
        },
        {
            type: 'text',
            name: 'snippet',
            validation: Rule => Rule.required(),
        },
    ],
    preview: {
        select: {
            language: 'language',
            snippet: 'snippet',
        },
        component: PreviewCodeSnippet,
    },
};
