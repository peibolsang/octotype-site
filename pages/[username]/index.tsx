import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllPosts, getAllUsers } from "../../lib/api";
import Head from "next/head";
import type PostType from "../../interfaces/post";
import MoreStories from "../../components/more-stories";
import Intro from "../../components/intro";
import PostPreview from "../../components/post-preview";
import MainHeader from "../../components/main-header";
import { HOME_OG_IMAGE_URL } from "../../lib/constants";
import Section from "../../components/section";

type Props = {
  allPosts: Array<PostType>;
  pageType: string;
  username: string;
};

export default function Main({ allPosts, username }: Props) {
  const featuredPost = allPosts?.[0] ?? null;
  const morePosts = allPosts?.slice(1) ?? [];
  const finalusername = username;
  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <Layout>
        <Head>
          <title>{finalusername} on octotype</title>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={HOME_OG_IMAGE_URL} />
          <meta name="twitter:title" content={finalusername} />
        </Head>

        <MainHeader />
        <Intro
          username={finalusername}
          featuredPost={
            <div className="h-full w-full dark:bg-slate-800 bg-white rounded-xl ">
              {featuredPost?.title ? (
                <PostPreview
                  title={featuredPost?.title}
                  date={featuredPost?.date}
                  author={featuredPost?.author}
                  slug={featuredPost?.slug}
                  excerpt={featuredPost?.excerpt}
                  comments_count={featuredPost?.comments_count}
                  reactions_count={featuredPost?.reactions_count}
                  reading_time={featuredPost?.reading_time}
                />
              ) : (
                <div>{featuredPost?.toString()}</div>
              )}
            </div>
          }
        />
        <Container>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </div>
  );
}

type Params = {
  params: {
    username: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const allPosts = await getAllPosts(params.username);

  const props = allPosts
    ? allPosts[0]
      ? allPosts
      : ["No posts found 🫣"]
    : [
        "Nothing to see here 🤓. It seems this user has not created an octotype repo yet! ",
      ];

  return {
    props: { allPosts: props, username: params.username.toString() },
    revalidate: 120,
  };
}

export async function getStaticPaths() {
  const users = await getAllUsers();
  const finalpaths = users
    ? users
        .map((user) => [
          {
            params: {
              username: [user],
            },
          },
        ])
        .reduce((item) => item, [])
    : [
        {
          params: {
            username: ["user"],
          },
        },
      ];

  return {
    paths: finalpaths,
    fallback: "blocking",
  };
}
