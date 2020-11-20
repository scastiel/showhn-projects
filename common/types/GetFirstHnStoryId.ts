/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFirstHnStoryId
// ====================================================

export interface GetFirstHnStoryId_hn_stories {
  __typename: "hn_stories";
  id: number;
}

export interface GetFirstHnStoryId {
  /**
   * fetch data from the table: "hn_stories"
   */
  hn_stories: GetFirstHnStoryId_hn_stories[];
}
