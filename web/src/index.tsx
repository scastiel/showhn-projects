import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import './styles.css'
import nhost from 'nhost-js-sdk'
import { NhostApolloProvider } from '@nhost/react-apollo'

nhost.initializeApp({
  base_url: process.env.HBP_BASE_URL || '',
})

ReactDOM.render(
  <NhostApolloProvider gqlEndpoint={process.env.HASURA_GRAPHQL_URL}>
    <App />
  </NhostApolloProvider>,
  document.getElementById('app')
)
