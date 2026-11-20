BEGIN;

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) CHECK (type IN ('opensource', 'school')),
  technologies TEXT[],
  link VARCHAR(500)
);

LOCK TABLE projects IN EXCLUSIVE MODE;

INSERT INTO projects (title, description, type, technologies, link)
SELECT title, description, type, technologies, link
FROM (VALUES
  ('My First Open Source Contribution', 'A bug fix contributed to a popular library.',
   'opensource', ARRAY['TypeScript', 'React'], NULL::VARCHAR(500)),
  ('Database Design Final Project', 'An ER diagram and normalized library database schema.',
   'school', ARRAY['PostgreSQL', 'SQL'], NULL::VARCHAR(500)),
  ('Portfolio Site', 'Personal portfolio built with Next.js and Tailwind.',
   'school', ARRAY['Next.js', 'TypeScript', 'Tailwind'], NULL::VARCHAR(500))
) AS seed(title, description, type, technologies, link)
WHERE NOT EXISTS (SELECT 1 FROM projects);

COMMIT;
