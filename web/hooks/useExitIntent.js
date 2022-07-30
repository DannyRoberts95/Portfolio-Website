import {useEffect, useState} from 'react'

export default function useExitIntent() {
  const [exited, setExited] = useState(false)

  const handleExited = (e) => {
    const w = window.innerWidth
    const h = window.innerHeight
    const x = e.clientX
    const y = e.clientY
    const isOutsideScreen = x >= w || x <= 0 || y <= 0 || y >= h

    if (isOutsideScreen) {
      setExited(true)
    }
  }

  const handleEntered = (e) => {
    setExited(false)
  }

  useEffect(() => {
    const body = document.getElementById('documentBody')
    if (body) {
      body.onmouseleave = handleExited
      body.onmouseenter = handleEntered
    }

    return () => {
      body.onmouseleave = undefined
      body.onmouseenter = undefined
    }
  }, [])

  return exited
}
