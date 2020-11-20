import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import fetch from 'node-fetch'
import { GetHnUser, GetHnUserVariables } from 'sidep-common/types/GetHnUser'
import {
  InsertHnUser,
  InsertHnUserVariables,
} from 'sidep-common/types/InsertHnUser'
import {
  GetTwitterUser,
  GetTwitterUserVariables,
} from 'sidep-common/types/GetTwitterUser'
import {
  InsertTwitterUser,
  InsertTwitterUserVariables,
} from 'sidep-common/types/InsertTwitterUser'
import {
  GetGithubUser,
  GetGithubUserVariables,
} from 'sidep-common/types/GetGithubUser'
import {
  InsertGithubUser,
  InsertGithubUserVariables,
} from 'sidep-common/types/InsertGithubUser'
import {
  InsertWebsite,
  InsertWebsiteVariables,
} from 'sidep-common/types/InsertWebsite'
import {
  InsertStory,
  InsertStoryVariables,
} from 'sidep-common/types/InsertStory'
import {
  DoesStoryExist,
  DoesStoryExistVariables,
} from 'sidep-common/types/DoesStoryExist'
import { GetLastHnStoryId } from 'sidep-common/types/GetLastHnStoryId'
import { GetFirstHnStoryId } from 'sidep-common/types/GetFirstHnStoryId'
import { GetLatestStoryIds } from 'sidep-common/types/GetLatestStoryIds'
import {
  UpdateStoryScore,
  UpdateStoryScoreVariables,
} from 'sidep-common/types/UpdateStoryScore'
import {
  UpdateStory,
  UpdateStoryVariables,
} from 'sidep-common/types/UpdateStory'
import {
  UpdateHnUser,
  UpdateHnUserVariables,
} from 'sidep-common/types/UpdateHnUser'
import {
  UpdateTwitterUser,
  UpdateTwitterUserVariables,
} from 'sidep-common/types/UpdateTwitterUser'
import {
  UpdateGithubUser,
  UpdateGithubUserVariables,
} from 'sidep-common/types/UpdateGithubUser'
import {
  UpdateWebsite,
  UpdateWebsiteVariables,
} from 'sidep-common/types/UpdateWebsite'
import { GetWebsite, GetWebsiteVariables } from 'sidep-common/types/GetWebsite'
import { GetAllStoryIds } from 'sidep-common/types/GetAllStoryIds'
import { omit } from './helpers'

const client = new ApolloClient({
  uri: process.env.HASURA_GRAPHQL_URL,
  fetch: fetch as never,
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
})

export const getHnUser = async (username: string) => {
  const { data } = await client.query<GetHnUser, GetHnUserVariables>({
    query: gql`
      query GetHnUser($username: String!) {
        hn_users(where: { username: { _ilike: $username } }) {
          username
          karma
        }
      }
    `,
    variables: { username },
    fetchPolicy: 'network-only',
  })
  return omit(data.hn_users[0], '__typename')
}

export const updateHnUser = async (variables: UpdateHnUserVariables) => {
  const { data } = await client.mutate<UpdateHnUser, UpdateHnUserVariables>({
    mutation: gql`
      mutation UpdateHnUser($username: String!, $karma: numeric!) {
        update_hn_users(
          _set: { karma: $karma }
          where: { username: { _eq: $username } }
        ) {
          affected_rows
        }
      }
    `,
    variables,
  })
  return data?.update_hn_users?.affected_rows
}

export const insertHnUser = async (variables: InsertHnUserVariables) => {
  const { data } = await client.mutate<InsertHnUser, InsertHnUserVariables>({
    mutation: gql`
      mutation InsertHnUser($username: String!, $karma: numeric!) {
        insert_hn_users_one(object: { username: $username, karma: $karma }) {
          username
          karma
        }
      }
    `,
    variables,
  })
  return omit(data?.insert_hn_users_one, '__typename')
}

export const updateStory = async (variables: UpdateStoryVariables) => {
  const { data } = await client.mutate<UpdateStory, UpdateStoryVariables>({
    mutation: gql`
      mutation UpdateStory(
        $id: Int!
        $date: timestamptz!
        $hn_username: String
        $website_url: String
        $score: numeric!
        $title: String!
      ) {
        update_hn_stories(
          _set: {
            date: $date
            hn_username: $hn_username
            website_url: $website_url
            score: $score
            title: $title
          }
          where: { id: { _eq: $id } }
        ) {
          affected_rows
        }
      }
    `,
    variables,
  })
  return data?.update_hn_stories?.affected_rows
}

export const insertStory = async (variables: InsertStoryVariables) => {
  const { data } = await client.mutate<InsertStory, InsertStoryVariables>({
    mutation: gql`
      mutation InsertStory(
        $id: Int!
        $date: timestamptz!
        $hn_username: String
        $website_url: String
        $score: numeric!
        $title: String!
      ) {
        insert_hn_stories_one(
          object: {
            id: $id
            date: $date
            hn_username: $hn_username
            website_url: $website_url
            score: $score
            title: $title
          }
        ) {
          id
          title
          score
          date
          hn_user {
            username
            karma
          }
          website {
            url
            title
            description
            twitter_user {
              username
              name
              website
              nb_followers
            }
            github_user {
              username
              name
              website
              nb_followers
            }
          }
        }
      }
    `,
    variables,
  })
  return omit(data?.insert_hn_stories_one, '__typename')
}

export const doesStoryExist = async (id: number) => {
  const { data } = await client.query<DoesStoryExist, DoesStoryExistVariables>({
    query: gql`
      query DoesStoryExist($id: Int!) {
        hn_stories_by_pk(id: $id) {
          id
        }
      }
    `,
    variables: { id },
    fetchPolicy: 'network-only',
  })
  return Boolean(data.hn_stories_by_pk)
}

export const getTwitterUser = async (username: string) => {
  const { data } = await client.query<GetTwitterUser, GetTwitterUserVariables>({
    query: gql`
      query GetTwitterUser($username: String!) {
        twitter_users(where: { username: { _ilike: $username } }) {
          username
          name
          nb_followers
          website
          location
          profile_image_url
        }
      }
    `,
    variables: { username },
    fetchPolicy: 'network-only',
  })
  return omit(data.twitter_users[0], '__typename')
}

export const updateTwitterUser = async (
  variables: UpdateTwitterUserVariables
) => {
  const { data } = await client.mutate<
    UpdateTwitterUser,
    UpdateTwitterUserVariables
  >({
    mutation: gql`
      mutation UpdateTwitterUser(
        $username: String!
        $name: String
        $website: String
        $nb_followers: numeric!
        $location: String
        $profile_image_url: String
      ) {
        update_twitter_users(
          where: { username: { _ilike: $username } }
          _set: {
            name: $name
            website: $website
            nb_followers: $nb_followers
            location: $location
            profile_image_url: $profile_image_url
          }
        ) {
          affected_rows
        }
      }
    `,
    variables,
  })
  return data?.update_twitter_users?.affected_rows
}

export const insertTwitterUser = async (
  variables: InsertTwitterUserVariables
) => {
  const { data } = await client.mutate<
    InsertTwitterUser,
    InsertTwitterUserVariables
  >({
    mutation: gql`
      mutation InsertTwitterUser(
        $username: String!
        $name: String
        $website: String
        $nb_followers: numeric!
        $location: String
        $profile_image_url: String
      ) {
        insert_twitter_users_one(
          object: {
            username: $username
            name: $name
            website: $website
            nb_followers: $nb_followers
            location: $location
            profile_image_url: $profile_image_url
          }
        ) {
          username
          name
          website
          nb_followers
          location
          profile_image_url
        }
      }
    `,
    variables,
  })
  return omit(data?.insert_twitter_users_one, '__typename')
}

export const getGithubUser = async (username: string) => {
  const { data } = await client.query<GetGithubUser, GetGithubUserVariables>({
    query: gql`
      query GetGithubUser($username: String!) {
        github_users(where: { username: { _ilike: $username } }) {
          username
          name
          nb_followers
          website
          twitter_username
          location
          email
          profile_image_url
        }
      }
    `,
    variables: { username },
    fetchPolicy: 'network-only',
  })
  return omit(data.github_users[0], '__typename')
}

export const insertGithubUser = async (
  variables: InsertGithubUserVariables
) => {
  const { data } = await client.mutate<
    InsertGithubUser,
    InsertGithubUserVariables
  >({
    mutation: gql`
      mutation InsertGithubUser(
        $username: String!
        $name: String
        $website: String
        $nb_followers: numeric!
        $twitter_username: String
        $location: String
        $email: String
        $profile_image_url: String
      ) {
        insert_github_users_one(
          object: {
            username: $username
            name: $name
            website: $website
            nb_followers: $nb_followers
            twitter_username: $twitter_username
            location: $location
            email: $email
            profile_image_url: $profile_image_url
          }
        ) {
          username
          name
          website
          nb_followers
          twitter_username
          location
          email
          profile_image_url
        }
      }
    `,
    variables,
  })
  return omit(data?.insert_github_users_one, '__typename')
}

export const updateGithubUser = async (
  variables: UpdateGithubUserVariables
) => {
  const { data } = await client.mutate<
    UpdateGithubUser,
    UpdateGithubUserVariables
  >({
    mutation: gql`
      mutation UpdateGithubUser(
        $username: String!
        $name: String
        $website: String
        $nb_followers: numeric!
        $twitter_username: String
        $location: String
        $email: String
        $profile_image_url: String
      ) {
        update_github_users(
          where: { username: { _ilike: $username } }
          _set: {
            name: $name
            website: $website
            nb_followers: $nb_followers
            twitter_username: $twitter_username
            location: $location
            email: $email
            profile_image_url: $profile_image_url
          }
        ) {
          affected_rows
        }
      }
    `,
    variables,
  })
  return data?.update_github_users?.affected_rows
}

export const getWebsite = async (url: string) => {
  const { data } = await client.query<GetWebsite, GetWebsiteVariables>({
    query: gql`
      query GetWebsite($url: String!) {
        websites(where: { url: { _ilike: $url } }) {
          url
          title
          description
          twitter_username
          github_username
        }
      }
    `,
    variables: { url },
    fetchPolicy: 'network-only',
  })
  return omit(data.websites[0], '__typename')
}

export const insertWebsite = async (variables: InsertWebsiteVariables) => {
  const { data } = await client.mutate<InsertWebsite, InsertWebsiteVariables>({
    mutation: gql`
      mutation InsertWebsite(
        $url: String!
        $title: String
        $description: String
        $twitter_username: String
        $github_username: String
      ) {
        insert_websites_one(
          object: {
            url: $url
            title: $title
            description: $description
            twitter_username: $twitter_username
            github_username: $github_username
          }
        ) {
          url
          title
          description
          twitter_username
          github_username
        }
      }
    `,
    variables,
  })
  return omit(data?.insert_websites_one, '__typename')
}

export const updateWebsite = async (variables: UpdateWebsiteVariables) => {
  const { data } = await client.mutate<UpdateWebsite, UpdateWebsiteVariables>({
    mutation: gql`
      mutation UpdateWebsite(
        $url: String!
        $title: String
        $description: String
        $twitter_username: String
        $github_username: String
      ) {
        update_websites(
          where: { url: { _ilike: $url } }
          _set: {
            title: $title
            description: $description
            twitter_username: $twitter_username
            github_username: $github_username
          }
        ) {
          affected_rows
        }
      }
    `,
    variables,
  })
  return data?.update_websites?.affected_rows
}

export const getLastStoryId = async (): Promise<number | undefined> => {
  const { data } = await client.query<GetLastHnStoryId>({
    query: gql`
      query GetLastHnStoryId {
        hn_stories(limit: 1, order_by: { id: desc }) {
          id
        }
      }
    `,
    fetchPolicy: 'network-only',
  })
  return data.hn_stories[0]?.id
}

export const getAllStoryIds = async () => {
  const { data } = await client.query<GetAllStoryIds>({
    query: gql`
      query GetAllStoryIds {
        hn_stories {
          id
        }
      }
    `,
  })
  return data.hn_stories.map((s) => s.id)
}

export const getFirstStoryId = async (): Promise<number | undefined> => {
  const { data } = await client.query<GetFirstHnStoryId>({
    query: gql`
      query GetFirstHnStoryId {
        hn_stories(limit: 1, order_by: { id: asc }) {
          id
        }
      }
    `,
    fetchPolicy: 'network-only',
  })
  return data.hn_stories[0]?.id
}

export const getLatestStoryIds = async () => {
  const { data } = await client.query<GetLatestStoryIds>({
    query: gql`
      query GetLatestStoryIds($minDate: timestamptz) {
        hn_stories(where: { date: { _gte: $minDate } }) {
          id
          score
        }
      }
    `,
    variables: { minDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  })
  return data.hn_stories
}

export const updateStoryScore = async (storyId: number, score: number) => {
  await client.mutate<UpdateStoryScore, UpdateStoryScoreVariables>({
    mutation: gql`
      mutation UpdateStoryScore($storyId: Int!, $score: numeric!) {
        update_hn_stories(
          _set: { score: $score }
          where: { id: { _eq: $storyId } }
        ) {
          affected_rows
        }
      }
    `,
    variables: { storyId, score },
  })
}
