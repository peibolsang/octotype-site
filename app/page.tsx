import Head from "next/head";
import MainIntro from "@/components/client/main-intro"
import { HowItWorks } from "@/components/client/how-it-works";
import { AllStoriesServer } from "@/components/server/all-stories";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import { AllStoriesSkeleton } from "@/components/client/skeleton/all-stories-skeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  //metadataBase: new URL('https://octotype.app'),
  title: 'octotype',
  description: 'The content discovery platform for developers',
  openGraph: {
    title: 'octotype',
    description: 'The content discovery platform for developers',
    url: 'https://octotype.app',
    siteName: 'octotype',
    images: [
      {
        url: 'https://octotype.app/cover.png', // Must be an absolute URL
        width: 800,
        height: 600,
        alt: 'octotype Home Page'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'octotype - The content discovery platform for developers',
    description: 'The content discovery platform for developers',
    creator: '@peibolsang',
    images: ['https://octotype.app/cover.png'], // Must be an absolute URL
  },
}

export default function Page() {
  return (
    <div>
        <MainIntro />
        <Suspense fallback={<AllStoriesSkeleton/>} >
          <AllStoriesServer />
        </Suspense>
        <HowItWorks username={'[user]'} />
    </div>
  );
}
