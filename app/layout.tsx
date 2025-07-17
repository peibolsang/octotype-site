import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from "@/components/client/footer";
import Meta from "@/components/ui/meta";
import ThemeClient from '@/components/client/theme';
import './globals.css'
import MainHeader from '@/components/client/main-header';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistMono.variable} ${GeistSans.className}`}>
        <ThemeClient>
          <Meta />
           <MainHeader />
            <div className="min-h-screen">
              <main>{children}</main>
            </div>
          <Footer />
        </ThemeClient>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  )
}