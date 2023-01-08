import { Html, Head, Main, NextScript } from 'next/document'



export default function Document() {
  const script = ``
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
