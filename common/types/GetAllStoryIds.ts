/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllStoryIds
// ====================================================

export interface GetAllStoryIds_hn_stories {
  __typename: "hn_stories";
  id: number;
}

export interface GetAllStoryIds {
  /**
   * fetch data from the table: "hn_stories"
   */
  hn_stories: GetAllStoryIds_hn_stories[];
}
