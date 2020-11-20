/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertStory
// ====================================================

export interface InsertStory_insert_hn_stories_one_hn_user {
  __typename: "hn_users";
  username: string;
  karma: any;
}

export interface InsertStory_insert_hn_stories_one_website_twitter_user {
  __typename: "twitter_users";
  username: string;
  name: string | null;
  website: string | null;
  nb_followers: any;
}

export interface InsertStory_insert_hn_stories_one_website_github_user {
  __typename: "github_users";
  username: string;
  name: string | null;
  website: string | null;
  nb_followers: any;
}

export interface InsertStory_insert_hn_stories_one_website {
  __typename: "websites";
  url: string;
  title: string | null;
  description: string | null;
  /**
   * An object relationship
   */
  twitter_user: InsertStory_insert_hn_stories_one_website_twitter_user | null;
  /**
   * An object relationship
   */
  github_user: InsertStory_insert_hn_stories_one_website_github_user | null;
}

export interface InsertStory_insert_hn_stories_one {
  __typename: "hn_stories";
  id: number;
  title: string;
  score: any;
  date: any;
  /**
   * An object relationship
   */
  hn_user: InsertStory_insert_hn_stories_one_hn_user | null;
  /**
   * An object relationship
   */
  website: InsertStory_insert_hn_stories_one_website | null;
}

export interface InsertStory {
  /**
   * insert a single row into the table: "hn_stories"
   */
  insert_hn_stories_one: InsertStory_insert_hn_stories_one | null;
}

export interface InsertStoryVariables {
  id: number;
  date: any;
  hn_username?: string | null;
  website_url?: string | null;
  score: any;
  title: string;
}
