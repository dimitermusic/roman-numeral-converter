const convertBtn = document.querySelector("#convertBtn");
const ansEl = document.querySelector("#answer");
const romNumObj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100,
    d: 500,
    m: 1000,
}

// Convert string of valid Roman Numeral characters into integer.
function romanNumConvert(str) {

    // Define variable that will accumulate Roman Numerals
    let sum = 0

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

        } else if (romNumObj[currChar] >= romNumObj[nextChar]) {

            // If value to the right is greater, accumulate normally
            sum += romNumObj[currChar]

        } else

            // Add the last character of the string to the sum
            sum += romNumObj[currChar]

    }

    // Return final sum of string of Roman Numerals
    return sum

}

// Take user input, check if valid, plug into conversion function, render results to DOM.
function handleConversionDisplay(e) {

    // preventDefault to prevent page from refreshing when button is clicked
    e.preventDefault();

    const userInput = document.querySelector("#userInput").value;

    // Check for invalid characters and return message if any
    let invalidChars = userInput.split("").filter(char => !(char in romNumObj));

    if (invalidChars.length > 0 || userInput === "") {

        alert("Must contain only valid Roman Numeral characters (e.g. I, V, X, L, C, D, M)");
        location.reload(true);

    } else {
        // If valid characters, convert using function and display to DOM
        ansEl.textContent = `${romanNumConvert(userInput)}`;
        // console.log(`Roman Numeral ${userInput} equals ${romanNumConvert(userInput)}`);
    }
}

// Method that runs dynamic rendering function when button is clicked.
convertBtn.addEventListener("click", handleConversionDisplay);