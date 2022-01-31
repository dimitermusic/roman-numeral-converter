const romNumObj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
}

const romanNumConvert = (str) => {

    // Define variable that will accumulate Roman Numerals
    let sum = 0

    // Check for invalid characters and return message if any
    let invalidChars = str.split("").filter(char => !(char in romNumObj))
    if (invalidChars.length > 0) {
        console.log("Must contain only valid Roman Numeral characters (e.g. I, V, X, L, C, D, M)")
        return
    }

    // Return numeric value of single character Roman Numeral
    if (str.length === 1) return romNumObj[str];

    // If more than a single character, loop over string to accumulate value
    for (let i = 0; i < str.length; i++) {

        // Define two pointers
        let currChar = str[i]
        let nextChar = str[i + 1]

        // Use pointers to check if value to the right is greater and subtract current value if so
        if (romNumObj[currChar] < romNumObj[nextChar]) {
            sum += (romNumObj[nextChar] - romNumObj[currChar]);
            // Skip over this next value since already accounted for
            i++
            // If value to the right is greater, accumulate normally
        } else if (romNumObj[currChar] > romNumObj[nextChar]) {
            sum += romNumObj[currChar]
        }

    }

    // Return final sum of string of Roman Numerals
    return sum

}

console.log(romanNumConvert("XIV"))
