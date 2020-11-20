import firebase from 'firebase/app'
import 'firebase/database'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import { GetTwitterUser_twitter_users } from 'sidep-common/types/GetTwitterUser'
import { GetGithubUser_github_users } from 'sidep-common/types/GetGithubUser'
import { InsertWebsiteVariables } from 'sidep-common/types/InsertWebsite'
import { InsertStoryVariables } from 'sidep-common/types/InsertStory'
import { GetHnUser_hn_users } from 'sidep-common/types/GetHnUser'
import { decodeEntities, URL_REGEXP } from './helpers'

export type HnUser = Omit<GetHnUser_hn_users, '__typename'>
export type GithubUser = Omit<GetGithubUser_github_users, '__typename'>
export type TwitterUser = Omit<GetTwitterUser_twitter_users, '__typename'>
export type Website = InsertWebsiteVariables
export type HnStory = InsertStoryVariables

firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
})

const getSnapshotValue = async <T>(path: string) => {
  const snapshot = await firebase.database().ref(path).once('value')
  return snapshot.val() as T
}

export const getHnUserInfo = async (username: string): Promise<HnUser> => {
  const hnUserInfo = await getSnapshotValue<{
    id: string
    karma: number
    created: number
    submitted: number[]
    about: string
  }>(`v0/user/${username}`)
  if (!hnUserInfo) {
    throw new Error(`Error fetching info for HN user ${username}`)
  }
  return { username: hnUserInfo.id, karma: hnUserInfo.karma }
}

export const getHnStoryIds = async () => [
  // FIXME eliminate duplicates
  ...(await getSnapshotValue<number[]>('v0/newstories')),
  ...(await getSnapshotValue<number[]>('v0/showstories')),
]

export const getMaxHnItemId = async () => getSnapshotValue<number>('v0/maxitem')

const cleanText = (s: string | undefined) => s?.trim().replace(/\s+/g, ' ')

export const getGithubUserInfo = async (
  username: string
): Promise<GithubUser> => {
  const userInfo = await (
    await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.GITHUB_USERNAME}:${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
        ).toString('base64')}`,
      },
    })
  ).json()
  if (!userInfo) {
    throw new Error(`Error getting the Github info for user ${username}`)
  }

  let twitterUsername = userInfo.twitter_username

  if (!twitterUsername && userInfo?.blog?.match(/twitter.com/i)) {
    const [, username] =
      userInfo?.blog.match(/twitter.com\/([a-z0-9_]+)/i) || []
    if (username) {
      twitterUsername = username
    }
  }

  return {
    username: username,
    name: userInfo.name,
    website: userInfo.blog,
    nb_followers: userInfo.followers,
    twitter_username: twitterUsername,
    location: userInfo.location,
    email: userInfo.email,
    profile_image_url: userInfo.avatar_url,
  }
}

export const getTwitterUserInfo = async (
  username: string
): Promise<TwitterUser> => {
  const res = await (
    await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=url,public_metrics,description,location,profile_image_url,entities`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}`,
        },
      }
    )
  ).json()
  if (!res.data) {
    throw new Error(`Error getting Twitter info for user ${username}`)
  }
  const userInfo = res.data

  return {
    username,
    name: userInfo.name,
    website: userInfo.entities?.url?.urls?.[0]?.expanded_url || userInfo.url,
    nb_followers: userInfo.public_metrics?.followers_count || 0,
    location: userInfo.location,
    profile_image_url: userInfo.profile_image_url,
  }
}

export const getWebsiteInfo = async (url: string): Promise<Website> => {
  const res = await fetch(url)
  const $ = cheerio.load(await res.text())

  const title = cleanText($('title').text()) || null
  const description =
    cleanText($('meta[name="description"]').attr('content')) || null

  let twitterUsername =
    cleanText($('meta[name="twitter:creator"]').attr('content'))
      ?.replace(/^@/, '')
      .replace(/^https?:\/\/(.*)?twitter.com\//, '') || null

  const urlObj = new URL(url)
  let githubUsername =
    urlObj.hostname === 'github.com'
      ? urlObj.pathname.replace(/^\//, '').replace(/\/.*/, '')
      : null

  if (!twitterUsername) {
    const twitterUrl = $('a[href*="twitter.com"]').attr('href')
    if (twitterUrl) {
      const [, username] = twitterUrl.match(/twitter.com\/([a-z0-9_]+)/i) || []
      if (username) twitterUsername = username
    }
  }

  if (!githubUsername) {
    const githubUrl = $('a[href*="github.com"]').attr('href')
    if (githubUrl) {
      const [, username] = githubUrl.match(/github.com\/([a-z0-9_.]+)/i) || []
      if (username) githubUsername = username
    }
  }

  return {
    url,
    title,
    description,
    twitter_username: twitterUsername,
    github_username: githubUsername,
  }
}

export const getStoryInfo = async (
  storyId: number
): Promise<(InsertStoryVariables & { website_url?: string }) | undefined> => {
  const storyInfo = await getSnapshotValue<{
    by: string
    descendants: number
    id: number
    kids: number[]
    score: number
    time: number
    title: string
    type: 'story'
    url?: string
    text?: string
  }>(`v0/item/${storyId}`)
  if (storyInfo?.type !== 'story' || !storyInfo?.title?.match(/^Show HN:/i))
    return undefined

  let url = storyInfo.url
  if (!url && storyInfo.text) {
    const [foundUrl] = decodeEntities(storyInfo.text).match(URL_REGEXP) || []
    if (foundUrl) url = foundUrl
  }

  return {
    id: storyInfo.id,
    date: new Date(storyInfo.time * 1000),
    title: storyInfo.title,
    score: storyInfo.score,
    hn_username: storyInfo.by,
    website_url: url,
  }
}

export const getNewestStoryIds = async () => {
  let url: string | undefined = 'https://news.ycombinator.com/shownew'
  const storyIds: number[] = []
  while (url) {
    const res = await fetch(url)
    const html: string = await res.text()
    const $ = cheerio.load(html)
    storyIds.push(
      ...$('.itemlist > tbody > tr[id]')
        .toArray()
        .map((el) => Number($(el).attr('id')))
    )
    const href = $('.morelink').attr('href')
    url = href && `https://news.ycombinator.com/${href}`
  }
  return storyIds
}
