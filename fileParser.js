import { readData } from "./formSubmit.js";
import { tailwindClassBuilder } from "./tailwindClassBuilder.js";
import tailwindClassList from "./tailwind-classes.json" with { type: "json" };
import { sortTailwindClasses } from "./sortTailwindClasses.js";
import { rewriteElement } from "./rewriteElement.js";

function createSoup(fileContents) {
  const parser = new DOMParser();
  return parser.parseFromString(fileContents, "text/html");
}

function createClassList(classes) {
  return classes.trim().split(/\s+/);
}

function iterateElements(soup) {
  const userOrderPref =
    JSON.parse(localStorage.getItem("userCategoryOrder")) || [];

  const allElements = soup.body.querySelectorAll("*");

  allElements.forEach((element) => {
    if (element.className && typeof element.className === "string") {
      const currentElementClasses = createClassList(element.className);

      const categorizedClasses = tailwindClassBuilder(
        currentElementClasses,
        tailwindClassList
      );

      const sortedClassList = sortTailwindClasses(
        categorizedClasses,
        userOrderPref
      );

      const sortedClassString = rewriteElement(sortedClassList);

      element.className = sortedClassString;
    }
  });

  return "<!doctype html>\n" + soup.documentElement.outerHTML;
}

function downloadFile(content, filename = "updated.html") {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

async function main() {
  const htmlContent = await readData();
  const soup = createSoup(htmlContent);
  const finalDocument = iterateElements(soup);

  console.log(finalDocument);
  downloadFile(finalDocument);
}

main();