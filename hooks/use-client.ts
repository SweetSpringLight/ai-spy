import { useState, useEffect } from 'react'

export function useClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

export function useClientOnly<T>(value: T, fallback: T): T {
  const isClient = useClient()
  return isClient ? value : fallback
}