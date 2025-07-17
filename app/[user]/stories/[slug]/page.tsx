import { StoryServer} from "@/components/server/story";
import { Metadata, ResolvingMetadata } from 'next'
import { createMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import { StorySkeleton } from "@/components/client/skeleton/story-skeleton";

interface StoryPageProps {
  params: Promise<{ user: string; slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params }: StoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const md = createMetadata(resolvedParams.user)
  return {...md}
}

export default async function Page({params}: StoryPageProps) {
  const resolvedParams = await params;
  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <Suspense fallback={<StorySkeleton />}>
          <StoryServer user={resolvedParams.user} slug={resolvedParams.slug}/>
      </Suspense>
    </div>
  );
}

export const dynamic = "force-static";
export const runtime = "nodejs";