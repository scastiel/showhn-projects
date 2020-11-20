/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLastHnStoryId
// ====================================================

export interface GetLastHnStoryId_hn_stories {
  __typename: "hn_stories";
  id: number;
}

export interface GetLastHnStoryId {
  /**
   * fetch data from the table: "hn_stories"
   */
  hn_stories: GetLastHnStoryId_hn_stories[];
}
