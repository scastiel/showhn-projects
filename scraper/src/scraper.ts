import * as graph from './graph'
import * as api from './api'

interface Info<T> {
  source: 'db' | 'api'
  existsInDb: boolean
  value: T
}

interface Options {
  dryRun: boolean
  force: boolean
}

const getHnUserInfo = async (
  username: string,
  options: Options
): Promise<Info<api.HnUser>> => {
  const hnUser = await graph.getHnUser(username)
  const existsInDb = Boolean(hnUser)
  if (hnUser && !options.force) {
    return { source: 'db', existsInDb, value: hnUser }
  }
  return {
    source: 'api',
    existsInDb,
    value: await api.getHnUserInfo(username),
  }
}

const getGithubUserInfo = async (
  username: string,
  options: Options
): Promise<Info<api.GithubUser>> => {
  const githubUser = await graph.getGithubUser(username)
  const existsInDb = Boolean(githubUser)
  if (!options.force && githubUser) {
    return { source: 'db', existsInDb, value: githubUser }
  }
  return {
    source: 'api',
    existsInDb,
    value: await api.getGithubUserInfo(username),
  }
}

const getTwitterUserInfo = async (
  username: string,
  options: Options
): Promise<Info<api.TwitterUser>> => {
  const twitterUser = await graph.getTwitterUser(username)
  const existsInDb = Boolean(twitterUser)
  if (!options.force && twitterUser) {
    return { source: 'db', existsInDb, value: twitterUser }
  }
  return {
    source: 'api',
    existsInDb,
    value: await api.getTwitterUserInfo(username),
  }
}

const getWebsiteInfo = async (
  url: string,
  options: Options
): Promise<Info<api.Website>> => {
  const website = await graph.getWebsite(url)
  const existsInDb = Boolean(website)
  if (!options.force && website) {
    return { source: 'db', existsInDb, value: website }
  }
  return {
    source: 'api',
    existsInDb,
    value: await api.getWebsiteInfo(url),
  }
}

export const getStoryInfo = async (
  storyId: number,
  options: Options
): Promise<{
  story:
    | { source: 'db' | 'no_show_hn'; existsInDb: boolean; value: undefined }
    | { source: 'api'; existsInDb: boolean; value: api.HnStory }
  hnUser?: Info<api.HnUser>
  website?: Info<api.Website>
  twitterUser?: Info<api.TwitterUser>
  githubUser?: Info<api.GithubUser>
}> => {
  const existsInDb = await graph.doesStoryExist(storyId)
  if (!options.force && existsInDb) {
    return { story: { source: 'db', existsInDb, value: undefined } }
  }

  const storyInfo = await api.getStoryInfo(storyId)
  if (!storyInfo) {
    return { story: { source: 'no_show_hn', existsInDb, value: undefined } }
  }

  const hnUser = storyInfo.hn_username
    ? await getHnUserInfo(storyInfo.hn_username, {
        ...options,
        force: false,
      })
    : undefined

  let website, twitterUser, githubUser
  if (storyInfo.website_url) {
    try {
      website = await getWebsiteInfo(storyInfo.website_url, options)
    } catch (err) {
      console.error(err)
      storyInfo.website_url = undefined
    }
    if (website?.value.twitter_username) {
      try {
        twitterUser = await getTwitterUserInfo(
          website.value.twitter_username,
          options
        )
      } catch (err) {
        console.error(err)
        website.value.twitter_username = null
      }
    }
    if (website?.value.github_username) {
      try {
        githubUser = await getGithubUserInfo(
          website.value.github_username,
          options
        )
      } catch (err) {
        console.error(err)
        website.value.github_username = null
      }
      if (!twitterUser && githubUser?.value.twitter_username) {
        website.value.twitter_username = githubUser.value.twitter_username
        try {
          twitterUser = await getTwitterUserInfo(
            githubUser.value.twitter_username,
            options
          )
          website.value.twitter_username = githubUser.value.twitter_username
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  return {
    story: { source: 'api', existsInDb, value: storyInfo },
    hnUser,
    website,
    twitterUser,
    githubUser,
  }
}

const saveHnUser = async (
  hnUser: Info<api.HnUser> | undefined,
  options: Options
) => {
  if (!options.dryRun && hnUser) {
    if (hnUser.existsInDb) {
      if (options.force) {
        console.log(`Updating HN user ${hnUser.value.username}`)
        const affectedRows = await graph.updateHnUser(hnUser.value)
        if (!affectedRows) throw new Error('No updated HN user')
      }
    } else {
      console.log(`Inserting HN user ${hnUser.value.username}`)
      const insertedUser = await graph.insertHnUser(hnUser.value)
      if (!insertedUser) throw new Error('No inserted HN user.')
    }
  }
}

const saveTwitterUser = async (
  twitterUser: Info<api.TwitterUser> | undefined,
  options: Options
) => {
  if (!options.dryRun && twitterUser) {
    if (twitterUser.existsInDb) {
      if (options.force) {
        console.log(`Updating Twitter user ${twitterUser.value.username}`)
        const affectedRows = await graph.updateTwitterUser(twitterUser.value)
        if (!affectedRows) throw new Error('No updated Twitter user')
      }
    } else {
      console.log(`Inserting Twitter user ${twitterUser.value.username}`)
      const insertedTwitterUser = await graph.insertTwitterUser(
        twitterUser.value
      )
      if (!insertedTwitterUser) throw new Error('No inserted Twitter user.')
    }
  }
}

const saveGithubUser = async (
  githubUser: Info<api.GithubUser> | undefined,
  options: Options
) => {
  if (!options.dryRun && githubUser) {
    if (githubUser.existsInDb) {
      if (options.force) {
        console.log(`Updating GitHub user ${githubUser.value.username}`)
        const affectedRows = await graph.updateGithubUser(githubUser.value)
        if (!affectedRows) throw new Error('No updated GitHub user')
      }
    } else {
      console.log(`Inserting GitHub user ${githubUser.value.username}`)
      const insertedGithubUser = await graph.insertGithubUser(githubUser.value)
      if (!insertedGithubUser) throw new Error('No inserted GitHub user.')
    }
  }
}

const saveWebsite = async (
  website: Info<api.Website> | undefined,
  options: Options
) => {
  if (!options.dryRun && website) {
    if (website.existsInDb) {
      if (options.force) {
        console.log(`Updating website ${website.value.url}`)
        const affectedRows = await graph.updateWebsite(website.value)
        if (!affectedRows) throw new Error('No updated website')
      }
    } else {
      console.log(`Inserting website ${website.value.url}`)
      const insertedwebsite = await graph.insertWebsite(website.value)
      if (!insertedwebsite) throw new Error('No inserted website.')
    }
  }
}

const saveHnStory = async (
  story:
    | {
        source: 'db' | 'no_show_hn'
        existsInDb: boolean
        value: undefined
      }
    | {
        source: 'api'
        existsInDb: boolean
        value: api.HnStory
      },
  options: Options
) => {
  if (!options.dryRun && story.value) {
    if (story.existsInDb) {
      if (options.force) {
        console.log(`Updating story ${story.value.id}`)
        const affectedRows = await graph.updateStory(story.value)
        if (!affectedRows) throw new Error('No updated story')
      }
    } else {
      console.log(`Inserting story ${story.value.id}`)
      const insertedStory = await graph.insertStory(story.value)
      if (!insertedStory) throw new Error('No inserted story')
    }
  }
}

const scrapStory = async (storyId: number, options: Options) => {
  try {
    const {
      story,
      hnUser,
      website,
      twitterUser,
      githubUser,
    } = await getStoryInfo(storyId, options)

    if (story.source === 'no_show_hn') {
      return
    }

    if (!options.force && story.source === 'db') {
      console.log(`HN story ${storyId}... exists`)
      return
    }

    console.log(`HN story ${storyId} (${story.value?.date})...`)

    try {
      await saveTwitterUser(twitterUser, options)
    } catch (err) {
      if (website) website.value.twitter_username = null
    }

    try {
      await saveGithubUser(githubUser, options)
    } catch (err) {
      if (website) website.value.github_username = null
    }

    try {
      await saveWebsite(website, options)
    } catch (err) {
      if (story.value) story.value.website_url = null
    }

    try {
      await saveHnUser(hnUser, options)
    } catch (err) {
      if (story.value) story.value.hn_username = null
    }

    await saveHnStory(story, options)
  } catch (err) {
    console.error(`Error scraping HN story ${storyId}`, err)
  }
}

export const updateStoriesScore = async ({ dryRun = false }) => {
  const storyIds = await graph.getLatestStoryIds()
  for (const { id: storyId, score: currentScore } of storyIds) {
    const storyInfo = await api.getStoryInfo(storyId)
    if (storyInfo?.score && storyInfo.score !== currentScore) {
      console.log(
        `Updating score for ${storyId}: ${currentScore} → ${storyInfo.score}`
      )
      if (!dryRun) {
        await graph.updateStoryScore(storyId, storyInfo.score)
      }
    }
  }
}

const run = async (
  scrapStories: (
    scrapStory: (storyId: number) => Promise<void>
  ) => Promise<void>,
  options: Options
) => {
  console.log('New scraping...')
  await scrapStories(async (storyId) => await scrapStory(storyId, options))
  console.log('Done!')
}

export const runPast = async (
  { dryRun, force }: Options = { dryRun: false, force: false }
) => {
  await run(
    async (scrapStory) => {
      const maxHnItemId = await api.getMaxHnItemId()
      const firstHnStoryId = (await graph.getFirstStoryId()) || maxHnItemId
      console.log({ firstHnStoryId, maxHnItemId })

      for (let storyId = firstHnStoryId - 1; storyId > 0; storyId--) {
        await scrapStory(storyId)
      }
    },
    { dryRun, force }
  )
}

export const runStories = async (
  storyIds: number[],
  { dryRun, force }: Options = { dryRun: false, force: false }
) => {
  await run(
    async (scrapStory) => {
      for (const storyId of storyIds) {
        await scrapStory(storyId)
      }
    },
    { dryRun, force }
  )
}

export const runNewest = async (
  { dryRun, force }: Options = { dryRun: false, force: false }
) => {
  await run(
    async (scrapStory) => {
      const lastHnStoryId = await graph.getLastStoryId()
      console.log({ lastHnStoryId })
      const storyIds = (await api.getNewestStoryIds())
        .filter((storyId) => force || !lastHnStoryId || storyId > lastHnStoryId)
        .reverse()
      console.log(`${storyIds.length} Show HN stories`)

      for (const storyId of storyIds) {
        await scrapStory(storyId)
      }
    },
    { dryRun, force }
  )
}

export const runRescrap = async ({ dryRun = false }) => {
  await run(
    async (scrapStory) => {
      const storyIds = await graph.getAllStoryIds()
      for (const storyId of storyIds) {
        await scrapStory(storyId)
      }
    },
    { dryRun, force: true }
  )
}
