import React from 'react'
import { GetStories_hn_stories } from 'sidep-common/types/GetStories'
import { StorySummary } from './StorySummary'

export interface Props {
  stories: GetStories_hn_stories[]
  expanded: boolean
}

export const StoryList = ({ stories, expanded }: Props) => {
  return (
    <ul className="rounded divide-y bg-white shadow-xl">
      {stories.map((story) => (
        <li key={story.id} className="p-2">
          <StorySummary story={story} expanded={expanded} />
        </li>
      ))}
    </ul>
  )
}
