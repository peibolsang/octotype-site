import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllPosts, getAllUsers } from '../../lib/api'
import Head from 'next/head'
import type PostType from '../../interfaces/post'
import MoreStories from '../../components/more-stories'
import Intro from '../../components/intro'
import PostPreview from '../../components/post-preview'
import MainHeader from '../../components/main-header'
import {HOME_OG_IMAGE_URL} from '../../lib/constants'

type Props = {
  allPosts: Array<PostType>,
  pageType: string,
  username: string
}

function removeAtSymbol(str) {
  if (str[0] === "@") {
    return str.slice(1);
  }
  return str;
}

export default function Main({ allPosts, username}: Props) {
  const featuredPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  const finalusername = removeAtSymbol(username)
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
        <Container>
          <MainHeader />
          <Intro username={finalusername}/>
          <h3 className="mb-12 text-4xl md:text-4xl font-bold tracking-tighter leading-tight">
            Featured Story
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 md:gap-x-16 lg:gap-x-32 gap-y-20 mb-12 rounded-xl p-1 transition-all w-full bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]">
            <div className="h-full w-full dark:bg-slate-800 bg-white p-5 rounded-xl ">
              {featuredPost.title ?
                  (<PostPreview
                    title={featuredPost.title}
                    date={featuredPost.date}
                    author={featuredPost.author}
                    slug={featuredPost.slug}
                    excerpt={featuredPost.excerpt}
                    comments_count={featuredPost.comments_count}
                    reactions_count={featuredPost.reactions_count}
                    reading_time={featuredPost.reading_time}
                  />
                  )
                 :
                 (<div>{featuredPost.toString()}</div>)
              }
            </div>
          </div>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </div>
  )
}

type Params = {
  params: {
    username: string
  }
}

export async function getStaticProps({ params }: Params) {

    const allPosts = await getAllPosts(removeAtSymbol(params.username))

    const props = allPosts? 
      (allPosts[0]? allPosts : ["No posts found 🫣"]) 
      : 
      (["Ooooops 🥺. Couldn't fetch posts. There was an error calling the GitHub Issues API"])
  
    return  {
      props: { allPosts: props, username: removeAtSymbol(params.username.toString()),},
      revalidate: 120,
    }  
}

export async function getStaticPaths() {

  const users = await getAllUsers()
  const finalpaths = users ? users
    .map(
      (user) => [{
        params: {
          username: ["@"+user]
        }
      }]
    )
    .reduce(item=>item,[])
  :
  [
    {
      params: {
        username: ["user"]
    },
    }
  ]

  return {
    paths: finalpaths,
    fallback: 'blocking',
  }

}