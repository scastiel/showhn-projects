/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DoesStoryExist
// ====================================================

export interface DoesStoryExist_hn_stories_by_pk {
  __typename: "hn_stories";
  id: number;
}

export interface DoesStoryExist {
  /**
   * fetch data from the table: "hn_stories" using primary key columns
   */
  hn_stories_by_pk: DoesStoryExist_hn_stories_by_pk | null;
}

export interface DoesStoryExistVariables {
  id: number;
}
