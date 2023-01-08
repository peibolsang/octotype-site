import { AppProps } from 'next/app'
import '../styles/index.css'
import {Analytics} from '@vercel/analytics/react'
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        <Analytics/>
      </ThemeProvider>
      
    </>
  )
}
