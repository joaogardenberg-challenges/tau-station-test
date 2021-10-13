import { BrowserRouter } from 'react-router-dom'
import { ProviderProps } from 'types'

export default function RouterProvider({ children }: ProviderProps) {
  return <BrowserRouter>{children}</BrowserRouter>
}
