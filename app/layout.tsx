'use client'

import type { Metadata } from 'next'

import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Provider from './provider'

import './globals.css'
import styles from './layout.module.css'

const roboto = Roboto({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Next Stock App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={roboto.className}>
        <header className={styles['main-header']}>
          <Link
            className={`link ${
              pathname === '/' ? styles['active-link'] : styles['link']
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`link ${
              pathname === '/grouped' ? styles['active-link'] : styles['link']
            }`}
            href="/grouped"
          >
            Grouped Daily
          </Link>
          <Link
            className={`link ${
              pathname === '/open-close'
                ? styles['active-link']
                : styles['link']
            }`}
            href="/open-close"
          >
            Daily Open/Close
          </Link>
        </header>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
