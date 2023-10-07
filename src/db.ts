import { drizzle, BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { users, InsertUser, User } from "../schemas/user";
import { Database } from "bun:sqlite";

const __dirname = import.meta.dir + "/../";

const sqlite = new Database(__dirname + "/sqlite.db");
const db: BunSQLiteDatabase = drizzle(sqlite);

migrate(db, { migrationsFolder: __dirname + "/drizzle" });

export const insertUser = (user: InsertUser) => {
  return db.insert(users).values(user).returning();
};

export const readUser = () => {
  const result: User[] = db.select().from(users).all();
  return result;
};
