
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "../../ui/skeleton";

const PostPreviewSkeleton = () => {
    return (
        <Card className="h-[350px] m-4" interactive>
            <CardHeader>
                <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                     ...
                </Badge>
                <div className="flex items-center">
                    <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                    <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="text-xl xl:text-2xl leading-snug font-bold">
                    <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                    <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                    <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                </h3>
                <div className="flex items-center mt-4">
                    <span className="mr-3">
                        <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-40 h-[18px] rounded-lg" />
                    </span>
                </div>
            </CardContent>
        </Card>
      );
}

export {PostPreviewSkeleton};