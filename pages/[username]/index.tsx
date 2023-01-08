import Container from '../../components/container'
import Layout from '../../components/layout'
import { getAllPosts, getAllUsers } from '../../lib/api'
import Head from 'next/head'
import type PostType from '../../interfaces/post'
import MoreStories from '../../components/more-stories'
import Intro from '../../components/intro'
import PostPreview from '../../components/post-preview'
import MainHeader from '../../components/main-header'

type Props = {
  allPosts: Array<PostType>,
  pageType: string,
  username: string
}

export default function Main({ allPosts, username}: Props) {
  const featuredPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <Layout>
        <Head>
          <title>Pablo Bermejo's Blog</title>
        </Head>
        <Container>
          <MainHeader />
          <Intro username={username}/>
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

    const allPosts = await getAllPosts(params.username)

    const props = allPosts? 
      (allPosts[0]? allPosts : ["No posts found 🫣"]) 
      : 
      (["Ooooops 🥺. Couldn't fetch posts. There was an error calling the GitHub Issues API"])
  
    return  {
      props: { allPosts: props, username: params.username.toString(),},
      revalidate: 60,
    }  
}

export async function getStaticPaths() {

  const users = await getAllUsers()

  const finalpaths = users ? users
    .map(
      async (user) =>{ 
        const posts = await getAllPosts(user)
        const paths = posts ? posts.map((post) => {
          return {
            params: {
              username: [user,"stories",post.slug.number],
            },
          }
        })
        :
        [
          {
            params: {
              username: [user,"stories","0"]
          },
          }
        ]
        return paths
      }
    )
    .reduce(item=>item,[])
  :
  [
    {
      params: {
        username: ["user","stories","0"]
    },
    }
  ]

  return {
    paths: finalpaths,
    fallback: 'blocking',
  }

}