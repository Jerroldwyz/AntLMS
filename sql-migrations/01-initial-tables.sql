-- Create tables
CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255),
  contact_details json
  -- Other fields and constraints can be added here
);

CREATE TABLE courses (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  enabled boolean DEFAULT true,
  thumbnail varchar(255),
  creator_id integer REFERENCES users(id)
  -- Other fields and constraints can be added here
);

CREATE TABLE tags (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL
  -- Other fields and constraints can be added here
);

CREATE TABLE courses_tags (
  id serial PRIMARY KEY,
  course_id integer REFERENCES courses(id),
  tag_id integer REFERENCES tags(id),
  UNIQUE (course_id, tag_id)
);

CREATE TABLE topics (
  id serial PRIMARY KEY,
  course_id integer REFERENCES courses(id),
  title varchar(255) NOT NULL
  -- Other fields and constraints can be added here
);

CREATE TABLE content (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  type content_type NOT NULL,
  content text,
  topic_id integer REFERENCES topics(id),
  topic_position integer
  -- Other fields and constraints can be added here
);

CREATE TABLE quizzes (
  id serial PRIMARY KEY,
  topic_id integer REFERENCES topics(id),
  title varchar(255) NOT NULL,
  topic_position integer
  -- Other fields and constraints can be added here
);

CREATE TABLE questions (
  id serial PRIMARY KEY,
  quiz_id integer REFERENCES quizzes(id),
  question_text text NOT NULL,
  explanation text
  -- Other fields and constraints can be added here
);

CREATE TABLE choices (
  id serial PRIMARY KEY,
  question_id integer REFERENCES questions(id),
  choice_text text NOT NULL,
  is_correct boolean DEFAULT false
  -- Other fields and constraints can be added here
);

CREATE TABLE enrollments (
  id serial PRIMARY KEY,
  user_id integer REFERENCES users(id),
  course_id integer REFERENCES courses(id)
  -- Other fields and constraints can be added here
);

-- Create content_type enum type
CREATE TYPE content_type AS ENUM ('TEXT', 'VIDEO');

