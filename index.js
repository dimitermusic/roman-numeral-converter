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
}

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
            // If value to the right is greater, accumulate normally
        } else if (romNumObj[currChar] > romNumObj[nextChar]) {
            sum += romNumObj[currChar]
        }
    }

    // Return final sum of string of Roman Numerals
    return sum

}

// preventDefault to prevent page from refreshing when button is clicked
// Taking in user input from html page, plugging that into our multiplication function, and dynamically rendering the answer to the page.
function handleConversionDisplay(e) {

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
        console.log(`Roman Numeral ${userInput} equals ${romanNumConvert(userInput)}`);
    }
}

// Method that runs dynamic rendering function when button is clicked.
convertBtn.addEventListener("click", handleConversionDisplay);
