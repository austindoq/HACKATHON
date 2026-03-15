// removed: import { createRequire } from "module";
import { readData } from "./formSubmit.js";

// removed: createRequire and JSSoup setup

// removed: getFileContents() - not needed, readData() handles file input

function writeNewFile(soup) {
  try {
    fs.writeFileSync("dummy-new.html", soup);
  } catch (error) {
    console.log(`${error}`);
  }
}

function createSoup(fileContents) {
  const parser = new DOMParser();
  return parser.parseFromString(fileContents, "text/html");
}

function createClassList(classes) {
  return classes.split(" ");
}

function iterateElements(soup) {
  let currentElement = soup.body.firstElementChild; // replaced: soup.find("body")
  let currentElementClasses;
  let categorizedClasses;
  let sortedClassList;
  let sortedClassString;

  // MOCK OBJECT
  let userOrderPreference = [
    "border color",
    "colors",
    "flex",
    "paddings",
    "text color",
  ];

  while (currentElement !== null) {
    if (currentElement.nodeType === Node.TEXT_NODE) {
      // replaced: currentElement._text
      currentElement = currentElement.nextElementSibling;
      continue;
    }
    if (currentElement.className) {
      // replaced: currentElement.attrs.class
      currentElementClasses = createClassList(currentElement.className);
      console.log(currentElementClasses);
      // tailwindClassBuilder
      // sortTailwindClasses
      // rewriteElement
      // rewriteHTMLFile
      currentElement.attrs.class = sortedClassString;
    }

    if (currentElement.nextElementSibling) {
      // replaced: currentElement.nextElement
      let parent = currentElement.parentElement;
      while (parent && !currentElement.nextElementSibling) {
        currentElement = parent.nextElementSibling;
        parent = parent.parentElement;
      }
    }

    currentElement = currentElement.nextElementSibling; // replaced: currentElement.nextElement
  }

  let final = "<!doctype html>" + soup.prettify().slice(22);
  writeNewFile(final);
}

//This function takes the user input file and converts it to a string.

// function htmlString() {
//   return new Promise((resolve) => {
//     const userFileInput = document.getElementById("userFileInput");

//     userFileInput.addEventListener("change", async (event) => {
//       const htmlFile = event.target.files[0];
//       const readObj = new FileReader();
//       readObj.readAsText(htmlFile);
//       readObj.onload = (e) => {
//         resolve(e.target.result);
//       };
//     });
//   });
// }

async function main() {
  // const fileContents = getFileContents();
  const htmlContent = await readData();
  const soup = createSoup(htmlContent);
  console.log(soup);
  iterateElements(soup);
}

main();
