import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Client } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "Missing DATABASE_URL. Set it to your Supabase project's Postgres connection string " +
      "(Project Settings -> Database -> Connection string -> URI) before running this script."
  );
  process.exit(1);
}

const sqlPath = path.join(__dirname, "..", "supabase", "schema.sql");
const sql = readFileSync(sqlPath, "utf8");

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  console.log(`Connected. Running ${path.relative(process.cwd(), sqlPath)} ...`);
  await client.query(sql);
  console.log("Done. Schema and seed data applied (idempotent, safe to re-run).");
} catch (error) {
  console.error("Failed to apply schema.sql:", error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
