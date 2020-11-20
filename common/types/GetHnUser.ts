/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHnUser
// ====================================================

export interface GetHnUser_hn_users {
  __typename: "hn_users";
  username: string;
  karma: any;
}

export interface GetHnUser {
  /**
   * fetch data from the table: "hn_users"
   */
  hn_users: GetHnUser_hn_users[];
}

export interface GetHnUserVariables {
  username: string;
}
