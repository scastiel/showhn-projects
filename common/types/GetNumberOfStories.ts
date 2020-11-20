/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { hn_stories_bool_exp } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: GetNumberOfStories
// ====================================================

export interface GetNumberOfStories_hn_stories_aggregate_aggregate {
  __typename: "hn_stories_aggregate_fields";
  count: number | null;
}

export interface GetNumberOfStories_hn_stories_aggregate {
  __typename: "hn_stories_aggregate";
  aggregate: GetNumberOfStories_hn_stories_aggregate_aggregate | null;
}

export interface GetNumberOfStories {
  /**
   * fetch aggregated fields from the table: "hn_stories"
   */
  hn_stories_aggregate: GetNumberOfStories_hn_stories_aggregate;
}

export interface GetNumberOfStoriesVariables {
  filters?: hn_stories_bool_exp | null;
}
