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
    },
    transitions: {
      duration: {
        // standard: 3000,
        // enteringScreen: 3000,
        // leavingScreen: 3000,
        // complex: 3000
      }
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
