import {useEffect, useState} from 'react'

import isServer from '../utils/isServer'

export default function useOnScreen(ref, threshold = 0) {
  const [isIntersecting, setIntersecting] = useState(false)

  if (isServer || !Boolean(ref)) return false

  let options = {
    threshold,
  }

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    options
  )

  useEffect(() => {
    ref?.current && observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
