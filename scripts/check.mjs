// Validates every data/members/*.json file.
// Run locally with `npm run check`. CI runs it on every pull request.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "data", "members");
const required = ["name", "github", "role", "color", "emoji", "funFact"];
let errors = 0;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const fail = (msg) => {
    console.error(`✗ ${file}: ${msg}`);
    errors++;
  };

  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  } catch (e) {
    fail(`is not valid JSON (${e.message})`);
    continue;
  }

  for (const key of required) {
    if (typeof data[key] !== "string" || data[key].trim() === "") {
      fail(`"${key}" is missing or empty`);
    }
  }
  if (data.color && !/^#[0-9a-fA-F]{6}$/.test(data.color)) {
    fail(`"color" must look like #3a7bd5, got "${data.color}"`);
  }
  if (data.github && file !== `${data.github.toLowerCase()}.json`) {
    fail(`file should be named ${data.github.toLowerCase()}.json`);
  }
}

if (errors) {
  console.error(`\n${errors} problem(s) found.`);
  process.exit(1);
}
console.log("✓ All member files look good.");
