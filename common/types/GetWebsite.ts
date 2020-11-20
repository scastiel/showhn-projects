/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWebsite
// ====================================================

export interface GetWebsite_websites {
  __typename: "websites";
  url: string;
  title: string | null;
  description: string | null;
  twitter_username: string | null;
  github_username: string | null;
}

export interface GetWebsite {
  /**
   * fetch data from the table: "websites"
   */
  websites: GetWebsite_websites[];
}

export interface GetWebsiteVariables {
  url: string;
}
