import { IntlWrapper } from '@/components/providers/nextIntl'
import { ProgressBar } from '@/components/providers/progress-bar'
import QueryClientWrapper from '@/components/providers/query-client'
import { SessionWrapper } from '@/components/providers/session'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth'
import { getMessages } from 'next-intl/server'
import { Poppins } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: 'EDGE',
  description: 'EDGE Dashboard'
}

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'fallback'
})

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const session = await getServerSession()
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={PoppinsFont.className}>
        <SessionWrapper session={session}>
          <IntlWrapper locale={locale} messages={messages}>
            <QueryClientWrapper>{children}</QueryClientWrapper>
          </IntlWrapper>
        </SessionWrapper>
        <Toaster />
        <ProgressBar />
      </body>
    </html>
  )
}
