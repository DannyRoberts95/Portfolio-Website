import {CssBaseline} from '@mui/material'
import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return client.fetch('*[_id == "global-config"] {lang}.lang[0]').then((lang) => {
  //     return {...initialProps, lang}
  //   })
  // }

  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;700&family=Teko:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          {/* favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>
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
