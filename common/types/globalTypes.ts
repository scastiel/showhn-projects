/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * expression to compare columns of type Int. All fields are combined with logical 'AND'.
 */
export interface Int_comparison_exp {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
}

/**
 * expression to compare columns of type String. All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
}

/**
 * Boolean expression to filter rows from the table "github_users". All fields are combined with a logical 'AND'.
 */
export interface github_users_bool_exp {
  _and?: (github_users_bool_exp | null)[] | null;
  _not?: github_users_bool_exp | null;
  _or?: (github_users_bool_exp | null)[] | null;
  email?: String_comparison_exp | null;
  location?: String_comparison_exp | null;
  name?: String_comparison_exp | null;
  nb_followers?: numeric_comparison_exp | null;
  profile_image_url?: String_comparison_exp | null;
  twitter_username?: String_comparison_exp | null;
  username?: String_comparison_exp | null;
  website?: String_comparison_exp | null;
  websites?: websites_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "hn_stories". All fields are combined with a logical 'AND'.
 */
export interface hn_stories_bool_exp {
  _and?: (hn_stories_bool_exp | null)[] | null;
  _not?: hn_stories_bool_exp | null;
  _or?: (hn_stories_bool_exp | null)[] | null;
  date?: timestamptz_comparison_exp | null;
  hn_user?: hn_users_bool_exp | null;
  hn_username?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  score?: numeric_comparison_exp | null;
  title?: String_comparison_exp | null;
  website?: websites_bool_exp | null;
  website_url?: String_comparison_exp | null;
}

/**
 * Boolean expression to filter rows from the table "hn_users". All fields are combined with a logical 'AND'.
 */
export interface hn_users_bool_exp {
  _and?: (hn_users_bool_exp | null)[] | null;
  _not?: hn_users_bool_exp | null;
  _or?: (hn_users_bool_exp | null)[] | null;
  hn_stories?: hn_stories_bool_exp | null;
  karma?: numeric_comparison_exp | null;
  username?: String_comparison_exp | null;
}

/**
 * expression to compare columns of type numeric. All fields are combined with logical 'AND'.
 */
export interface numeric_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * Boolean expression to filter rows from the table "twitter_users". All fields are combined with a logical 'AND'.
 */
export interface twitter_users_bool_exp {
  _and?: (twitter_users_bool_exp | null)[] | null;
  _not?: twitter_users_bool_exp | null;
  _or?: (twitter_users_bool_exp | null)[] | null;
  location?: String_comparison_exp | null;
  name?: String_comparison_exp | null;
  nb_followers?: numeric_comparison_exp | null;
  profile_image_url?: String_comparison_exp | null;
  username?: String_comparison_exp | null;
  website?: String_comparison_exp | null;
  websites?: websites_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "websites". All fields are combined with a logical 'AND'.
 */
export interface websites_bool_exp {
  _and?: (websites_bool_exp | null)[] | null;
  _not?: websites_bool_exp | null;
  _or?: (websites_bool_exp | null)[] | null;
  description?: String_comparison_exp | null;
  github_user?: github_users_bool_exp | null;
  github_username?: String_comparison_exp | null;
  hn_stories?: hn_stories_bool_exp | null;
  title?: String_comparison_exp | null;
  twitter_user?: twitter_users_bool_exp | null;
  twitter_username?: String_comparison_exp | null;
  url?: String_comparison_exp | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
