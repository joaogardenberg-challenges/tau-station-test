import ReduxProvider from './Redux'
import ThemeProvider from './Theme'
import RouterProvider from './Router'
import { ProviderProps } from 'types'

export default function Providers({ children }: ProviderProps) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <RouterProvider>{children}</RouterProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
