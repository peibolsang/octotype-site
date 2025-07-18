import { revalidatePath } from "next/cache"
import { LABEL } from '@/lib/constants'
import type LabelType from "@/interfaces/label";

const isPublished = (labels: LabelType[]) => labels.find(label=>label.name===LABEL)? true : false

export async function POST(
  request: Request,
  { params }: { params: Promise<{ user: string }> }
) {
    const resolvedParams = await params;
    const data = await request.json();
    const headers = request.headers;

    // Get the value of the x-github-event header
    const githubEvent = headers.get('X-Github-Event');

    if (githubEvent === 'issue' || githubEvent === 'issue_comment'){
      if (data && (data.action==="created" || data.action==="edited" || data.action==="labeled")){

        const issueLabels: LabelType[] = data.issue.labels.map((label:LabelType) => ({
            color: label.color,
            name: label.name
         }))

        if (isPublished(issueLabels)) revalidatePath(`/${resolvedParams.user}/stories/${data.issue.number}`)

      } 
      revalidatePath(`/${resolvedParams.user}`);
    }

    if (githubEvent === 'push') {
      revalidatePath(`/${resolvedParams.user}`);
    }

    return new Response('Success!', {
      status: 200,
    });
}
