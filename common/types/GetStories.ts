/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { hn_stories_bool_exp } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: GetStories
// ====================================================

export interface GetStories_hn_stories_hn_user {
  __typename: "hn_users";
  username: string;
  karma: any;
}

export interface GetStories_hn_stories_website_twitter_user {
  __typename: "twitter_users";
  username: string;
  name: string | null;
  website: string | null;
  nb_followers: any;
  location: string | null;
  profile_image_url: string | null;
}

export interface GetStories_hn_stories_website_github_user {
  __typename: "github_users";
  username: string;
  name: string | null;
  website: string | null;
  nb_followers: any;
  location: string | null;
  email: string | null;
  profile_image_url: string | null;
}

export interface GetStories_hn_stories_website {
  __typename: "websites";
  url: string;
  title: string | null;
  description: string | null;
  /**
   * An object relationship
   */
  twitter_user: GetStories_hn_stories_website_twitter_user | null;
  /**
   * An object relationship
   */
  github_user: GetStories_hn_stories_website_github_user | null;
}

export interface GetStories_hn_stories {
  __typename: "hn_stories";
  id: number;
  title: string;
  score: any;
  date: any;
  /**
   * An object relationship
   */
  hn_user: GetStories_hn_stories_hn_user | null;
  /**
   * An object relationship
   */
  website: GetStories_hn_stories_website | null;
}

export interface GetStories {
  /**
   * fetch data from the table: "hn_stories"
   */
  hn_stories: GetStories_hn_stories[];
}

export interface GetStoriesVariables {
  filters?: hn_stories_bool_exp | null;
  limit?: number | null;
}
