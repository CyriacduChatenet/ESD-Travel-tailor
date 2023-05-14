import { Context } from '@travel-tailor/contexts'
import { Inter } from 'next/font/google'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Context>
          <Navbar />
          {children}
          <Footer />
        </Context>
        </body>
    </html>
  )
}
