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
    const date = searchParams.get('date') || ""
    const reading_time = searchParams.get('reading_time') || ""
    const author_name = searchParams.get('author_name') || ""
    const author_picture = searchParams.get('author_picture') || ""
    const author_html_url = searchParams.get('author_html_url') || ""
    const title = searchParams.get('title') || ""
    // query is "hello" for /api/search?query=hello
 
  return new ImageResponse(
    (
        <Card>
        <CardHeader>
          <div className="flex items-center">
            <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.75rem] font-medium font-mono border-none mb-4">
              <DateFormatter dateString={date} /> · {reading_time} min
              {reading_time === "1" ? "" : "s"} read
            </Badge>
          </div>
          <Avatar
            name={author_name}
            picture={author_picture}
            html_url={author_html_url}
          />
        </CardHeader>
        <CardContent>
          <h3 className={`hover:underline text-xl xl:text-2xl leading-snug font-bold`}>
            {title}
          </h3>
    </CardContent>
</Card>

    ),
  )
}