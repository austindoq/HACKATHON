import tailwindClassList from "./tailwind-classes.json" with { type: "json" }; //Import Tailwind class list - save to variable tailwindClassList

//This function takes a list of user Tailwind classes as strings, and creates a new JS Object containing an element's Tailwind classes categorized
// against the Tailwind category master list. Able to handle duplicate classes.

const userClasses = [
  "flex-row",
  "pt-4",
  "mt-2",
  "mb-4",
  "mb-4",
  "pb-3",
  "flex",
  "h-4",
  "hello",
  "world",
];

function tailwindClassBuilder(userClasses, tailwindClassList) {
  let categorizedClasses = {};

  for (const userClass of userClasses) {
    //Loop for each user class in their element.
    let found = false;

    for (const category in tailwindClassList) {
      //Loop checking if each category contains the current loop's class
      if (tailwindClassList[category].includes(userClass)) {
        found = true;

        if (category in categorizedClasses) {
          // If found in a category push to a object
          categorizedClasses[category].push(userClass);
        } else {
          categorizedClasses[category] = [userClass];
        }
      }
    }

    if (!found) {
      // If current loop's class isn't found after checking all categories, add to other's key in object.
      if (categorizedClasses["other"]) {
        categorizedClasses["other"].push(userClass);
      } else {
        categorizedClasses["other"] = [userClass];
      }
    }
  }

  for (const category in categorizedClasses) {
    // Handle duplicated classes in the object
    let dedupedArray = Array.from(new Set(categorizedClasses[category]));
    categorizedClasses[category] = dedupedArray;
  }

  // console.log(categorizedClasses);
  return categorizedClasses;
}

console.log(tailwindClassBuilder(userClasses, tailwindClassList));
