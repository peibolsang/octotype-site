type GitHubIssue = {
    user: {
      login: string;
      avatar_url: string;
      html_url: string
    };
    owner: {
      login: string;
    }
    reactions: {
      '+1': string;
      '-1': string;
      laugh: string;
      hooray: string;
      confused: string;
      heart: string;
      rocket: string;
      eyes: string;
      total_count:string;
    };
    body: string;
    number: string;
    url: string;
    title: string;
    created_at: string;
    html_url: string;
    comments: string;
    name:string;
    id:string;
    labels: Array<{
      id: number
      node_id: string;
      url: string;
      name: string;
      color: string;
      default: boolean;
      description: string;
    }>
  };

  export default GitHubIssue;