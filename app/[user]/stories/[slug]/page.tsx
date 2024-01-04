import { StoryServer } from "@/components/server/story";
import Head from "next/head";
import MainHeader from "@/components/client/main-header";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import { StorySkeleton } from "@/components/client/skeleton/story-skeleton";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: {user: string, slug: string}
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const id = params.user
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    //metadataBase: new URL('https://octotype.app'),
    title: `octotype - ${params.user}`,
    description: 'The content discovery platform for developers',
    openGraph: {
    title: `octotype - ${params.user}`,
    description: 'The content discovery platform for developers',
    url: 'https://octotype.app',
    siteName: `octotype - ${params.user}`,
    images: [
      {
        url: 'https://octotype.app/cover.png', // Must be an absolute URL
        width: 800,
        height: 600,
        alt: `octotype - ${params.user}`
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `octotype - ${params.user}`,
    description: 'The content discovery platform for developers',
    creator: '@peibolsang',
    images: ['https://octotype.app/cover.png'], // Must be an absolute URL
  },
  }
}

export default function Page({params}: Props) {
  return (
    <div className="dark:bg-slate-800 dark:text-white">
        <MainHeader />
        <Suspense fallback={<StorySkeleton username={params.user}/>}>
          <StoryServer user={params.user} slug={params.slug}/>
        </Suspense>
    </div>
  );
}


 
