function elementClassCollector(textToParse) {
    
textToParse = "<div class='mx-py delay-75 bg-fixed'>"

    const new_list = []

    let match = textToParse
    new_list.push(match)

    return new_list
}

console.log(elementClassCollector())