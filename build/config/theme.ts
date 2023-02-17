import { generate } from '@ant-design/colors'

export const primaryColor = '#1890ff'

export const darkMode = false

type GenerateTheme = 'default' | 'dark'

export function generateAntdColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, { theme })
}
