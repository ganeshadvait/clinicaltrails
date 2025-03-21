type BlogPost = {
    title: string
    description: string
    link: string
    thumbnail: string
    uid: string
  }
  
export const BLOG_POSTS: BlogPost[] = [
    {
      title: 'Decentralized Clinical Trials: A Paradigm Shift in Global Clinical Research',
      description: 'Overview of how DCTs are disrupting traditional clinical research methods globally.',
      link: '/blog/Decentralized Clinical Trials: A Paradigm Shift in Global Clinical Research',
      thumbnail: '/Container.png',
      uid: 'blog-1',
    },
    {
      title: 'How Decentralized Clinical Trials Improve Diversity in Clinical Research',
      description:
        'Introduction: The importance of diversity in clinical trials.',
      link: '/blog/How Decentralized Clinical Trials Improve Diversity in Clinical Research',
      thumbnail: '/Container.png',
      uid: 'blog-2',
    },
    {
      title: 'The Role of Wearables and Remote Monitoring in Decentralized Clinical Trials',
      description:
        'Challenges: Device compliance, data integration, and privacy.',
      link: '/blog/The Role of Wearables and Remote Monitoring in Decentralized Clinical Trials',
      thumbnail: '/Container.png',
      uid: 'blog-3',
    },
  ]