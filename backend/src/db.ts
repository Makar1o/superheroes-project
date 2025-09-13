import { Low, JSONFile } from "lowdb";
import { join } from "path";
import { Superhero } from "./types";

type Data = {
  heroes: Superhero[];
};

const file = join(__dirname, "..", "data", "db.json");
const adapter = new JSONFile<Data>(file);
const db = new Low(adapter);

export async function initDB() {
  await db.read();
  db.data ||= { heroes: [] };
  await db.write();
}

export default db;
