import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DiGA Dashboard',
  description: 'Get an overview of current DiGAs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}