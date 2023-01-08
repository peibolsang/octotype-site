import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import MainIntro from '../components/main-intro'
import Tabs from '../components/tabs'
import Carousel from '../components/carousel'
import { getAllPosts, getAllUsers, getPost } from '../lib/api'
import PostType from '../interfaces/post'
import PostPreview from '../components/post-preview'

type Props = {
  featuredPosts: Array<PostType>,
  lastPosts: Array<PostType>,
}

export default function Index({featuredPosts,lastPosts}: Props) {
  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <Layout>
        <Head>
          <title>octotype - The content discovery platform for developers</title>
        </Head>
        <Container>
          <MainIntro />
          <div className="text-xl md:text-2xl text-gray-400 text-center md:pl-40 md:pr-40">
          Octotype is a blog platform that allows developers to easily create and publish stories using GitHub Issues as a CMS. It streamlines the process of publishing, allowing authors to go from idea to publication in just three steps.
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 md:gap-x-16 xl:gap-x-32 gap-y-10 mb-5 mt-4 p-6">
            <div className="rounded-3xl p-1 transition-all w-full bg-gradient-to-r from-[#D8B4FE] to-[#818CF8]">
              <div className="md:p-2 text-center md:text-3xl font-bold text-white">
                Step 1
              </div>
              <div className="bg-white dark:bg-slate-800 dark:text-white rounded-b-3xl text-center md:pt-15 md:pb-15 md:pl-10 md:pr-10 p-10 md:text-2xl font-bold text-gray-600">
                Create a GitHub repo <mark className="dark:bg-gray-400 dark:text-gray-600 bg-gray-200 pl-1 pr-1 text-gray-400 font-normal">:user/octotype</mark>
              </div>
            </div>
            <div className="rounded-3xl p-1 transition-all w-full bg-gradient-to-r from-[#818CF8] to-[#818CF8]">
              <div className="md:p-2 text-center md:text-3xl font-bold text-white">
                Step 2
              </div>
              <div className="bg-white dark:bg-slate-800 dark:text-white rounded-b-3xl text-center md:pt-15 md:pb-15 md:pl-10 md:pr-10 p-10 md:text-2xl font-bold text-gray-600">
                Create an issue and apply the <mark className="dark:bg-gray-400 dark:text-gray-600 bg-gray-200 pl-1 pr-1 text-gray-400 font-normal">published</mark> label
              </div>
            </div>
            <div className="rounded-3xl dark:bg-slate-800 dark:text-white p-1 transition-all w-full bg-gradient-to-r from-[#818CF8] to-[#D8B4FE]">
              <div className="md:p-2 text-center md:text-3xl font-bold text-white">
                Step 3
              </div>
              <div className="bg-white dark:bg-slate-800 dark:text-white rounded-b-3xl text-center md:pt-15 md:pb-15 md:pl-10 md:pr-10 p-10 md:text-2xl font-bold text-gray-600">
                Share your story from <mark className="dark:bg-gray-400 dark:text-gray-600 bg-gray-200 pl-1 pr-1 text-gray-400 font-normal">octotype.vercel.app/:user</mark>
              </div>
            </div>
          </div>
          <label className="text-3xl font-bold flex justify-center items-center">Tell your story.</label>
          <div className="flex justify-center items-center mt-6 mb-6">
            <button className="dark:bg-white dark:text-black bg-black hover:bg-[#818CF8] text-white font-bold py-2 px-4 rounded-full w-40"
              onClick={()=> window.location.href="https://repo.new"}
            >
              Start
            </button>
          </div>
          <div className="mt-10 pt-10">
            <label className="text-3xl font-bold flex justify-center items-center">Catch up with good ideas from the development community</label>
          </div>
          <div className="mt-10 mb-6 p-4">
            <Tabs>
              <div className="pt-6"title="Featured Stories">
                <Carousel>
                  {featuredPosts.map((post) => (
                    <div className="w-full md:ml-12 md:mr-12">
                      <div className="grid grid-cols-1 md:grid-cols-1 rounded-xl md:gap-x-16 lg:gap-x-32 gap-y-20 p-1 transition-all w-full border-2 border-black dark:border-white">
                        <div className="w-full p-5 rounded-xl">
                          <PostPreview
                            key={post.slug.number}
                            title={post.title}
                            date={post.date}
                            author={post.author}
                            slug={post.slug}
                            excerpt={""}
                            comments_count={post.comments_count}
                            reactions_count={post.reactions_count}
                          />
                      </div>
                    </div>
                  </div>
                  ))}
                </Carousel>
              </div>
              <div className="pt-6" title="Latest Stories">
                <Carousel>
                  {lastPosts.map((post) => (
                    <div className="w-full md:ml-12 md:mr-12">
                      <div className="grid grid-cols-1 md:grid-cols-1 rounded-xl md:gap-x-16 lg:gap-x-32 gap-y-20 p-1 transition-all w-full border-2 border-black dark:border-white">
                        <div className="w-full p-5 rounded-xl">
                          <PostPreview
                            key={post.slug.number}
                            title={post.title}
                            date={post.date}
                            author={post.author}
                            slug={post.slug}
                            excerpt={""}
                            comments_count={post.comments_count}
                            reactions_count={post.reactions_count}
                          />
                      </div>
                    </div>
                  </div>
                  ))}
                </Carousel>
              </div>
            </Tabs>
          </div> 
        </Container>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  
  const featured1 = await getPost("peibolsang", "1")
  const featured2 = await getPost("peibolsang", "2")

  const users = await getAllUsers()

  const allPosts = await Promise.all(
    users.map(async user => {
      const posts = await getAllPosts(user);
      return posts;
    })
  )
  
  const lastPosts = allPosts
    .reduce((acc,cur)=>acc.concat(cur,[]))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })

  return {
    props: {
      featuredPosts: [featured1,featured2],
      lastPosts: lastPosts,
    },
    revalidate: 60,
  }
}
  
