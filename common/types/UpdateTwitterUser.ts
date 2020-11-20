/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTwitterUser
// ====================================================

export interface UpdateTwitterUser_update_twitter_users {
  __typename: "twitter_users_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateTwitterUser {
  /**
   * update data of the table: "twitter_users"
   */
  update_twitter_users: UpdateTwitterUser_update_twitter_users | null;
}

export interface UpdateTwitterUserVariables {
  username: string;
  name?: string | null;
  website?: string | null;
  nb_followers: any;
  location?: string | null;
  profile_image_url?: string | null;
}
