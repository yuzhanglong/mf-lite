declare global {
  const intl: (key: string, args?: Record<string, any>) => string

  interface Window {
    intl: (key: string, args?: Record<string, any>) => string
  }
}

export {}
