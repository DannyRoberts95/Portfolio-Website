import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import client from '../client'
import {CssBaseline} from '@mui/material'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then((lang) => {
      return {...initialProps, lang}
    })
  }

  render() {
    return (
      <Html lang={this.props.lang || 'en'}>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/lgy7aee.css" />

          {/* favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>

          {/* {embededSnippets &&
            embededSnippets.map((snippet) => {
              const {
                _key,
                embededSnippet: {html},
                snippetTitle,
              } = snippet
              console.log(html.trim())
              if (!html) return null
              return (
                <span
                  key={_key}
                  id={snippetTitle.trim().replace(' ', '_') + '_script_mounting_container'}
                  dangerouslySetInnerHTML={{__html: html.trim()}}
                />
              )
            })} */}
        </Head>
        <CssBaseline enableColorScheme />
        <body id={'documentBody'}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
