import { runPast } from '../scraper'

const main = async () => {
  try {
    await runPast({ dryRun: false, force: false })
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
