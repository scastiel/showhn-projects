import React from 'react'

export interface Props {
  url: string
}

export const WebsiteIcon = ({ url }: Props) => {
  let domain
  try {
    const urlObj = new URL(url)
    domain = urlObj.hostname
  } catch (err) {
    domain = ''
  }
  return (
    <img
      src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
      referrerPolicy="no-referrer"
      className="inline h-4 w-4"
    />
  )
}
