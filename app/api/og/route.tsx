import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge"
import Avatar from "@/components/ui/avatar";
import DateFormatter from "@/components/ui/date-formatter";

// Route segment config
export const runtime = 'edge'
 
// Image generation
export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
 
    const title = decodeURIComponent(searchParams.get('title') || "")
    // query is "hello" for /api/search?query=hello
 
  return new ImageResponse(
    (
        <Card>
        <CardContent>
          <h3 className={`hover:underline text-xl xl:text-2xl leading-snug font-bold`}>
            {title}
          </h3>
    </CardContent>
</Card>

    ),
  )
}