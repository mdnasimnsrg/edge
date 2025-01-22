import { Footer } from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { redirect } from '@/navigatios'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: { default: 'Rabet Dashboard', template: '%s' },
  description: 'user page'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (!session) redirect('/login')

  return (
    <main className='flex h-screen'>
      <Sidebar />
      <div className='w-full overflow-y-scroll bg-[#eef6f6]'>
        <Navbar />
        <div className=' min-h-[calc(100vh-64px)]'>{children}</div>
        <Footer />
      </div>
    </main>
  )
}
