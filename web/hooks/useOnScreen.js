import {useEffect, useState} from 'react'

import isServer from '../utils/isServer'

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false)

  if (isServer || !Boolean(ref)) return false

  let options = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    options
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
