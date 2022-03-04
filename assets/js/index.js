// Select elements from DOM.
const darkModeSwitch = document.getElementById("dark-mode")
const convertBtn = document.getElementById("convertBtn");
const ansEl = document.getElementById("answer");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
// Define roman numeral dictionary.
const romNumObj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
}

// Convert string of valid Roman Numeral characters into integer.
const romanNumConvert = (str) => {

    // Define variable that will accumulate Roman Numerals.
    let sum = 0

    // Return if single character.
    if (str.length === 1) return romNumObj[str];

    // If more than a single character, loop over string to accumulate value.
    for (let i = 0; i < str.length; i++) {

        // Define two pointers
        let currChar = str[i]
        let nextChar = str[i + 1]

        // Use pointers to check if value to the right is greater and subtract current value if so.
        if (romNumObj[currChar] < romNumObj[nextChar]) {

            sum += (romNumObj[nextChar] - romNumObj[currChar]);
            // Skip over this next value since already accounted for.
            i++

            // If value to the right is greater or at the end of array, accumulate normally.
        } else if ((romNumObj[currChar] >= romNumObj[nextChar]) || (!(romNumObj[nextChar]))) {

            sum += romNumObj[currChar]

        }

    }

    // Return final sum of string of Roman Numerals.
    return sum

}

// Take user input, check if valid, plug into conversion function, render results to DOM.
const handleConversionDisplay = (e) => {

    // preventDefault() to prevent page from refreshing when button is clicked.
    e.preventDefault();

    // Select user input from text box on page and change to uppercase.
    const textArea = document.getElementById("text-area")
    const userInput = document.getElementById("text-area").value.toUpperCase();
    // Define array with any invalid characters from input.
    let invalidChars = userInput.split("").filter(char => !(char in romNumObj));

    // If any invalid characters, display custom modal, else use conversion function to dynamically display result.
    if (invalidChars.length > 0 || userInput === "") {

        modal.style.display = "flex";
        closeModal.focus()

    } else {

        ansEl.textContent = `${romanNumConvert(userInput)}`;
        console.log(`Roman Numeral ${userInput} equals ${romanNumConvert(userInput)}`);

    }

    // Close model by clickng on button or outside of modal.
    const handleCloseModal = () => {

        closeModal.onclick = () => {
            modal.style.display = "none";
            textArea.focus()
        }

        window.onclick = (e) => {
            if (e.target == modal) {
                modal.style.display = "none";
                textArea.focus()
            }
        }

        window.onkeypress = (e) => {
            if (e.key === "Enter") {
                closeModal.click();
                textArea.focus()
            }
        }

    }

    handleCloseModal();

}

// Change page styling between light and dark mode based on state of switch.
const handleDarkModeStyle = () => {

    const body = document.getElementById("body");
    const jumbotron = document.getElementById("jumbotron");
    const slider = document.getElementById("slider");
    const main = document.getElementById("main");
    const button = document.getElementById("convertBtn");
    const textArea = document.getElementById("text-area");
    const answer = document.getElementById("answer");
    const footer = document.getElementById("footer");
    const icon = document.getElementById("icon");
    const modalContent = document.getElementById("modal-content")

    if (darkModeSwitch.checked) {

        console.log("Dark mode on.");

        // Add dark mode classes when switched on.
        body.classList.add("dark-mode-body")
        jumbotron.classList.add("dark-mode-jumbotron");
        slider.classList.add("dark-mode-slider");
        main.classList.add("dark-mode-main");
        button.classList.add("dark-mode-btn");
        textArea.classList.add("dark-mode-text-area");
        answer.classList.add("dark-mode-answer");
        footer.classList.add("dark-mode-footer");
        icon.classList.add("dark-mode-icon");
        modalContent.classList.add("dark-mode-modal-content")
        closeModal.classList.add("dark-mode-btn")
    }

    if (!(darkModeSwitch.checked)) {

        console.log("Dark mode off.");

        // Remove dark mode classes when switched off.
        body.classList.remove("dark-mode-body")
        jumbotron.classList.remove("dark-mode-jumbotron");
        slider.classList.remove("dark-mode-slider");
        main.classList.remove("dark-mode-main");
        button.classList.remove("dark-mode-btn");
        textArea.classList.remove("dark-mode-text-area");
        answer.classList.remove("dark-mode-answer");
        footer.classList.remove("dark-mode-footer");
        icon.classList.remove("dark-mode-icon");
        modalContent.classList.remove("dark-mode-modal-content")
        closeModal.classList.remove("dark-mode-btn")
    }

}

// If it is between 8pm and 7am local time, automatically switch on dark mode at page load.
const handleDarkModeAuto = () => {

    // Current time.
    let hour = new Date().getHours();

    // Dark mode automatically turns on based on set schedule.
    if (hour > 6 && hour < 20) {

        darkModeSwitch.checked = false
        handleDarkModeStyle();

    } else {

        darkModeSwitch.checked = true
        handleDarkModeStyle();

    }

    // Convert time from 24hr to 12hr format and display dynamic message to console log
    const handleTimeConversion = () => {
        let minutes = new Date().getMinutes();
        let modifier = ""
        let darkModeOnOff = ""

        // Time conversion from 24hr to 12hr format.
        if (hour > 12) {
            hour -= 12
            modifier = "PM"
        } else if (hour === 00) {
            hour += 12
            modifier = "AM"
        } else if (hour === 12) {
            modifier = "PM"
        } else {
            modifier = "AM"
        }

        // Ternary operator to dynamically display if dark mode is on or off.
        (darkModeSwitch.checked ? darkModeOnOff = "on" : darkModeOnOff = "off")

        // Adding 0 to beginning of single digit minutes.
        if (minutes.toString().length === 1) {
            minutes = `0${minutes}`
        }

        console.log(`Dark Mode is currently ${darkModeOnOff} because the time is ${hour}:${minutes}${modifier}, and it is automatically scheduled to be on between 8pm and 7am`)

    }

    handleTimeConversion();

}

// Call function expressions and listen for events.
handleDarkModeAuto();
darkModeSwitch.addEventListener("change", handleDarkModeStyle);
convertBtn.addEventListener("click", handleConversionDisplay);