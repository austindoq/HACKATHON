let userClassObject = {
  "border color": "Border-teal-700",
  flex: "flex flex-row",
  others: "hello world",
  colors: "bg-blue-50",
  
};

let userOrderPreference = ["border color", "colors", "flex"];

function sortTailwindClasses(userClassObj, useOrderPref) {
  let sortedOrderList = [];

  for (const key of userOrderPreference) {
    if (key in userClassObj) {
      let isolatedValues = userClassObject[key].split(" ");
      for (const value of isolatedValues) {
        sortedOrderList.push(value);
      }
    }
  }

  //
  for (const key in userClassObj) {
    if (key == "others") {
      let isolatedValues = userClassObject[key].split(" ");
      for (const value of isolatedValues) {
        sortedOrderList.push(value);
      }
    }
  }
  //

  return sortedOrderList;
}

console.log(sortTailwindClasses(userClassObject, userOrderPreference));
