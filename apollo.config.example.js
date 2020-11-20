/* eslint-disable */
module.exports = {
  client: {
    service: {
      name: 'nhost',
      url: 'http://localhost:8080/v1/graphql',
      headers: {
        'x-hasura-admin-secret': 'supersecret',
      },
    },
    includes: ['./scraper/src/**/*.ts', './web/src/**/*.{ts,tsx}'],
    excludes: [],
  },
}
