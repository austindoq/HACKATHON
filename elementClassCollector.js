import tailwindClassList from "./tailwind-classes.json" with { type: "json"}

console.log(tailwindClassList)

let textToParse = "<div class='mx-py delay-75 bg-fixed'>"
console.log(textToParse)
// const flatList = Object.values(tailwindClassList).flat()

function elementClassCollector(textToParse) {
    let start = textToParse.split("class='")[1].split(' ').split("'")[0]
}

console.log(elementClassCollector(textToParse))

// let classObjects = {
//     border: "bg-fixed",
//     delay: "delay-75",
//     blockelement: "mx-py"
// }

// function elementClassCollector(textToParse) {

//     textToParse = "<div class='mx-py delay-75 bg-fixed>"

//     const new_list = []

//     let match = textToParse
//     new_list.push(match)

//     return new_list
    

//     const objects = ""

//     let isTailwind = classObjects
// }

// console.log(elementClassCollector())

// take the list from the function and figure out if there is any Tailwind class or not and return True if there is any Tailwind class