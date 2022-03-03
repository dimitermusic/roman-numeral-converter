const darkModeSwitch = document.getElementById("dark-mode")
const convertBtn = document.getElementById("convertBtn");
const ansEl = document.getElementById("answer");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
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

    // Return numeric value of single character Roman Numeral.
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

// Close model by clickng on button or outside of modal.
const handleCloseModal = () => {

    closeModal.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

}

// Take user input, check if valid, plug into conversion function, render results to DOM.
const handleConversionDisplay = (e) => {

    // preventDefault() to prevent page from refreshing when button is clicked.
    e.preventDefault();

    // Select user input from text box on page.
    const userInput = document.querySelector("#userInput").value.toUpperCase();
    // Check for invalid characters and return message if any then refresh page.
    let invalidChars = userInput.split("").filter(char => !(char in romNumObj));

    if (invalidChars.length > 0 || userInput === "") {
        modal.style.display = "flex";

    } else {
        // If valid characters, convert using function and display to DOM.
        ansEl.textContent = `${romanNumConvert(userInput)}`;
        console.log(`Roman Numeral ${userInput} equals ${romanNumConvert(userInput)}`);
    }


}

// Change page to dark mode with html switch.
const handleDarkModeSwitch = () => {

    // Select elements from DOM.
    const body = document.getElementById("body");
    const jumbotron = document.getElementById("jumbotron");
    const slider = document.getElementById("slider");
    const main = document.getElementById("main");
    const button = document.getElementById("convertBtn");
    const userInput = document.getElementById("userInput");
    const answer = document.getElementById("answer");
    const footer = document.getElementById("footer");
    const icon = document.getElementById("icon");
    const modalContent = document.getElementById("modal-content")

    if (darkModeSwitch.checked) {

        console.log("dark mode on");

        // Add dark mode classes when switched on.
        body.classList.add("dark-mode-body")
        jumbotron.classList.add("dark-mode-jumbotron");
        slider.classList.add("dark-mode-slider");
        main.classList.add("dark-mode-main");
        button.classList.add("dark-mode-btn");
        userInput.classList.add("dark-mode-userInput");
        answer.classList.add("dark-mode-answer");
        footer.classList.add("dark-mode-footer");
        icon.classList.add("dark-mode-icon");
        modalContent.classList.add("dark-mode-modal-content")
        closeModal.classList.add("dark-mode-btn")
    }

    if (!(darkModeSwitch.checked)) {

        console.log("dark mode off");

        // Remove dark mode classes when switched off.
        body.classList.remove("dark-mode-body")
        jumbotron.classList.remove("dark-mode-jumbotron");
        slider.classList.remove("dark-mode-slider");
        main.classList.remove("dark-mode-main");
        button.classList.remove("dark-mode-btn");
        userInput.classList.remove("dark-mode-userInput");
        answer.classList.remove("dark-mode-answer");
        footer.classList.remove("dark-mode-footer");
        icon.classList.remove("dark-mode-icon");
        modalContent.classList.remove("dark-mode-modal-content")
        closeModal.classList.remove("dark-mode-btn")
    }

}

// If it is between 8pm and 7am local time, automatically switch on Dark Mode at page load.
const handleDarkModeAuto = () => {

    // Set range of hours to include in dark mode logic.
    let darkPmHours = [8, 9, 10, 11]
    let darkAmHours = [12, 1, 2, 3, 4, 5, 6]
    // Current time.
    let hour = new Date().getHours();
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

    // Adding 0 to beginning of single digit minutes.
    if (minutes.toString().length === 1) {
        minutes = `0${minutes}`
    }

    console.log(typeof minutes);

    // Dark mode automatically turns on based on set schedule.
    if ((darkPmHours.includes(hour) && modifier === "PM") || (darkAmHours.includes(hour) && modifier === "AM")) {
        darkModeSwitch.checked = true
        handleDarkModeSwitch();
    } else {
        darkModeSwitch.checked = false
        handleDarkModeSwitch();
    }

    // Ternary operator to dynamically display if dark mode is on or off.
    (darkModeSwitch.checked ? darkModeOnOff = "on" : darkModeOnOff = "off")

    console.log(`Dark Mode is currently ${darkModeOnOff} because the time is ${hour}:${minutes}${modifier}, and it is automatically scheduled to be on between 8pm and 7am`)

}

// Call function expressions and listen for events.
convertBtn.addEventListener("click", handleConversionDisplay);
darkModeSwitch.addEventListener("change", handleDarkModeSwitch);
handleDarkModeAuto();
handleCloseModal();