import Script from 'next/script'
import React, {useEffect, useState} from 'react'

function Crisp() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!window.$crisp) {
      window.$crisp = []
      window.CRISP_WEBSITE_ID = 'c5123214-1e71-400d-a8aa-f1283c33d208'
      setReady(true)
    }
  }, [])

  if (!process.env.NODE_ENV === 'production') return null

  return ready ? (
    <Script id="crisp-script" src="https://client.crisp.chat/l.js" strategy="lazyOnload" />
  ) : null
}

export default Crisp
