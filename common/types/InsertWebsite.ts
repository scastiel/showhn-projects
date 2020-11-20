/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertWebsite
// ====================================================

export interface InsertWebsite_insert_websites_one {
  __typename: "websites";
  url: string;
  title: string | null;
  description: string | null;
  twitter_username: string | null;
  github_username: string | null;
}

export interface InsertWebsite {
  /**
   * insert a single row into the table: "websites"
   */
  insert_websites_one: InsertWebsite_insert_websites_one | null;
}

export interface InsertWebsiteVariables {
  url: string;
  title?: string | null;
  description?: string | null;
  twitter_username?: string | null;
  github_username?: string | null;
}
