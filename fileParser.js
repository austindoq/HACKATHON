import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const JSSoup = require("jssoup").default;

function getFileContents() {
  try {
    const fileContents = fs.readFileSync("dummy.html", "utf8");
    return fileContents;
  } catch (error) {
    console.log(`${error}`);
  }
}

function createSoup(fileContents) {
  const soup = new JSSoup(fileContents);
  return soup;
}

function createClassList(classes) {
  return classes.split(" ")
}

function main() {
  const fileContents = getFileContents();
  const soup = createSoup(fileContents);
  const header = soup.find("header");
  const classes = header.attrs.class;
  const classList = createClassList(classes)
  console.log(classList);
}

main();
