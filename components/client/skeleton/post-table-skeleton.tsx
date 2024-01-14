
import { Card } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Skeleton } from "@/components/ui/skeleton";

const PostTableSkeleton = () => {
    return (
        <Card>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4 py-3 w-1/5">
                    <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                </TableHead>
                <TableHead></TableHead>
                <TableHead className="py-4 w-3/4">
                    <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                    <TableRow>
                        <TableCell className="pl-4 py-3 w-1/5">
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-4 h-[18px] rounded-lg" />
                        </TableCell>
                        <TableCell className="py-4 pr-3 w-3/4 hover:underline text-l xl:text-xl leading-snug font-bold">
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-40 md:w-100 h-[18px] rounded-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="pl-4 py-3 w-1/5">
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-4 h-[18px] rounded-lg" />
                        </TableCell>
                        <TableCell className="py-4 pr-3 w-3/4 hover:underline text-l xl:text-xl leading-snug font-bold">
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-40 md:w-100 h-[18px] rounded-lg" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="pl-4 py-3 w-1/5">
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-4 h-[18px] rounded-lg" />
                        </TableCell>
                        <TableCell className="py-4 pr-3 w-3/4 hover:underline text-l xl:text-xl leading-snug font-bold">
                            <Skeleton className="bg-[#f4f1ea] dark:bg-slate-800 ml-2 w-40 md:w-100 h-[18px] rounded-lg" />
                        </TableCell>
                    </TableRow>
            </TableBody>
          </Table>
        </Card>
      );
}

export {PostTableSkeleton};