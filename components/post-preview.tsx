import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import Tag from "./tag";
import Card from "./card";
import type Author from "../interfaces/author";
import markdownStyles from "./markdown-styles.module.css";

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
}: Props) => {
  return (
    <Card interactive>
      <Link
        as={`/${author.name}/stories/${slug.number}`}
        href={`/${author.name}/stories/[slug]`}
      >
        <div className="w-full rounded-xl flex flex-col gap-[16px] h-full justify-between p-5">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <Tag>
                <DateFormatter dateString={date} /> · {reading_time} minute
                {reading_time === "1" ? "" : "s"} read
              </Tag>
              <Avatar
                name={author.name}
                picture={author.picture}
                html_url={author.html_url}
              />
            </div>
            <div className="flex flex-col gap-[8px] w-full">
              <h3 className="text-1xl xl:text-2xl leading-snug font-bold">
                {title}
              </h3>
              <div
                className={markdownStyles["markdown"] + "line-clamp-2"}
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </div>
          </div>
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
        </div>
      </Link>
    </Card>
  );
};

export default PostPreview;
