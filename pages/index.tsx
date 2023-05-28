import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";
import MainIntro from "../components/main-intro";
import Carousel from "../components/carousel";
import { getAllPosts, getAllUsers, getPost } from "../lib/api";
import PostType from "../interfaces/post";
import PostPreview from "../components/post-preview";
import { HOME_OG_IMAGE_URL } from "../lib/constants";
import { useState } from "react";
import Section from "../components/section";
import Card from "../components/card";
import Code from "../components/code";
import React from "react";

type Props = {
  featuredPosts: Array<PostType>;
  lastPosts: Array<PostType>;
};

const steps = new Map([
  [
    "Step 1",
    {
      title: "Step 1",
      content: (
        <React.Fragment>
          Create a GitHub repo <Code>[user]/octotype</Code>
        </React.Fragment>
      ),
    },
  ],
  [
    "Step 2",
    {
      title: "Step 2",
      content: (
        <React.Fragment>
          Create an issue and apply the <Code>published</Code> label
        </React.Fragment>
      ),
    },
  ],
  [
    "Step 3",
    {
      title: "Step 3",
      content: (
        <React.Fragment>
          Share your story from <Code>octotype.app/[user]</Code>
        </React.Fragment>
      ),
    },
  ],
]);

export default function Index({ featuredPosts, lastPosts }: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <Layout>
        <Head>
          <title>
            octotype - The content discovery platform for developers
          </title>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={HOME_OG_IMAGE_URL} />
          <meta
            name="twitter:title"
            content="octotype - The content discovery platform for developers"
          />
        </Head>
        <MainIntro />

        <Container>
          <Section
            title="Latest stories"
            description="Catch up with good ideas from the development community"
          >
            <Carousel activeIndex={activeTabIndex}>
              {lastPosts.map((post) => (
                <PostPreview
                  key={post.slug.number}
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={""}
                  comments_count={post.comments_count}
                  reactions_count={post.reactions_count}
                  reading_time={post.reading_time}
                />
              ))}
            </Carousel>
          </Section>
        </Container>
        <Container>
          <Section
            title="How it works?"
            description="Octotype streamlines the process of publishing, allowing authors to go
                from idea to publication in just three steps."
          >
            <div className="flex flex-col lg:flex-row gap-[16px]">
              {Array.from(steps, ([key, value]) => (
                <Card>
                  <div
                    key={key}
                    className="flex flex-row lg:flex-col gap-[16px] p-[24px] h-full items-center lg:items-start"
                  >
                    <div className="md:text-1xl lg:text-[1.25rem] font-bold text-gray-800 dark:text-white min-w-max">
                      {value.title}
                    </div>
                    <div className="dark:text-white md:text-1xl font-medium text-slate-600 leading-7">
                      {value.content}{" "}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        </Container>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const featured1 = await getPost("peibolsang", "1");
  const featured2 = await getPost("peibolsang", "2");

  const users = await getAllUsers();

  const allPosts = await Promise.all(
    users.map(async (user) => {
      const posts = await getAllPosts(user);
      return posts;
    })
  );

  const lastPosts = allPosts
    .reduce((acc, cur) => acc.concat(cur), [])
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const serializeReactions = (reactions) => {
    const reactionKeys = [
      "plusone",
      "minusone",
      "laugh",
      "hooray",
      "confused",
      "heart",
      "rocket",
      "eyes",
    ];

    return reactionKeys.reduce((serializedReactions, key) => {
      serializedReactions[key] = reactions ? reactions[key] || null : null;
      return serializedReactions;
    }, {});
  };

  const serializeFeaturedPost = (post) => {
    const serializedPost = {
      title: post.title || null,
      date: post.date || null,
      slug: post.slug ? { number: post.slug.number || null } : null,
      author: post.author ? { name: post.author.name || null } : null,
      content: post.content || null,
      comments_count: post.comments_count || null,
      reactions_count: post.reactions_count || null,
      reactions: serializeReactions(post.reactions),
      html_url: post.html_url || null,
    };

    return serializedPost;
  };

  const serializedFeaturedPosts = [
    serializeFeaturedPost(featured1),
    serializeFeaturedPost(featured2),
  ];

  return {
    props: {
      featuredPosts: serializedFeaturedPosts,
      lastPosts: lastPosts,
    },
    revalidate: 120,
  };
}
