/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLatestStoryIds
// ====================================================

export interface GetLatestStoryIds_hn_stories {
  __typename: "hn_stories";
  id: number;
  score: any;
}

export interface GetLatestStoryIds {
  /**
   * fetch data from the table: "hn_stories"
   */
  hn_stories: GetLatestStoryIds_hn_stories[];
}
