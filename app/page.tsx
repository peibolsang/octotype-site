import MainIntro from "@/components/client/main-intro"
import { HowItWorks } from "@/components/client/how-it-works";
import { AllStoriesServer } from "@/components/server/all-stories";
import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { AllStoriesSkeleton } from "@/components/client/skeleton/all-stories-skeleton";
import { Suspense } from "react";

const md = createMetadata()
export const metadata: Metadata = {...md}

export default function Page() {
  return (
    <div>
        <MainIntro />
        <Suspense fallback={<AllStoriesSkeleton/>}>
          <AllStoriesServer />
        </Suspense>
        <HowItWorks username={'[user]'} showUserProgress={false} />
    </div>
  );
}

export const dynamic = "force-static";
export const runtime = "nodejs";
export const revalidate = 3500
