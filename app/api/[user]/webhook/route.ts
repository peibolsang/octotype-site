import { revalidatePath } from "next/cache"
import { LABEL } from '@/lib/constants'
import type LabelType from "@/interfaces/label";

const isPublished = (labels: LabelType[]) => labels.find(label=>label.name===LABEL)? true : false

export async function POST(
  request: Request,
  { params }: { params: { user: string } }
) {
    const data = await request.json();
    const headers = request.headers;

    // Get the value of the x-github-event header
    const githubEvent = headers.get('X-Github-Event');

    if (githubEvent === 'issue' || githubEvent === 'issue_comment')
      if (data && (data.action==="created" || data.action==="edited") && isPublished(data.labels))
        revalidatePath(`/${params.user}/stories/${data.issue.number}`)

    revalidatePath(`/${params.user}`);
    
    return new Response('Success!', {
      status: 200,
    });
}
