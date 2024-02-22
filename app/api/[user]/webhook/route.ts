import { revalidatePath } from "next/cache"

export async function POST(
  request: Request,
  { params }: { params: { user: string } }
) {
    const res = await request.json()
    revalidatePath(`/${params.user}`)
    
    return new Response('Success!', {
      status: 200,
    })
  }