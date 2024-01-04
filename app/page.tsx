import MainIntro from "@/components/client/main-intro"
import { HowItWorks } from "@/components/client/how-it-works";
import { AllStoriesServer } from "@/components/server/all-stories";
import { AllStoriesSkeleton } from "@/components/client/skeleton/all-stories-skeleton";
import { Suspense } from "react";
import { Metadata } from "next";
import createMetadata from "@/lib/metadata";

const md = createMetadata()
export const metadata: Metadata = {...md}

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