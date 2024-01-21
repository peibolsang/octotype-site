import type PostType from '@/interfaces/post'
import type EventType from '@/interfaces/event';
import type Author from '@/interfaces/author';
import type Reactions from '@/interfaces/reactions'
import type CommentType from '@/interfaces/comment';
import { CONFIG_FILE, MAX_WORDS, RAW_URL } from './constants'
import { REPO_NAME } from './constants'
import { LABEL } from '@/lib/constants'
import type GitHubIssue from '@/interfaces/githubissue';
import {HOME_OG_IMAGE_URL} from '@/lib/constants'
import LabelType from '@/interfaces/label';


/* 
This function is used all over the place. The strict rate limits of the GitHub API
makes it hard to develeop and test locally, so we use the personal GitHub Token from the local env.
This gives us better API rate limits, but it's not necessary on the server (by now) 
*/

export async function fetchGitHubAPI(url: string) {
  const headers: Record<string, string> = {};

  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
  }
  
  const params = {
    method: 'GET',
    headers: headers
  };

  const response = await fetch(url, params);
  return response;
}



function calculateReadingTime(text:string):string {
  // Average reading speed is around 200-300 words per minute
  const readingSpeed = 250;

  // Calculate the number of words in the text
  const wordCount = (typeof text === 'string') ? text.split(/\s+/).length : 0;


  // Calculate the number of minutes it would take to read the text
  const readingTime = Math.round(wordCount / readingSpeed);

  return readingTime === 0 ? "1" : readingTime.toString()

}


/*
 *
 POST FUNCTIONS
 * 
 */

export async function generateTldr(text:string){
  return createExcerpt(text)
}

export async function getPostFromGitHubIssue(item: GitHubIssue) {

  const issueauthor: Author = {
    name: item.user && item.user.login, // Check if item.user exists before accessing its 'login' property
    picture: item.user && item.user.avatar_url,
    html_url: item.user && "/" + item.user.login
  }

  
  
  const issueLabels: LabelType[] = item.labels? item.labels
    .map(label => ({
      color: label.color,
      name: label.name
    }))
  :
  []

  const issuereactions: Reactions = {
    plusone: item.reactions && item.reactions['+1'],
    minusone: item.reactions && item.reactions['-1'],
    laugh: item.reactions && item.reactions.laugh,
    hooray: item.reactions && item.reactions.hooray,
    confused: item.reactions && item.reactions.confused,
    heart: item.reactions && item.reactions.heart,
    rocket: item.reactions && item.reactions.rocket,
    eyes: item.reactions && item.reactions.eyes
  }

  const excerpt = await generateTldr(item.body)

  const post: PostType = {
    slug: {
      number: item.number,
      url: item.url
    },
    title: item.title, 
    date: item.created_at,
    author: issueauthor,
    excerpt: excerpt,
    ogImage: {
      url: HOME_OG_IMAGE_URL
    },
    content: item.body,
    comments_count: item.comments && item.comments,
    reactions_count: item.reactions && item.reactions.total_count,
    reactions: issuereactions,
    comments: [],
    reading_time: calculateReadingTime(item.body),
    html_url: item.html_url,
    labels: issueLabels,
    events_url: item.events_url,
    pinned: false
  }
  return post;
}

function createExcerpt(text: string) {
  if (typeof text !== 'string') {
    return '';
  }
  // Split the text into an array of words
  const words = text.split(' ');

  // If the text is 15 words or fewer, return it as-is
  if (words.length <= MAX_WORDS) {
    return text;
  }

  // Otherwise, create an excerpt of the first 15 words
  const excerpt = words.slice(0, MAX_WORDS).join(' ') + '...';
  return excerpt;
}

export async function getPost(username: string,number: string){
  try{
    // Make the API request
    const response = await fetchGitHubAPI(`https://api.github.com/repos/${username}/${REPO_NAME}/issues/${number}`);
    const data = await response.json();

    // We transform the GitHub Issue into a Blog post and we only return "published" posts
    const post = await getPostFromGitHubIssue(data);
    return post.labels.find(label=>label.name===LABEL)? post : null
  }
  catch (error){
    console.log(error)
    throw error
  }
}


export async function getAllPosts(username: string) {
  try {
    // Make the API request
    const response = await fetchGitHubAPI(`https://api.github.com/repos/${username}/${REPO_NAME}/issues?labels=${LABEL}`);
    const data = await response.json();

    // Check if data is an array before using array methods
    if (!Array.isArray(data)) {
      return []; // Return an empty array or handle the error as needed
    }

    // We only return posts created by the allowed user
    // Transforming GitHub Issues into Blog posts
    const posts = Promise.all(
      data
        .filter(item => item.user.login === username)
        .map(async item => await getPostFromGitHubIssue(item))
    );
    return posts;
  } catch (error) {
    console.log(error);
    throw error
  }
}

/*
 *
 COMMENT FUNCTIONS 
 * 
 */

export async function getCommentFromGitHubIssue(item: GitHubIssue) {

  const commentauthor: Author = {
    name: item.user.login,
    picture: item.user.avatar_url,
    html_url: item.user.html_url
  }

  const commentreactions: Reactions = {
    plusone: item.reactions['+1'],
    minusone: item.reactions['-1'],
    laugh: item.reactions.laugh,
    hooray: item.reactions.hooray,
    confused: item.reactions.confused,
    heart: item.reactions.heart,
    rocket: item.reactions.rocket,
    eyes: item.reactions.eyes
  }

  const comment: CommentType = {
    slug: {
      number: item.id,
      url: item.url
    },
    date: item.created_at,
    author: commentauthor,
    ogImage: {
      url: HOME_OG_IMAGE_URL
    },
    content: item.body,
    reactions_count: item.reactions.total_count,
    reactions: commentreactions,
  }
  return comment;
}

export async function getPostComments(username: string, number: string) {
    // Make the API request
    const response = await fetchGitHubAPI(`https://api.github.com/repos/${username}/${REPO_NAME}/issues/${number}/comments`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      return []
    }

    // We map Issue comments into Blog comments
    const comments = Promise.all(
      data.map(async (item) => await getCommentFromGitHubIssue(item))
    );
    return comments;
}

const getEvents = async (eventsUrl: string) => {
      const response = await fetchGitHubAPI(eventsUrl);
      if (!response.ok) {
          return []
      }
      return await response.json();
};

const isIssuePinned = (events: string[]): boolean => {
  const latestEvent = [...events].reverse().find(event => 
      event === 'pinned' || event === 'unpinned'
  );
  return latestEvent === 'pinned';
};


export const getPinnedPosts = async (posts:PostType[]) => {

  const pinnedPosts = (await Promise.all(
    posts.map(async (post: PostType) => {
      const postEvents = await getEvents(post.events_url);
      return isIssuePinned(postEvents.map((e: EventType)=>e.event))? post.slug.number : null
    })
  ))

  return pinnedPosts.filter(value => value!=null)
};

/*
* USER FUNCTIONS 
*
*/

export async function getAllUsers() {
    // Make the API request
    const response = await fetchGitHubAPI(`https://api.github.com/search/repositories?q=${REPO_NAME}`);
    const data = await response.json();

    if (!data || !data.items ) {
      return []
    }
    // We map Issue comments into Blog comments
    const users = Promise.all(
      data.items
        .filter((item: GitHubIssue) => item.name === REPO_NAME)
        .map((item: GitHubIssue) => item.owner.login)
    );
    return users;
}

export async function hasRepo(username:string) {
    // Make the API request
    const response = await fetchGitHubAPI(`https://api.github.com/repos/${username}/${REPO_NAME}`);
    const data = await response.json();

    if (!data.name ) {
      return false;
    }

    return true;  
}

export async function getUserConfig(username:string){
  // Make the API request. We need to append a random number to invalidate Github's raw cache in every call
  const randomNumber = Math.floor(Math.random() * 10000).toString()
  const params = {
    method: 'GET'
  };
  const response = await fetch(`${RAW_URL}/${username}/${REPO_NAME}/${CONFIG_FILE}?${randomNumber}`,params);

  if (!response.ok) return null
  return await response.json();
}