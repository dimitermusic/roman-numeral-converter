const darkModeSwitch = document.querySelector("#dark-mode")
const convertBtn = document.querySelector("#convertBtn");
const ansEl = document.querySelector("#answer");
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

            // If value to the right is greater or at the end of array, accumulate normally
        } else if ((romNumObj[currChar] >= romNumObj[nextChar]) || (!(romNumObj[nextChar]))) {

            sum += romNumObj[currChar]

        }

    }

    // Return final sum of string of Roman Numerals
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

    // preventDefault to prevent page from refreshing when button is clicked
    e.preventDefault();

    // Select user input from text box on page
    const userInput = document.querySelector("#userInput").value.toUpperCase();
    // Check for invalid characters and return message if any then refresh page
    let invalidChars = userInput.split("").filter(char => !(char in romNumObj));

    if (invalidChars.length > 0 || userInput === "") {
        modal.style.display = "flex";

    } else {
        // If valid characters, convert using function and display to DOM
        ansEl.textContent = `${romanNumConvert(userInput)}`;
        console.log(`Roman Numeral ${userInput} equals ${romanNumConvert(userInput)}`);
    }


}

// Change page to dark mode with html switch.
const handleDarkModeSwitch = () => {

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

    // Time conversion from 24hr to 12hr format
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let modifier = ""
    let darkModeOnOff = ""

    if (darkModeSwitch.checked) {
        darkModeOnOff = "on"
    } else {
        darkModeOnOff = "off"
    }

    if (hour > 12) {
        hour -= 12
        modifier = "PM"
    } else if (hour === 12) {
        modifier = "PM"
    } else {
        modifier = "AM"
    }

    console.log(`Dark mode is currently ${darkModeOnOff} because it is ${hour}:${minutes}${modifier} and is automatically scheduled between 8pm and 7am`);

    // Dark mode
    if (hour > 19 && hour < 7) {
        darkModeSwitch.checked = true
        handleDarkModeSwitch();
    }

}

// Call function expressions and listen for events.
convertBtn.addEventListener("click", handleConversionDisplay);
darkModeSwitch.addEventListener("change", handleDarkModeSwitch);
handleDarkModeAuto();
handleCloseModal();