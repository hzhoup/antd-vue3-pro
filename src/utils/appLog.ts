import dayjs from 'dayjs'

const projectName = import.meta.env.APP_TITLE

export function appWarn(message: any) {
  console.warn(`${dayjs().format('YYYY-MM-DD HH:mm:ss')} [${projectName} warn]: ${message}`)
}

export function appLog(message: any) {
  console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')} [${projectName} log]: ${message}`)
}

export function appError(message: any) {
  console.error(`${dayjs().format('YYYY-MM-DD HH:mm:ss')} [${projectName} error]: ${message}`)
}
