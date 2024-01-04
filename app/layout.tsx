import type { Metadata } from 'next'
import Footer from "@/components/client/footer";
import Meta from "@/components/ui/meta";
import ThemeClient from '@/components/client/theme';
import './globals.css'
import { Inter } from 'next/font/google';

const font=Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'octotype',
  description: 'The content discovery platform for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-[#f4f1ea] bg-opacity-20 dark:bg-slate-800 dark:text-white`}>
        <ThemeClient>
          <Meta />
            <div className="min-h-screen">
              <main>{children}</main>
            </div>
          <Footer />
        </ThemeClient>
      </body>
    </html>
  )
}