CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS projects_title_trgm_idx
ON projects USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS projects_description_trgm_idx
ON projects USING gin ((COALESCE(description, '')) gin_trgm_ops);
