import Avatar from "@/components/ui/avatar";
import DateFormatter from "@/components/ui/date-formatter";
import Link from "next/link";
import {Badge} from "@/components/ui/badge"
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import type Author from "@/interfaces/author";
import markdownStyles from "@/components/ui//markdown-styles.module.css";
import LabelType from "@/interfaces/label";
import PostLabels from "@/components/client/post-labels";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: {
    number: string;
    url: string;
  };
  comments_count: string;
  reactions_count: string;
  reading_time: string;
  labels:LabelType[]
};

const PostPreview = ({
  title,
  date,
  excerpt,
  author,
  slug,
  comments_count,
  reactions_count,
  reading_time,
  labels,
}: Props) => {
  return (
    <Card className="min-h-[350px] m-4" interactive>
            <CardHeader>
              <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                <DateFormatter dateString={date} /> · {reading_time} min
                {reading_time === "1" ? "" : "s"} read
              </Badge>
              <Avatar
                name={author.name}
                picture={author.picture}
                html_url={author.html_url}
              />
            </CardHeader>
            <CardContent>
            <Link
              as={`/${author.name}/stories/${slug.number}`}
              href={`/${author.name}/stories/[slug]`}
              >
              <h3 className="hover:underline text-xl xl:text-2xl leading-snug font-bold">
                {title}
              </h3>
            </Link>
              <div
                className={`${markdownStyles["markdown"]} hidden md:line-clamp-2 lg:line-clamp-2`}
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
          <PostLabels labels={labels}/>
          <div className="flex items-center mt-4">
            <span className="mr-3">
              <span className="text-l mr-1">&#x1F4AC;</span>
              <span className="text-l mr-1">{comments_count}</span>
            </span>
            <span className="mr-3">
              <span className="text-l mr-1">&#x1F642;</span>
              <span className="text-l mr-1">{reactions_count}</span>
            </span>
          </div>
        </CardContent>
    </Card>
  );
};

export default PostPreview;