CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('me', 'github.com/eliastoukolehto', 'github');

INSERT INTO blogs (author, url, title) VALUES ('me', 'github.com/eliastoukolehto/fullStackPart13', 'this repo');