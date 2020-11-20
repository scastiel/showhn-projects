import { runRescrap } from '../scraper'

const main = async () => {
  try {
    await runRescrap({ dryRun: false })
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
