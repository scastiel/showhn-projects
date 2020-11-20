import firebase from 'firebase/app'
import 'firebase/database'

firebase.initializeApp({
  databaseURL: 'https://hacker-news.firebaseio.com',
})

const getSnapshotValue = async <T>(path: string) => {
  const snapshot = await firebase.database().ref(path).once('value')
  return snapshot.val() as T
}

const main = async () => {
  try {
    const storyId = process.argv[2]
    if (!storyId) {
      console.log('No story ID')
    } else {
      for (let id = Number(storyId) - 1; id > 0; id--) {
        const storyInfo = await getSnapshotValue<{
          descendants: number
          id: number
          kids: number[]
          score: number
          time: number
          title: string
          type: 'story'
          url?: string
          text?: string
        }>(`v0/item/${id}`)
        if (storyInfo.type === 'story' && storyInfo.title?.match(/^Show HN/i)) {
          console.log(storyInfo.id, new Date(storyInfo.time * 1000))
        }
      }

      process.exit(0)
    }
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
