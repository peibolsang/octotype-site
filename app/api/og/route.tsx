import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image generation
export async function GET() {
  // Font
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        About Acme
      </div>
    ),
  )
}