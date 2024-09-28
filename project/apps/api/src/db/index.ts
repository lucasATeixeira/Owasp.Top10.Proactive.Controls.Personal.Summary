import { DB } from './types';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DATABASE_DB || 'owasp',
    password: process.env.DATABASE_PASSWORD || 'admin',
    user: process.env.DATABASE_USER || 'admin',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT || '5432'),
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
