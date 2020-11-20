ALTER TABLE IF EXISTS ONLY public.websites DROP CONSTRAINT IF EXISTS websites_twitter_user_fkey;
ALTER TABLE IF EXISTS ONLY public.websites DROP CONSTRAINT IF EXISTS websites_github_username_fkey;
ALTER TABLE IF EXISTS ONLY public.hn_stories DROP CONSTRAINT IF EXISTS hn_stories_website_url_fkey;
ALTER TABLE IF EXISTS ONLY public.hn_stories DROP CONSTRAINT IF EXISTS hn_stories_username_fkey;
ALTER TABLE IF EXISTS ONLY public.websites DROP CONSTRAINT IF EXISTS websites_pkey;
ALTER TABLE IF EXISTS ONLY public.twitter_users DROP CONSTRAINT IF EXISTS twitter_users_pkey;
ALTER TABLE IF EXISTS ONLY public.hn_users DROP CONSTRAINT IF EXISTS hn_users_pkey;
ALTER TABLE IF EXISTS ONLY public.hn_stories DROP CONSTRAINT IF EXISTS hn_stories_pkey;
ALTER TABLE IF EXISTS ONLY public.github_users DROP CONSTRAINT IF EXISTS github_users_pkey;
DROP TABLE IF EXISTS public.websites;
DROP TABLE IF EXISTS public.twitter_users;
DROP TABLE IF EXISTS public.hn_users;
DROP TABLE IF EXISTS public.hn_stories;
DROP TABLE IF EXISTS public.github_users;
CREATE TABLE public.github_users (
    username text NOT NULL,
    name text,
    website text,
    nb_followers numeric NOT NULL,
    twitter_username text,
    location text,
    email text,
    profile_image_url text
);
CREATE TABLE public.hn_stories (
    id integer NOT NULL,
    title text NOT NULL,
    date timestamp with time zone NOT NULL,
    score numeric NOT NULL,
    hn_username text,
    website_url text
);
CREATE TABLE public.hn_users (
    username text NOT NULL,
    karma numeric NOT NULL
);
CREATE TABLE public.twitter_users (
    username text NOT NULL,
    name text,
    website text,
    nb_followers numeric NOT NULL,
    location text,
    profile_image_url text
);
CREATE TABLE public.websites (
    url text NOT NULL,
    title text,
    description text,
    twitter_username text,
    github_username text
);
ALTER TABLE ONLY public.github_users
    ADD CONSTRAINT github_users_pkey PRIMARY KEY (username);
ALTER TABLE ONLY public.hn_stories
    ADD CONSTRAINT hn_stories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.hn_users
    ADD CONSTRAINT hn_users_pkey PRIMARY KEY (username);
ALTER TABLE ONLY public.twitter_users
    ADD CONSTRAINT twitter_users_pkey PRIMARY KEY (username);
ALTER TABLE ONLY public.websites
    ADD CONSTRAINT websites_pkey PRIMARY KEY (url);
ALTER TABLE ONLY public.hn_stories
    ADD CONSTRAINT hn_stories_username_fkey FOREIGN KEY (hn_username) REFERENCES public.hn_users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.hn_stories
    ADD CONSTRAINT hn_stories_website_url_fkey FOREIGN KEY (website_url) REFERENCES public.websites(url) ON UPDATE CASCADE ON DELETE SET DEFAULT;
ALTER TABLE ONLY public.websites
    ADD CONSTRAINT websites_github_username_fkey FOREIGN KEY (github_username) REFERENCES public.github_users(username) ON UPDATE CASCADE ON DELETE SET DEFAULT;
ALTER TABLE ONLY public.websites
    ADD CONSTRAINT websites_twitter_user_fkey FOREIGN KEY (twitter_username) REFERENCES public.twitter_users(username) ON UPDATE CASCADE ON DELETE SET DEFAULT;
