import {ThemeProvider} from '@mui/material/styles'
import BaseApp from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import client from '../client'
import theme from '../themes/theme'
import {navigationQuery} from '../utils/consts/groq/navigationQuery.js'
import siteConfigQuery from '../utils/consts/groq/siteConfigQuery.js'

class App extends BaseApp {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    // Add the page props from the given pages inital props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Add site navigation from sanity
    await client.fetch(navigationQuery).then((navigation) => {
      if (navigation && pageProps) {
        pageProps.navigation = navigation
      }
    })

    // Add site config from sanity
    return client.fetch(siteConfigQuery).then((config) => {
      if (!config) {
        return {pageProps}
      }
      if (config && pageProps) {
        pageProps.config = config
      }
      return {pageProps}
    })
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width shrink-to-fit=no"
          />
        </Head>

        <script
          async
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
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default App
