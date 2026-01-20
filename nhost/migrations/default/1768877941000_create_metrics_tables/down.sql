-- Drop views first (they depend on tables)
DROP VIEW IF EXISTS latest_project_metrics;
DROP VIEW IF EXISTS latest_account_metrics;

-- Drop tables (order matters due to FK constraints)
DROP TABLE IF EXISTS project_snapshots;
DROP TABLE IF EXISTS account_snapshots;
DROP TABLE IF EXISTS projects;
