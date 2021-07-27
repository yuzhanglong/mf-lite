const createIntl = () => {
  return (string: string, args: any) => {
    return `intl: ${string}`
  }
}

const intl = createIntl()

window.intl = intl

export default intl
