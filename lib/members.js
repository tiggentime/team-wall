import fs from "node:fs";
import path from "node:path";

const MEMBERS_DIR = path.join(process.cwd(), "data", "members");
const SHOUTOUTS_FILE = path.join(process.cwd(), "data", "shoutouts.txt");

// Reads every data/members/*.json file and returns them as an array.
export function getMembers() {
  return fs
    .readdirSync(MEMBERS_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(MEMBERS_DIR, file), "utf8");
      return { ...JSON.parse(raw), file };
    });
}

// Reads data/shoutouts.txt — one shoutout per line.
export function getShoutouts() {
  const raw = fs.readFileSync(SHOUTOUTS_FILE, "utf8");
  return raw.split("\n").filter((line) => line.trim() !== "");
}
