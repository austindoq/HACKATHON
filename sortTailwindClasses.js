// let userClassObject = {
//   "border color": "Border-teal-700",
//   flex: "flex flex-row",
//   others: "hello world",
//   colors: "bg-blue-50",
// };

// let userOrderPreference = ["border color", "colors", "flex"];

function sortTailwindClasses(userClassObj, userOrderPref) {
  let sortedOrderList = [];

  for (const item of userOrderPref) {
    if (item in userClassObj) {
      if (item in userClassObj) {
        for (const value of userClassObj[item]) {
          sortedOrderList.push(value);
        }
      }
    }
  }
  for (const item in userClassObj) {
    if (item == "other") {
      for (const value of userClassObj[item]) {
        sortedOrderList.push(value);
      }
    }
  }

  return sortedOrderList;
}

// console.log(sortTailwindClasses(userClassObject, userOrderPreference));
export { sortTailwindClasses };
