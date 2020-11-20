export interface StoryInfo {
  title: string
  date: Date
  score: number
  url: string
}

export interface HnUserInfo {
  username: string
  karma: number
}

export interface WebsiteInfo {
  url: string
  title: string
  description?: string
}

export interface GithubUserInfo {
  username: string
  url: string
  name: string | null
  blog?: string
  nbFollowers: number
  twitterUsername: string | null
}

export interface TwitterUserInfo {
  username: string
  url: string
  name: string
  blog?: string
  nbFollowers: number
}

export interface Story {
  id: number
  storyInfo: StoryInfo
  hnUserInfo: HnUserInfo
  websiteInfo?: WebsiteInfo
  githubInfo?: GithubUserInfo
  twitterInfo?: TwitterUserInfo
}
