import { getStoryInfo } from '../scraper'

const main = async () => {
  try {
    const storyId = process.argv[2]
    if (!storyId) {
      console.log('No story ID')
    } else {
      console.log(`Scaping HN story ${storyId}...`)
      const info = await getStoryInfo(Number(storyId), {
        force: true,
        dryRun: true,
      })
      console.log(info)
    }
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
