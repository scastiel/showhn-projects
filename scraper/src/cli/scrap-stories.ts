import { runStories } from '../scraper'

const main = async () => {
  try {
    const storyIds = process.argv.slice(2).map(Number)
    await runStories(storyIds)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
