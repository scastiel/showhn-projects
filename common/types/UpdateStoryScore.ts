/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateStoryScore
// ====================================================

export interface UpdateStoryScore_update_hn_stories {
  __typename: "hn_stories_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateStoryScore {
  /**
   * update data of the table: "hn_stories"
   */
  update_hn_stories: UpdateStoryScore_update_hn_stories | null;
}

export interface UpdateStoryScoreVariables {
  storyId: number;
  score: any;
}
