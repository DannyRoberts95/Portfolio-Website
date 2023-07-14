import {ThemeProvider} from '@mui/material/styles'
import {Analytics} from '@vercel/analytics/react'
import BaseApp from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import isServer from 'utils/isServer'
import client from '../client'
import theme from '../themes/theme'

import {siteQuery} from '../utils/consts/groq/index.js'

class App extends BaseApp {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    // Add the page props from the given pages inital props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    await client.fetch(siteQuery).then((res) => {
      pageProps = {...pageProps, ...res}
    })

    return {pageProps}
  }

  render() {
    const {Component, pageProps} = this.props

    if (!isServer) {
      console.groupCollapsed(
        '%c🔮 Designed and Developed by Dan Howard 🔮 \n– https://www.danhowarddesign.com',
        'display:block;padding:0.125em 1em;font-family:courier;font-size:10px;font-weight:bold;line-height:2;text-transform:uppercase;background:black;color:white;'
      )
      console.groupEnd()
    }

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width shrink-to-fit=no"
          />
        </Head>

        <Script
          async
          strategy="lazyOnload"
          id="ga-script-loader"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />

        <Script
          id="ga-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
                              window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                              page_path: window.location.pathname,
                              });
                          `,
          }}
        />

        {/* App render */}
        <ThemeProvider theme={theme}>
          <Analytics />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default App
