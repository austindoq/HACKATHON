import tailwindClassList from "./tailwind-classes.json" with { type: "json" }; //Import Tailwind class list - save to variable tailwindClassList

//This function takes a list of user Tailwind classes as strings, and creates a new JS Object containing an element's Tailwind classes categorized
// against the Tailwind category master list.

const userClasses = ["flex-row", "pt-4", "mt-2", "mb-4", "pb-3", "flex", "h-4"];

function tailwindClassBuilder(userClasses, tailwindClassList) {
  let categoriezedClasses = {};

  console.log(Object.keys(tailwindClassList));

  for (const userClass of userClasses) {
    console.log(userClass);
    for (const category in tailwindClassList) {
      if (tailwindClassList[category].include(userClass)) {
        console.log(`The class ${userClass} is in the master list.`);
      } else {
        console.log(`The class ${userClass} is not a tailwind class.`);
      }
    }
  }

  for (const category in tailwindClassList) {
    console.log(tailwindClassList[category]);
  }
}

tailwindClassBuilder(userClasses, tailwindClassList);
