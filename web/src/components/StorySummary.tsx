import React, { useEffect, useState } from 'react'
import { GetStories_hn_stories } from 'sidep-common/types/GetStories'
import { SocialLink } from './SocialLink'
import { WebsiteIcon } from './WebsiteIcon'
import { isToday, isYesterday } from 'date-fns'
import TwitterIcon from '@material-ui/icons/Twitter'
import PersonIcon from '@material-ui/icons/Person'
import GitHubIcon from '@material-ui/icons/GitHub'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

export interface Props {
  story: GetStories_hn_stories
  expanded: boolean
}

export const StorySummary = ({ story, expanded }: Props) => {
  const [thisOneExpanded, setThisOneExpanded] = useState(expanded)

  useEffect(() => {
    setThisOneExpanded(expanded)
  }, [expanded])

  return (
    <div data-story-id={story.id} className="flex space-x-2">
      <div className="w-8 pt-1 flex-none flex flex-col space-y-1 items-center">
        <WebsiteIcon
          url={story.website?.url || 'https://news.ycombinator.com'}
        />
        <span className="text-xs">{story.score}</span>
      </div>
      <div className="flex flex-auto flex-col space-y">
        <h3 className="leading-5 text-sm">
          {externalLink(
            story.website?.url ||
              `https://news.ycombinator.com/item?id=${story.id}`,
            story.title,
            'no-style'
          )}
        </h3>

        <ul className="text-xs flex flex-col sm:flex-row justify-between space-x-3">
          <li className="text-gray-500 flex flex-none items-center space-y justify-start flex-row space-x-3 mt-1">
            <button onClick={() => setThisOneExpanded((e) => !e)}>
              {thisOneExpanded ? '▴ Hide details' : '▾ Show details'}
            </button>
            <span>{formatDate(story.date)}</span>{' '}
          </li>
          <li className="flex flex-wrap flex-auto items-end justify-end space-x-1 space-y-1 sm:flex-row">
            {story.hn_user && (
              <SocialLink
                icon={<PersonIcon />}
                url={`https://news.ycombinator.com/user?id=${story.hn_user.username}`}
                username={story.hn_user.username}
                number={story.hn_user.karma}
              />
            )}
            {story.website?.twitter_user && (
              <SocialLink
                icon={<TwitterIcon />}
                url={`https://twitter.com/${story.website?.twitter_user.username}`}
                username={story.website?.twitter_user.username}
                number={story.website?.twitter_user.nb_followers}
              />
            )}
            {story.website?.github_user && (
              <SocialLink
                icon={<GitHubIcon />}
                url={`https://github.com/${story.website?.github_user.username}`}
                username={story.website?.github_user.username}
                number={story.website?.github_user.nb_followers}
              />
            )}
          </li>
        </ul>

        {thisOneExpanded && (
          <div className="flex flex-col space-y-2 my-4 mr-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <div className="flex flex-col space-y-1 space-y-1 rounded shadow p-2">
              <h3 className="text-sm font-medium flex items-center space-x-2">
                <DescriptionOutlinedIcon /> <span>Story info</span>
              </h3>
              <ul className="text-xs">
                <li>
                  HN Story:{' '}
                  {externalLink(
                    `https://news.ycombinator.com/item?id=${story.id}`,
                    String(story.id)
                  )}
                </li>
                <li>Score: {story.score}</li>
                {story.website && (
                  <li className="flex space-x-1">
                    <span>Posted URL:</span>
                    {externalLink(
                      story.website.url,
                      story.website.url,
                      'block w-48 truncate'
                    )}
                  </li>
                )}
              </ul>
            </div>

            {story.hn_user && (
              <div className="flex flex-col space-y-1 space-y-1 rounded shadow p-2">
                <h3 className="text-sm font-medium flex items-center space-x-2">
                  <PersonIcon /> <span>HackerNews user</span>
                </h3>
                <ul className="text-xs">
                  <li>
                    Username:{' '}
                    {externalLink(
                      `https://news.ycombinator.com/user?id=${story.hn_user.username}`,
                      story.hn_user.username
                    )}
                  </li>
                  <li>Karma: {story.hn_user.karma}</li>
                </ul>
              </div>
            )}

            {story.website?.github_user && (
              <div className="flex flex-col space-y-1 space-y-1 rounded shadow p-2 group">
                <h3 className="text-sm font-medium flex items-center space-x-2 h-6">
                  <GitHubIcon /> <span className="flex-auto">GitHub user</span>
                  {story.website.github_user.profile_image_url && (
                    <img
                      className="w-10 h-10 rounded-full self-start shadow duration-500 ease-in-out transition-opacity opacity-25 group-hover:opacity-100"
                      src={story.website.github_user.profile_image_url}
                    />
                  )}
                </h3>
                <ul className="text-xs">
                  <li>
                    Username:{' '}
                    {externalLink(
                      `https://github.com/${story.website.github_user.username}`,
                      story.website.github_user.username
                    )}
                  </li>
                  {story.website.github_user.name && (
                    <li>Name: {story.website.github_user.name}</li>
                  )}
                  <li>
                    Number of followers:{' '}
                    {story.website.github_user.nb_followers}
                  </li>
                  {story.website.github_user.location && (
                    <li className="flex space-x-1">
                      <span>Location:</span>
                      <span>{story.website.github_user.location}</span>
                    </li>
                  )}
                  {story.website.github_user.email && (
                    <li className="flex space-x-1">
                      <span>E-mail address:</span>
                      <span>{story.website.github_user.email}</span>
                    </li>
                  )}
                  {story.website.github_user.website && (
                    <li className="flex space-x-1">
                      <span>Website:</span>
                      {externalLink(
                        story.website.github_user.website,
                        story.website.github_user.website,
                        'block w-48 truncate'
                      )}
                    </li>
                  )}
                </ul>
              </div>
            )}

            {story.website?.twitter_user && (
              <div className="flex flex-col space-y-1 space-y-1 rounded shadow p-2 group">
                <h3 className="text-sm font-medium flex items-center space-x-2 h-6">
                  <TwitterIcon />{' '}
                  <span className="flex-auto">Twitter user</span>
                  {story.website.twitter_user.profile_image_url && (
                    <img
                      className="w-10 h-10 rounded-full self-start shadow duration-500 ease-in-out transition-opacity opacity-25 group-hover:opacity-100"
                      src={story.website.twitter_user.profile_image_url}
                    />
                  )}
                </h3>
                <ul className="text-xs">
                  <li>
                    Username:{' '}
                    {externalLink(
                      `https://twitter.com/${story.website.twitter_user.username}`,
                      story.website.twitter_user.username
                    )}
                  </li>
                  {story.website.twitter_user.name && (
                    <li>Name: {story.website.twitter_user.name}</li>
                  )}
                  <li>
                    Number of followers:{' '}
                    {story.website.twitter_user.nb_followers}
                  </li>
                  {story.website.twitter_user.location && (
                    <li className="flex space-x-1">
                      <span>Location:</span>
                      <span>{story.website.twitter_user.location}</span>
                    </li>
                  )}
                  {story.website.twitter_user.website && (
                    <li className="flex space-x-1">
                      <span>Website:</span>
                      {externalLink(
                        story.website.twitter_user.website,
                        story.website.twitter_user.website,
                        'block w-48 truncate'
                      )}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const externalLink = (href: string, label: string, className = '') => (
  <a
    target="_blank"
    rel="noopener"
    href={href.match(/^https?:\/\//i) ? href : `https://${href}`}
    className={className}
  >
    {label}
  </a>
)

const formatDate = (date: any) => {
  date = new Date(date)
  if (isToday(date)) {
    return 'Today at ' + date.toLocaleTimeString()
  }
  if (isYesterday(date)) {
    return 'Yesterday at ' + date.toLocaleTimeString()
  }
  return date.toDateString()
}
