import { getAllPosts, getAllUsers, getPost } from "@/lib/api";
import {AllStoriesClient} from "@/components/client/all-stories";
import { unstable_noStore } from 'next/cache'

const AllStoriesServer = async () => {

    unstable_noStore()
  
    const users = await getAllUsers();
    const allPosts = (await Promise.all(
      users.map(async (user) => {
        return await getAllPosts(user);
      })
    )).flatMap(posts => posts || []);
  
    const lastPosts = allPosts.flat().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
    return <AllStoriesClient lastPosts={lastPosts} />;
  };

  export {AllStoriesServer}