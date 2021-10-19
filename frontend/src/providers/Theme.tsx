import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'
import { NODE_ENV } from 'config'

interface ThemeProviderProps {
  children: ReactNode
}

export default function Theme({ children }: ThemeProviderProps) {
  const theme = createTheme({
    palette: {
      background: { default: '#fff' },
      primary: { main: '#000' },
      secondary: { main: '#fff' }
    }
  })

  if (NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('%cTheme:', 'color: #56b13b', theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  )
}
