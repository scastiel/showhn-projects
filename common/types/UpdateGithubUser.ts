/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateGithubUser
// ====================================================

export interface UpdateGithubUser_update_github_users {
  __typename: "github_users_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateGithubUser {
  /**
   * update data of the table: "github_users"
   */
  update_github_users: UpdateGithubUser_update_github_users | null;
}

export interface UpdateGithubUserVariables {
  username: string;
  name?: string | null;
  website?: string | null;
  nb_followers: any;
  twitter_username?: string | null;
  location?: string | null;
  email?: string | null;
  profile_image_url?: string | null;
}
