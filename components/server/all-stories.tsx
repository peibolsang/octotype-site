import { getAllPosts, getAllUsers, getPost } from "@/lib/api";
import {LatestStoriesClient} from "@/components/client/all-stories";

const AllStoriesServer = async () => {
  
    const users = await getAllUsers();
    const allPosts = (await Promise.all(
      users.map(async (user) => {
        return await getAllPosts(user);
      })
    )).flatMap(posts => posts || []);
  
    const lastPosts = allPosts.flat().sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
    return <LatestStoriesClient lastPosts={lastPosts} />;
  };

  export {AllStoriesServer}