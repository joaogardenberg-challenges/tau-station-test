import { BrowserRouter } from 'react-router-dom'
import { ProviderProps } from 'interfaces'

export default function Router({ children }: ProviderProps) {
  return <BrowserRouter>{children}</BrowserRouter>
}
