import { getAllPosts, getAllUsers } from "@/lib/api";
import {AllStoriesClient} from "@/components/client/all-stories";

const getAllStories = async () => {
  const users = await getAllUsers();
  const allPosts = (await Promise.all(
      users.map(async (user) => {
        return await getAllPosts(user);
      })
    )).flatMap(posts => posts || []);
  
  const lastPosts = allPosts.flat().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return lastPosts
}

const AllStoriesServer = async () => {

    const lastPosts = await getAllStories()
  
    return <AllStoriesClient lastPosts={lastPosts} />;
  };

  export {AllStoriesServer}