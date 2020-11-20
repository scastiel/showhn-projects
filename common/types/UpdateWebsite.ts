/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWebsite
// ====================================================

export interface UpdateWebsite_update_websites {
  __typename: "websites_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateWebsite {
  /**
   * update data of the table: "websites"
   */
  update_websites: UpdateWebsite_update_websites | null;
}

export interface UpdateWebsiteVariables {
  url: string;
  title?: string | null;
  description?: string | null;
  twitter_username?: string | null;
  github_username?: string | null;
}
