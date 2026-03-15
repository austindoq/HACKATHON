// removed: import { createRequire } from "module";
import { readData } from "./formSubmit.js";
import { tailwindClassBuilder } from "./tailwindClassBuilder.js";
import tailwindClassList from "./tailwind-classes.json" with { type: "json" };
import { sortTailwindClasses } from "./sortTailwindClasses.js";
import { rewriteElement } from "./rewriteElement.js";

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
  // console.log(parser.parseFromString(fileContents, "text/html"));
  return parser.parseFromString(fileContents, "text/html");
}

function createClassList(classes) {
  return classes.split(" ");
}

function iterateElements(soup) {
  let currentElementClasses;
  let categorizedClasses;
  let sortedClassList;
  let sortedClassString;
  let currentElement = soup.body.firstElementChild; // replaced: soup.find("body")
  // console.log(currentElement); //Element GOOD

  // MOCK
  // let userOrderPref = [
  //   "border color",
  //   "colors",
  //   "flex",
  //   "paddings",
  //   "text color",
  // ];

  const userOrderPref = JSON.parse(localStorage.getItem("userCategoryOrder"));

  while (currentElement !== null) {
    if (currentElement.nodeType === Node.TEXT_NODE) {
      // replaced: currentElement._text
      currentElement = currentElement.nextElementSibling;

      continue;
    }
    if (currentElement.className) {
      // replaced: currentElement.attrs.class
      currentElementClasses = createClassList(currentElement.className);

      // console.log(currentElementClasses);
      categorizedClasses = tailwindClassBuilder(
        currentElementClasses,
        tailwindClassList,
      );
      sortedClassList = sortTailwindClasses(categorizedClasses, userOrderPref);
      sortedClassString = rewriteElement(sortedClassList);
      currentElement.className = sortedClassString;
      console.log(sortedClassString);
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
    // console.log(currentElement);
  }

  let final = "<!doctype html>" + document.documentElement.innerHTML;
  // console.log(final);
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
  // console.log(htmlContent);
  const soup = createSoup(htmlContent);
  // console.log(soup);
  iterateElements(soup);
}

main();
