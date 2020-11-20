/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateStory
// ====================================================

export interface UpdateStory_update_hn_stories {
  __typename: "hn_stories_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateStory {
  /**
   * update data of the table: "hn_stories"
   */
  update_hn_stories: UpdateStory_update_hn_stories | null;
}

export interface UpdateStoryVariables {
  id: number;
  date: any;
  hn_username?: string | null;
  website_url?: string | null;
  score: any;
  title: string;
}
