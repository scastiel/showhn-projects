import nhost from 'nhost-js-sdk'

nhost.initializeApp({
  base_url: process.env.HBP_URL || '',
})

export const auth = nhost.auth()
