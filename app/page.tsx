import Head from "next/head";
import MainIntro from "@/components/client/main-intro"
import { HowItWorks } from "@/components/client/how-it-works";
import { AllStoriesServer } from "@/components/server/all-stories";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import { AllStoriesSkeleton } from "@/components/client/skeleton/all-stories-skeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
        <Head>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={HOME_OG_IMAGE_URL} />
          <meta
            name="twitter:title"
            content="octotype - The content discovery platform for developers"
          />
        </Head>
        <MainIntro />
        <Suspense fallback={<AllStoriesSkeleton/>} >
          <AllStoriesServer />
        </Suspense>
        <HowItWorks />
    </div>
  );
}
