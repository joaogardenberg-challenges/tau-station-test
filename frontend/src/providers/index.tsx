import Router from './Router'
import { ProviderProps } from 'types'

export default function Providers({ children }: ProviderProps) {
  return <Router>{children}</Router>
}
