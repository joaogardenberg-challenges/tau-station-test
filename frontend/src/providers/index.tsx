import RouterProvider from './Router'
import ReduxProvider from './Redux'
import { ProviderProps } from 'types'

export default function Providers({ children }: ProviderProps) {
  return (
    <ReduxProvider>
      <RouterProvider>{children}</RouterProvider>
    </ReduxProvider>
  )
}
