/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGithubUser
// ====================================================

export interface GetGithubUser_github_users {
  __typename: "github_users";
  username: string;
  name: string | null;
  nb_followers: any;
  website: string | null;
  twitter_username: string | null;
  location: string | null;
  email: string | null;
  profile_image_url: string | null;
}

export interface GetGithubUser {
  /**
   * fetch data from the table: "github_users"
   */
  github_users: GetGithubUser_github_users[];
}

export interface GetGithubUserVariables {
  username: string;
}
