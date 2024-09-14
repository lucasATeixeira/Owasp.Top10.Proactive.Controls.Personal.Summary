import { DB } from './types';
// @ts-expect-error this lib is not typed
import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

const dialect = new SqliteDialect({
  database: new SQLite('src/db/database.db'),
});

export const db = new Kysely<DB>({
  dialect,
});
