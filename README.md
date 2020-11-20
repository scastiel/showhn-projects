# Show HN projects

A webapp to browse projects posted on
[Show HN](https://news.ycombinator.com/show). The application is available at
[showhn-dashboard.netlify.app](https://showhn-dashboard.netlify.app/), but you
can also run it locally or on your own server if you want to. Note that you will
need a Twitter and GitHub APIs access.

The project is composed of:

- A backend containing a PostgreSQL database and a GraphQL API. It is handled by
  [Nhost](https://nhost.io/), which uses [Hasura](https://hasura.io/).
- A Node.js application to scrap the projects (using HN, Twitter and GitHub APIs
  and some web scraping). The application provides serverless functions and CLI
  tools.
- A React web application that connects to the GraphQL API to display the
  projects.

## Running the backend

### Option 1: Nhost account

Create a project on [Nhost](https://nhost.io/) (they offer a 30-days free
trial), and note:

- the GraphQL API and backend URLs (on the Dashboard tab)
- the admin secret (on the Hasura tab)

Copy the _.env.example_ file to create _.env_, and replace the values in there.

### Option 2: local Docker container

Copy the _.env.example_ file to create _.env_, and replace the values in there.
The default URLs (Nhost section) should be the right ones for your local
installation.

Run `yarn docker:start` (it will use Docker-compose) to run the PostgreSQL
database and Hasura GraphQL server locally.

The NHost console will be available at http://localhost:8080, the secret is the
value of `HASURA_GRAPHQL_ADMIN_SECRET` in your _.env_ file.

### Final steps

- Connect to the NHost console
- Import the PostgreSQL dump in _hasura_pg_dump.sql_ (_Data_ tab, then _SQL_ in
  the sidebar, copy-paste the file content)
- Import the Hasura metatata in _hasura_metadata.json_ (settings icon at
  top-right, then _Import metadata_)

## Running the frontend

Run `yarn web:run:dev`.

## Running the scrapper

In the _scraper_ directory (`cd scraper`):

- `yarn run:dev src/cli/newest-scraper.ts`: scraps the latest Show HN stories,
  i.e. the ones you can see on HN in the _Show_ section.
- `yarn run:dev src/cli/update-stories-score.ts`: updates all the stories score
  by refetching it from the HN API.
- `yarn run:dev src/cli/rescrap.ts`: updates all stories existing in the
  database by rescraping them (useful in case the scraper was updated).

## Work in progress 🏗

As you can see this README is very minimal. There is a lot of information to put
in there. Don’t hesitate to ask me any information you need, while I’m working
on improving this documentation.
