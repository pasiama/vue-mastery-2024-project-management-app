-- -- Drop table if it already exists
-- DROP TABLE IF EXISTS tasks;



-- -- Tasks Table
-- CREATE TABLE tasks (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
--     project_id BIGINT NOT NULL REFERENCES projects (id) default null,
--     collaborators text array default array[]::varchar[] not null,
--      name TEXT NOT NULL,
--     description TEXT not null,
--     status CURRENT_STATUS DEFAULT 'in-progress' NOT NULL,
--     due_date TIMESTAMP DEFAULT NULL,
--     created_at TIMESTAMP DEFAULT NOW() NOT NULL,
-- );
DROP TABLE IF EXISTS tasks;

-- Define Task Status ENUM
-- DROP TYPE IF EXISTS TASK_STATUS;
-- CREATE TYPE TASK_STATUS AS ENUM ('todo', 'in-progress', 'completed', 'cancelled');

-- Create the tasks table
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status CURRENT_STATUS DEFAULT 'in-progress' NOT NULL,
    priority TEXT DEFAULT 'medium' NOT NULL,
    due_date TIMESTAMP DEFAULT NULL,
    collaborators TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
