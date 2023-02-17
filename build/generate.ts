import { getThemeVariables } from 'ant-design-vue/dist/theme'
import { resolve } from 'path'
import { generateAntdColors, primaryColor } from './config/theme'

export function generateModifyVars(dark = false) {
  const palettes = generateAntdColors(primaryColor)
  const primary = palettes[5]

  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index]
  }

  const modifyVars = getThemeVariables({ dark })

  return {
    ...modifyVars,
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'processing-color': primary,
    'info-color': primary,
    'success-color': '#52c41a',
    'error-color': '#f5222d',
    'warning-color': '#faad14',
    'font-size-base': '14px',
    'border-radius-base': '2px',
    'link-color': primary,
    'app-content-background': '#fafafa'
  }
}
