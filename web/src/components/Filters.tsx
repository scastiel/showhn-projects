import React, { useEffect, useState } from 'react'
import { hn_stories_bool_exp } from 'sidep-common/types/globalTypes'

export interface Props {
  filtersSet: FiltersSet
  onFiltersChange: (filtersSet: FiltersSet) => void
}

export interface FiltersSet {
  scoreFilter: boolean
  minScore?: number
  karmaFilter: boolean
  minKarma?: number
  twitterFilter: boolean
  minTwitterFollowers?: number
  githubFilter: boolean
  minGithubFollowers?: number
}

export const Filters = ({ filtersSet, onFiltersChange }: Props) => {
  return (
    <div className="rounded p-3 bg-white shadow-lg">
      <ul className="text-sm flex flex-col space-y-1">
        <li className="flex space-x-1 items-center">
          <label className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="switch"
              checked={filtersSet.scoreFilter}
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  scoreFilter: e.target.checked,
                  minScore: filtersSet.minScore || 1,
                })
              }
            />
            <span>Score</span>
          </label>
          <label className="flex space-x-1 items-center">
            <span>&ge;</span>
            <input
              className="w-16"
              disabled={!filtersSet.scoreFilter}
              type="number"
              placeholder="0"
              value={filtersSet.scoreFilter ? filtersSet.minScore : ''}
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  minScore: Number(e.target.value),
                })
              }
            />
          </label>
        </li>
        <li className="flex space-x-1 items-center">
          <label className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="switch"
              checked={filtersSet.karmaFilter}
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  karmaFilter: e.target.checked,
                  minKarma: filtersSet.minKarma || 1,
                })
              }
            />
            <span>User karma</span>
          </label>
          <label className="flex space-x-1 items-center">
            <span>&ge;</span>
            <input
              className="w-16"
              disabled={!filtersSet.karmaFilter}
              type="number"
              placeholder="0"
              value={filtersSet.karmaFilter ? filtersSet.minKarma : ''}
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  minKarma: Number(e.target.value),
                })
              }
            />
          </label>
        </li>
        <li className="flex space-x-1 items-center">
          <label className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="switch"
              checked={filtersSet.twitterFilter}
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  twitterFilter: e.target.checked,
                  minTwitterFollowers: filtersSet.minTwitterFollowers || 1,
                })
              }
            />
            <span>Twitter</span>
          </label>
          <label className="flex space-x-1 items-center">
            <span>&ge;</span>
            <input
              className="w-16"
              disabled={!filtersSet.twitterFilter}
              type="number"
              placeholder="0"
              value={
                filtersSet.twitterFilter ? filtersSet.minTwitterFollowers : ''
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  minTwitterFollowers: Number(e.target.value),
                })
              }
            />
            <span>followers</span>
          </label>
        </li>
        <li className="flex space-x-1 items-center">
          <label className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="switch"
              checked={filtersSet.githubFilter}
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  githubFilter: e.target.checked,
                  minGithubFollowers: filtersSet.minGithubFollowers || 1,
                })
              }
            />
            <span>GitHub</span>
          </label>
          <label className="flex space-x-1 items-center">
            <span>&ge;</span>
            <input
              className="w-16"
              disabled={!filtersSet.githubFilter}
              type="number"
              placeholder="0"
              value={
                filtersSet.githubFilter ? filtersSet.minGithubFollowers : ''
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filtersSet,
                  minGithubFollowers: Number(e.target.value),
                })
              }
            />
            <span>followers</span>
          </label>
        </li>
      </ul>
    </div>
  )
}
