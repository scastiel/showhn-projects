import { useQuery, useSubscription } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { Story } from '../types'
import {
  GetStories,
  GetStoriesVariables,
  GetStories_hn_stories,
} from 'sidep-common/types/GetStories'
import {
  GetNumberOfStories,
  GetNumberOfStoriesVariables,
} from 'sidep-common/types/GetNumberOfStories'
import { StoryList } from './StoryList'
import { Filters, FiltersSet } from './Filters'
import { hn_stories_bool_exp } from 'sidep-common/types/globalTypes'
import { useDebounce } from '@react-hook/debounce'
import Popover from 'react-popover'

export const ITEMS_PER_PAGE = 20

export interface Props {
  stories: Story[]
}

const GET_NUMBER_OF_RESULTS = gql`
  subscription GetNumberOfStories($filters: hn_stories_bool_exp) {
    hn_stories_aggregate(where: $filters) {
      aggregate {
        count
      }
    }
  }
`

const GET_STORIES = gql`
  subscription GetStories($filters: hn_stories_bool_exp, $limit: Int) {
    hn_stories(order_by: { date: desc }, where: $filters, limit: $limit) {
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
          location
          profile_image_url
        }
        github_user {
          username
          name
          website
          nb_followers
          location
          email
          profile_image_url
        }
      }
    }
  }
`

const uniqBy = <T extends {}, K extends keyof T>(array: T[], key: K): T[] => {
  const keys = new Set<T[K]>()
  const res = []
  for (const el of array) {
    if (!keys.has(el[key])) {
      keys.add(el[key])
      res.push(el)
    }
  }
  return res
}

const createFilters = (
  search: string,
  filtersSet: FiltersSet
): { nbFilters: number; filters: hn_stories_bool_exp; query: string } => {
  let query: Record<string, string> = {}
  let nbFilters = 0
  const criteria = { _ilike: `%${search}%` }

  const filters: hn_stories_bool_exp = {}
  if (
    filtersSet.scoreFilter &&
    filtersSet.minScore &&
    filtersSet.minScore > 0
  ) {
    nbFilters++
    filters.score = { _gte: filtersSet.minScore }
    query.min_score = String(filtersSet.minScore)
  }
  if (
    filtersSet.karmaFilter &&
    filtersSet.minKarma &&
    filtersSet.minKarma > 0
  ) {
    nbFilters++
    filters.hn_user = { karma: { _gte: filtersSet.minKarma } }
    query.min_karma = String(filtersSet.minKarma)
  }
  if (filtersSet.twitterFilter) {
    nbFilters++
    filters.website = {
      ...filters.website,
      twitter_username: { _is_null: false },
    }
    query.has_twitter = 'true'
    if (filtersSet.minTwitterFollowers && filtersSet.minTwitterFollowers > 0) {
      filters.website.twitter_user = {
        nb_followers: { _gte: filtersSet.minTwitterFollowers },
      }
      query.min_twitter_followers = String(filtersSet.minTwitterFollowers)
    }
  }
  if (filtersSet.githubFilter) {
    nbFilters++
    filters.website = {
      ...filters.website,
      github_username: { _is_null: false },
    }
    query.has_github = 'true'
    if (filtersSet.minGithubFollowers && filtersSet.minGithubFollowers > 0) {
      filters.website.github_user = {
        nb_followers: { _gte: filtersSet.minGithubFollowers },
      }
      query.min_github_followers = String(filtersSet.minGithubFollowers)
    }
  }
  if (search) {
    filters._or = [
      { title: criteria },
      { hn_username: criteria },
      {
        website: {
          _or: [
            { github_username: criteria },
            { twitter_username: criteria },
            {
              github_user: {
                _or: [{ location: criteria }, { name: criteria }],
              },
            },
            {
              twitter_user: {
                _or: [{ location: criteria }, { name: criteria }],
              },
            },
          ],
        },
      },
    ]
    query.search = search
  }

  return {
    nbFilters,
    filters,
    query: Object.entries(query)
      .map(([k, v]) => `${k}=${v}`)
      .join('&'),
  }
}

export const App = () => {
  const [nbFilters, setNbFilters] = useState(0)
  const [filters, setFilters] = useDebounce<hn_stories_bool_exp>({}, 300)
  const [filtersSet, setFiltersSet] = useState<FiltersSet>({
    scoreFilter: false,
    karmaFilter: false,
    twitterFilter: false,
    githubFilter: false,
  })
  const [search, setSearch] = useState<string>('')
  const [expanded, setExpanded] = useState(false)
  const [limit, setLimit] = useState(ITEMS_PER_PAGE)
  const { loading, data, error } = useSubscription<
    GetStories,
    GetStoriesVariables
  >(GET_STORIES, {
    variables: { filters, limit },
  })
  const { data: nbStoriesData } = useSubscription<
    GetNumberOfStories,
    GetNumberOfStoriesVariables
  >(GET_NUMBER_OF_RESULTS, {
    variables: { filters },
  })
  const nbStories = nbStoriesData?.hn_stories_aggregate.aggregate?.count
  const [stories, setStories] = useState<GetStories_hn_stories[]>([])
  const [invalidate, setInvalidate] = useState(true)
  const [filtersDisplayed, setFiltersDisplayed] = useState(false)

  useEffect(() => {
    if (data && stories !== data.hn_stories) {
      if (limit === ITEMS_PER_PAGE) setStories(data.hn_stories)
      else
        setStories(
          uniqBy(
            [...(invalidate ? [] : stories || []), ...data.hn_stories],
            'id'
          )
        )
      setInvalidate(false)
    }
  }, [data, limit])

  const [title, setTitle] = useState(<h2 />)
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (error) setTitle(<h2>An error occured</h2>)
    else if (loading || !stories || nbStories == null) {
      timeout = setTimeout(() => setTitle(<h2>Loading…</h2>), 500)
    } else if (nbStories === 0) setTitle(<h2>No project matching filters</h2>)
    else if (nbStories === 1) setTitle(<h2>One project found</h2>)
    else setTitle(<h2>{nbStories} projects found</h2>)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [error, loading, stories, nbStories])

  useEffect(() => {
    if (document.location.hash) {
      const values: Record<string, string> = Object.fromEntries(
        document.location.hash
          .replace(/[?#]/, '')
          .split('&')
          .map((s) => s.split('='))
      )
      const filters: FiltersSet = {
        scoreFilter: Number(values.min_score) > 0,
        minScore: Number(values.min_score) || undefined,
        karmaFilter: Number(values.min_karma) > 0,
        minKarma: Number(values.min_karma) || undefined,
        twitterFilter: values.has_twitter === 'true',
        minTwitterFollowers: Number(values.min_twitter_followers) || undefined,
        githubFilter: values.has_github === 'true',
        minGithubFollowers: Number(values.min_github_followers) || undefined,
      }
      setFiltersSet(filters)
      if (values.search) {
        setSearch(values.search)
      }
    }
  }, [])

  useEffect(() => {
    setLimit(ITEMS_PER_PAGE)
    setInvalidate(true)
    const { filters, nbFilters, query } = createFilters(search, filtersSet)
    setFilters(filters)
    setNbFilters(nbFilters)
    window.history.replaceState({}, '', query ? `#${query}` : '.')
  }, [search, filtersSet])

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="space-y-4 flex flex-col w-full max-w-screen-md sm:flex-row-reverse sm:space-y-0 sm:items-start">
        <div className="flex-auto flex flex-col space-y-2">
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end">
            {title}
            <div className="flex flex-row-reverse items-center mb-2 sm:mb-0 sm:flex-row">
              <Popover
                isOpen={filtersDisplayed}
                onOuterAction={() => setFiltersDisplayed(false)}
                place="below"
                tipSize={0.001}
                body={
                  <div className="flex-none flex flex-col space-y-2 sm:self-start sm:sticky sm:top-0">
                    <Filters
                      filtersSet={filtersSet}
                      onFiltersChange={setFiltersSet}
                    />
                  </div>
                }
              >
                <button
                  className="text-sm btn btn-link"
                  onClick={() => setFiltersDisplayed((e) => !e)}
                >
                  Filters {nbFilters > 0 ? `(${nbFilters})` : ''}
                </button>
              </Popover>
              <button
                className="text-sm btn btn-link"
                onClick={() => setExpanded((e) => !e)}
              >
                {expanded ? 'Hide details' : 'Show details'}
              </button>
              <input
                type="search"
                placeholder="Search…"
                className="text-sm mr-2 flex-auto sm:mr-0 sm:ml-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {stories && stories.length > 0 && nbStories && (
            <>
              <StoryList stories={stories} expanded={expanded} />
              {(nbStories && stories.length < nbStories && (
                <button
                  className="btn btn-link self-start text-sm"
                  onClick={() => {
                    setLimit(stories.length + ITEMS_PER_PAGE)
                  }}
                  disabled={loading}
                >
                  {loading ? 'Loading…' : 'Load more'}
                </button>
              )) ||
                null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
