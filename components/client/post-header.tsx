import Avatar from "@/components/ui/avatar";
import DateFormatter from "@/components/ui/date-formatter";
import PostTitle from "@/components/client/post-title";
import type Author from "@/interfaces/author";
import Reactions from "@/interfaces/reactions";
import Link from "next/link";
import Container from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";


type Props = {
  title: string;
  date: string;
  author: Author;
  issuenumber: string;
  reactions: Reactions;
  reading_time: string;
  html_url: string;
};

const PostHeader = ({
  title,
  date,
  author,
  issuenumber,
  reactions,
  reading_time,
  html_url,
}: Props) => {
  return (
    <div className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900">
      <Container compact>
        <div className="flex flex-col py-[48px] gap-[24px]">
        <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                <DateFormatter dateString={date} /> · {reading_time} min
                {reading_time === "1" ? "" : "s"} read
              </Badge>
          <PostTitle>{title}</PostTitle>
          <div className="flex flex-col md:flex-row gap-[16px] md:items-center">
            <Avatar
              name={author.name}
              picture={author.picture}
              html_url={author.html_url}
            />

            <div className="text-l text-gray-400 ">
              Originally published as a{" "}
              <Link className="text-blue-400 underline" href={html_url}>
                GitHub Issue
              </Link>{" "}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostHeader;