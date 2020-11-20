import React from 'react'

export interface Props {
  icon: any
  url: string
  username: string
  number: number
}

export const SocialLink = ({ icon, url, username, number }: Props) => {
  return (
    <a href={url} target="_blank" rel="noopener" className="no-style flex rounded border divide-x">
      <div className="flex space-x-1 px-1">
        <span className="text-base flex items-center">{icon}</span>
        <span>{username}</span>
      </div>
      <span className="bg-gray-500 px-1 text-xs text-white rounded-r flex items-center">{number}</span>
    </a>
  )
}
