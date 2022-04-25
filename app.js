// PASSWORD GENERATOR

// Characters Generator Functions

// Function that accepts a string value as an argument and return a random index number from the string argument
    function randomIndex(str) {
    return Math.floor(Math.random() * str.length);
}

// Example of the randomIndex function
    console.log(randomIndex(`Chicken`)); // numbers seen (0 through 6). since chicken has 7 letters.

// Function that returns a random lowercase using a random index in the "letters" string 
    function getRandomLower(){
    const letters = `abcdefghijklmnopqrstuvwxyz`;
// Returning a random letter using a random index in the "letters" string
    return letters[randomIndex(letters)];
}

// DEFINITELY NEED MORE PRACTICE ON THESE FUNCTIONS

// Example of the getRandomLower function
    console.log(getRandomLower()); 

// Function that returns a random uppercase letter 
    function getRandomUpper(){
// running the getRandomLower function to create a random lowercase letter and setting that value to the "letter" variable
    const letter = getRandomLower();
// Changing the random lowercase letter to an uppercase letter and returning it from the functions
    return letter.toUpperCase();
}

// Example of getRandomUpper function
// console.log(getRandomUpper()); random uppercase letter is

// Function that returns a random number (AKA Random number as a string value)
    function getRandomNumber(){
    const numbers = `1234567890`;
// Returning a random number using a random index from the "numbers" string
    return numbers[randomIndex(numbers)];
}


// Example of the getRandomNumber function
    console.log(getRandomNumber()); // Random number from the "numbers" string

// Function that returns a random symbol
    function getRandomSymbol(){
    const symbol = `!@#$%^&*(){}[]=<>/,.`;
// Returning a random symbol  using a random index from the "symbols string "
    return symbol[randomIndex(symbol)];
}

// Example of the getRandomSymbol function
    console.log(getRandomSymbol());

// Object to store all the characters generator functions
    const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Selecting the DOM Elements
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);

// Generate Password function (Function that accepts true or false values as well as a number as an argument)
// NOTE: The checkbox inputs and number (AKA Length) input will determine the values/arguments enters into this function
    function generatedPassword( lower, upper, number, symbol, length ){
    console.log( lower, upper, symbol, length );
    
// 1.CREATE THE PASSWORD VARIABLE
    let generatedPassword = ``;

// 2 FILTER OUT UNCHECKED OPTIONS
// True or False values can be added together (True is equal to 1 & False is equal to 0)
// NOTE: The Values set to the typesCount variable will be used when building out the password
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);

    // If the user has NOT selected any of the four options, then the alert will be displayed and an empty string will be returned from the function so the password displays to the user will be empty string (AKA Nothing)
    if (typesCount === 0) {
    alert(`Please select ar least one option`);
        // The RETURN keyword stops/ends the execution of a function (AKA Does NOT run any of the lines of the code that follow the return in the function) 
    return ``;
}

// Creating an array of arrays . THe first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions object. Also, the second items in each nested array are of the values passed into this generatePassword function

    let typesArr = [
        [`lower`, lower],
        [`upper`, upper],
        [`number`, number],
        [`symbol`, symbol],
];
    console.log(typesArr);

// The filter method creates a new array with all the items that "pass the test" implemented by the provided function (AKA All the items that cause the function to return a boolean value of true when the function is run using the item as the argument for the item parameter in this example)
// Checking if the value for index of 1 in each item (AKA Array) in the the  typesArr Array is true or false. Also, removing the item from the typesArr array if it it false.
    typesArr = typesArr.filter(item => {
    console.log(item[1]);
    return item[1];
});
    console.log(typesArr);

// 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHEEKED OPTION
// Building password with a for loop
// NOTE: The value for "length is the value entered/selected for the length number input"
    for (i =0; i < length; i += typesCount){
        // One of the items in the updated/filtered version of the typesArr array will be the value/argument passed in for the types parameter each time the anonymous arrow function is run
        typesArr.forEach(type => {
            const funcName = type[0];
            console.log(funcName);
            // Accessing and running/executing a function in the randomFunctions object. Also, concatenating/adding the value returned from the accessed function to the generatePassword string variable
            generatedPassword += randomFunctions[funcName]();
        console.log(generatedPassword);
    });
}
    
// 4. ADD GENERATED PASSWORD TO THE FINAL PASSWORD VARIABLE AND RETURN IT OUT OF THE FUNCTION
// Removing extra characters if necessary (The above loop will create a password that may NOT match the length selected if that length is NOT a multiple of the number of options/checkboxes selected)
    const finalPassword = generatedPassword.slice(0, length);
    console.log(finalPassword);

    return finalPassword;
}


// Example of the generatedPassword function
// NOTE: Using the starting values for when the page first loads
    // console.log(generatePassword(true, true, true, true, 10));

    // Event Listener for when the "Generate Password" button is clicked
    generateEl.addEventListener(`click`, () => {
        // Checking if the following options/checkboxes are selected /checked and the true,false values to the respective variables
        const hasLower = lowercaseEl.checked;
        const hasUpper = uppercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;

        // Accessing the value for the number input and changing the value from a string to a numbers
        // NOTE: The value returned from a number input is a string value
        const length = parseInt(lengthEl.value);

        console.log(hasLower, hasUpper, hasNumber, hasSymbol, length);

        // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number inputs arguments and returns a string (AKA The password) which is set as the innerText value for the "result" (AKA Span) element
        resultEl.innerText = generatedPassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// COPY PASSWORD 
clipboardEl.addEventListener(`click`, () => {
    // Accessing the text.string value (AKA the password) for the "result span and setting it in the "password" variable
    const password = resultEl.innerText;

    // If the user clicks the clipboard button while no password is displayed, then an alert will be displayed to the user and function will end and nothing will; be copied to the clipboard element
    if(password === ` `){
        alert (`Please generate a password first.`);
        return;
        
        // Referencing the "navigator" object to copy the selected value to the clipboard on the device the webpage is being viewed on
        navigator.clipboard.writeText(password);
    }
    }
);


