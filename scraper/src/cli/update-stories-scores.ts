import { updateStoriesScore } from '../scraper'

const main = async () => {
  try {
    await updateStoriesScore({})
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
