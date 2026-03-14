import tailwindClassList from "./tailwind-classes.json" with { type: "json" }; //Import Tailwind class list - save to variable tailwindClassList

//This function takes a list of user Tailwind classes as strings, and creates a new JS Object containing an element's Tailwind classes categorized
// against the Tailwind category master list.

const userClasses = ["flex-row", "pt-4", "mt-2", "mb-4", "pb-3", "flex", "h-4"];
const tempUserClasses = [
  "flex-row",
  "pt-4",
  "mt-2",
  "mb-4",
  "pb-3",
  "flex",
  "h-4",
];

function tailwindClassBuilder(userClasses, tailwindClassList) {
  let categorizedClasses = {};

  console.log(Object.keys(tailwindClassList));

  for (const userClass of userClasses) {
    console.log(userClass);
    for (const category in tailwindClassList) {
      if (tailwindClassList[category].includes(userClass)) {
        console.log(`The class ${userClass} is in the master list.`);

        if (category in categorizedClasses) {
          categorizedClasses[category].push(userClass);
          let classIndex = tempUserClasses.indexOf(userClass);
          tempUserClasses.pop(classIndex);
          // tempUserClasses.remove(userClass);
        } else {
          categorizedClasses[category] = [userClass];
          let classIndex = tempUserClasses.indexOf(userClass);
          tempUserClasses.pop(classIndex);
        }
      }
    }

    // for (const category in tailwindClassList) {
    //   if (tailwindClassList[category].includes(userClass)) {
    //     console.log(`The class ${userClass} is in the master list.`);

    //     if (category in categorizedClasses) {
    //       categorizedClasses[category].push(userClass);
    //     } else {
    //       categorizedClasses[category] = [userClass];
    //     }
    //   }
    // }
  }
  console.log(tempUserClasses);

  // for (const category in tailwindClassList) {
  //   console.log(tailwindClassList[category]);
  // }
}

tailwindClassBuilder(userClasses, tailwindClassList);
