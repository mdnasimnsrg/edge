'use client'

import { NextIntlClientProvider } from 'next-intl'
import { TooltipProvider } from '../ui/tooltip'

export function IntlWrapper({
  children,
  locale,
  messages
}: {
  children: React.ReactNode
  locale: string
  messages: any
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone='Africa/Cairo'>
      <TooltipProvider>{children}</TooltipProvider>
    </NextIntlClientProvider>
  )
}
