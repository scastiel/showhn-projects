/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertTwitterUser
// ====================================================

export interface InsertTwitterUser_insert_twitter_users_one {
  __typename: "twitter_users";
  username: string;
  name: string | null;
  website: string | null;
  nb_followers: any;
  location: string | null;
  profile_image_url: string | null;
}

export interface InsertTwitterUser {
  /**
   * insert a single row into the table: "twitter_users"
   */
  insert_twitter_users_one: InsertTwitterUser_insert_twitter_users_one | null;
}

export interface InsertTwitterUserVariables {
  username: string;
  name?: string | null;
  website?: string | null;
  nb_followers: any;
  location?: string | null;
  profile_image_url?: string | null;
}
