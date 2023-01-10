import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../../components/container'
import PostComments from '../../../components/post-comments'
import PostBody from '../../../components/post-body'
import Header from '../../../components/header'
import PostHeader from '../../../components/post-header'
import Layout from '../../../components/layout'
import { getAllPosts, getAllUsers, getPost, getPostComments } from '../../../lib/api'
import PostTitle from '../../../components/post-title'
import Head from 'next/head'
import markdownToHtml from '../../../lib/markdownToHtml'
import type PostType from '../../../interfaces/post'

type Props = {
  post: PostType
  morePosts: PostType[]
}




export default function Post({ post }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug.number) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div className="dark:bg-slate-800 dark:text-white">
    <Layout>
      <Container>
        <Header username={post.author.name} />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            {post.title? 
              (<article className="mb-16">
                <Head>
                  <title>
                    {post.title} - {post.author.name}'s Blog on octotype
                  </title>
                  <meta property="og:image" content={post.ogImage.url} />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:image" content={post.ogImage.url} />
                  <meta name="twitter:title" content={post.title} />
                </Head>
                <PostHeader
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  issuenumber={post.slug.number}
                  reactions={post.reactions}
                  reading_time={post.reading_time}
                  html_url={post.html_url}
                />
                <PostBody content={post.content} />
              </article>)
              :
              (<div>
                  {post.content}
              </div>)
            }
          </>
        )}
      </Container>
        <Container>
          <div className="border-t-2 border-slate-200 pt-5">
           <PostComments comments={post.comments} issuenumber={post.slug.number} username={post.author.name} />
          </div>
        </Container>
    </Layout>
    </div>
  )
}

type Params = {
  params: {
    slug: string
    username: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPost(params.username,params.slug)

  const commentsdata = post ? await getPostComments(params.username, params.slug) : [""]
  const comments = commentsdata ? commentsdata : ["Ooooops 🥺. Couldn't fetch comments. There was an error calling the GitHub Issues API"]
  const content = post ? await markdownToHtml(post.content || '') : "Ooooops 🥺. Couldn't fetch post. There was an error calling the GitHub Issues API"
  const slug = post ? post.slug : { number: "0"}
 
  return {
    props: {
      post: {
        ...post,
        content,
        comments,
        slug
      },
    },
    revalidate: 60
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
        username: ["@user","stories","0"]
    },
    }
  ]

  return {
    paths: finalpaths,
    fallback: 'blocking',
  }

}
