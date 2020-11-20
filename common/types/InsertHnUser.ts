/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: InsertHnUser
// ====================================================

export interface InsertHnUser_insert_hn_users_one {
  __typename: "hn_users";
  username: string;
  karma: any;
}

export interface InsertHnUser {
  /**
   * insert a single row into the table: "hn_users"
   */
  insert_hn_users_one: InsertHnUser_insert_hn_users_one | null;
}

export interface InsertHnUserVariables {
  username: string;
  karma: any;
}
