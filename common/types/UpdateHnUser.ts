/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateHnUser
// ====================================================

export interface UpdateHnUser_update_hn_users {
  __typename: "hn_users_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface UpdateHnUser {
  /**
   * update data of the table: "hn_users"
   */
  update_hn_users: UpdateHnUser_update_hn_users | null;
}

export interface UpdateHnUserVariables {
  username: string;
  karma: any;
}
