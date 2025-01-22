'use client'

import { useReloadSession } from '@/hooks/useReloadSession'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'

export function SessionWrapper({ children, session }: { children: React.ReactNode; session: any }) {
  const reload = useReloadSession()

  useEffect(() => {
    reload()
  }, [])

  return <SessionProvider session={session}>{children}</SessionProvider>
}
