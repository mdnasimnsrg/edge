import { Metadata } from 'next'
import ErrorPage from './ErrorPage'

export const metadata: Metadata = {
  title: '404 Not found'
}
export default function CatchAllPage() {
  return <ErrorPage />
}
