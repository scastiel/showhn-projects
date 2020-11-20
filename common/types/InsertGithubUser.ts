/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertGithubUser
// ====================================================

export interface InsertGithubUser_insert_github_users_one {
  __typename: "github_users";
  username: string;
  name: string | null;
  website: string | null;
  nb_followers: any;
  twitter_username: string | null;
  location: string | null;
  email: string | null;
  profile_image_url: string | null;
}

export interface InsertGithubUser {
  /**
   * insert a single row into the table: "github_users"
   */
  insert_github_users_one: InsertGithubUser_insert_github_users_one | null;
}

export interface InsertGithubUserVariables {
  username: string;
  name?: string | null;
  website?: string | null;
  nb_followers: any;
  twitter_username?: string | null;
  location?: string | null;
  email?: string | null;
  profile_image_url?: string | null;
}
