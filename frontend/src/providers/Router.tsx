import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

interface RouterProviderProps {
  children: ReactNode
}

export default function RouterProvider({ children }: RouterProviderProps) {
  return <BrowserRouter>{children}</BrowserRouter>
}
