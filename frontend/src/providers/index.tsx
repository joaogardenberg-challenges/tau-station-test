import Router from './Router'
import { ProviderProps } from 'interfaces'

export default function Providers({ children }: ProviderProps) {
  return <Router>{children}</Router>
}
