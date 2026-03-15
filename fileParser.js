import fs from "fs";
import { createRequire } from "module";
import { tailwindClassBuilder } from "./tailwindClassBuilder.js";
import { sortTailwindClasses } from "./sortTailwindClasses.js";
import tailwindClassList from "./tailwind-classes.json" with { type: "json" };

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
  return classes.split(" ");
}

function iterateElements(soup) {
  let currentElement = soup.find("body");
  let currentElementClasses;
  let categorizedClasses;
  let sortedClassList;

  // MOCK OBJECT
  let userOrderPreference = ["border color", "colors", "flex", "paddings"];

  while (currentElement !== null) {
    if (currentElement._text) {
      currentElement = currentElement.nextElement;
      continue;
    }
    if (currentElement.attrs.class) {
      currentElementClasses = createClassList(currentElement.attrs.class);
      console.log(`currentElementClasses: ${currentElementClasses}`);

      categorizedClasses = tailwindClassBuilder(
        currentElementClasses,
        tailwindClassList,
      );
      console.log(`categorizedClasses: ${JSON.stringify(categorizedClasses)}`);

      sortedClassList = sortTailwindClasses(
        categorizedClasses,
        userOrderPreference,
      );
      console.log(`sortedClassList: ${sortedClassList}`);
      // rewriteElement
      // rewriteHTMLFile
    }

    if (currentElement.nextElement) {
      let parent = currentElement.parentElement;
      while (parent && !currentElement.nextElement) {
        currentElement = parent.nextElementSibling;
        parent = parent.parentElement;
      }
    }

    currentElement = currentElement.nextElement;
  }
}

function main() {
  const fileContents = getFileContents();
  const soup = createSoup(fileContents);
  iterateElements(soup);
  // const elements = soup.nextElements();
  // console.log(elements);
}

main();
