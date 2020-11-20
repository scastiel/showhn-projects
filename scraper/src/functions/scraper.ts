import { APIGatewayEvent } from 'aws-lambda'
import { runNewest } from '../scraper'

export const handler = async (event: APIGatewayEvent) => {
  if (
    event.queryStringParameters?.secret !==
    process.env.HASURA_GRAPHQL_ADMIN_SECRET
  ) {
    return { statusCode: 403 }
  }

  try {
    await runNewest({ dryRun: false, force: false })
    return { statusCode: 200 }
  } catch (err) {
    console.error(err)
    return { statusCode: 500 }
  }
}
