/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTwitterUser
// ====================================================

export interface GetTwitterUser_twitter_users {
  __typename: "twitter_users";
  username: string;
  name: string | null;
  nb_followers: any;
  website: string | null;
  location: string | null;
  profile_image_url: string | null;
}

export interface GetTwitterUser {
  /**
   * fetch data from the table: "twitter_users"
   */
  twitter_users: GetTwitterUser_twitter_users[];
}

export interface GetTwitterUserVariables {
  username: string;
}
