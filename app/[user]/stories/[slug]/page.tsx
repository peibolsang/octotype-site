import { StoryServer} from "@/components/server/story";
import { Metadata, ResolvingMetadata } from 'next'
import createMetadata from "@/lib/metadata";
import { Suspense } from "react";
import { StorySkeleton } from "@/components/client/skeleton/story-skeleton";

type Props = {
  params: {user: string, slug:string}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const md = createMetadata(params.user)
  return {...md}
}

export default function Page({params}: Props) {
  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <Suspense fallback={<StorySkeleton />}>
          <StoryServer user={params.user} slug={params.slug}/>
      </Suspense>
    </div>
  );
}

export const dynamic = "force-static";
export const runtime = "nodejs";