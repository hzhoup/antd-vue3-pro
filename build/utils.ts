export function wrapperEnv(envConf: Recordable): ViteEnv {
  const result: any = {}

  for (const key of Object.keys(envConf)) {
    let value = envConf[key].replace(/\\n/g, '\n')

    value = value === 'true' ? true : value === 'false' ? false : value

    if (key === 'VITE_PORT') value = Number(value)
    if (key === 'VITE_PROXY' && value) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'))
      } catch {
        value = undefined
      }
    }

    result[key] = value
    if (typeof value === 'string') {
      process.env[key] = value
    } else if (typeof value === 'object') {
      process.env[key] = JSON.stringify(value)
    }
  }

  return result
}