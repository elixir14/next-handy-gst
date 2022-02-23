\c next-handy-gst
CREATE SCHEMA IF NOT EXISTS :v1 AUTHORIZATION postgres;
SET search_path = :v1;

\i renderer/prisma/init/migration.sql;
\i renderer/prisma/states.sql
\i renderer/prisma/cities.sql

--Add default user
INSERT INTO "User"(username, first_name, last_name,phone, email, code, type, password, updated_at)VALUES ('admin','admin','admin','1234567890','admin@admin.com','25','administrator','$2a$12$8DhyGUPa1YYWMxVeyGN/6e2uB2iYRJlaWsKpqSurfXfw5xck2NQRy',now());
