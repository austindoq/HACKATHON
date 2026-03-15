// placeholder
// let sortedArray = ['border-teal-700', 'bg-blue-50', 'flex', 'flex-row', 'hello', 'world']

function rewriteElement(sortedArray) {
  let sortedString = "";
  for (const item of sortedArray) {
    sortedString += " " + item;
  }
  return sortedString;
}

export { rewriteElement };

// console.log(rewriteElement(sortedArray))
