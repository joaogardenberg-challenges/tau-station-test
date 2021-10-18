import { ReactNode } from 'react'
import ReduxProvider from './Redux'
import ThemeProvider from './Theme'
import RouterProvider from './Router'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <RouterProvider>{children}</RouterProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
