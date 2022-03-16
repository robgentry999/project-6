const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const btnReset = document.querySelector('.btn__reset');
const phraselist = document.getElementById('phrase');
const scoreboard = document.getElementById("scoreboard");
const heart = document.querySelectorAll(".tries img");
const overlay = document.getElementById("overlay");


//Use to keep track of the number of guesses
let missed = 0;

//Declare and initalize the phrases array storing at least five strings that contain only letters and spaces, no puncuation
const phrases = [
    "Out My Way",
    "Ring Ring",
    "Feeling", 
    "Sometimes",
    "The Bees Knees",
];

//Hide start button when the user clicks
btnReset.addEventListener('click', e => {
 overlay.style.display = "none";
});



function getRandomPhraseAsArray(arr) {
// Gives a random phrase to be selected
    const random =  Math.floor(Math.random() * arr.length);
    const randomphrase = arr[random].toLowerCase();
    const spiltphrase = randomphrase.split('');

    return spiltphrase;
}


let randomphrase = getRandomPhraseAsArray(phrases);

///////////////////////////////////////////////////////////////////////////

function addPhraseToDisplay(arr) {
 for( let i = 0; i < arr.length; i ++) {

///Create an addPhraseToDisplay function that loops through an array of characters. 
////You will need to write it so that it can take an array of letters and create a li item.

   const li = document.createElement('li');

/////put the character inside the list item.

   li.textContent = arr[i];

   //Apend that list item to the #phrase ul in your HTML
    phraselist.appendChild(li);

////if the character in the array is a letter and not a space, the function should add the class "letter" to the li
////If not, add the ''space'' class.

    if (arr[i] === " "){
        li.classList.add("space");
    } else {
        li.classList.add("letter");
    }

///To use the function, you'll get the value returned by the
//getRandomPhraseAsArray, save it to a variable, and pass it to addPhraseToDisplay as an argument

 }
};

addPhraseToDisplay(randomphrase);


 

function checkLetter(button) {
    const li = document.querySelectorAll('li');
    let match = null;

    for( let i = 0; i < li.length; i++ ){
    ///Loop through all of the li elements. Remember: arrays start with the index of 0.

//Create a conditional that compares the text of the button parameter to the text
//of the li at the current index
          if (button.innerText === li[i].innerText){
              li[i].classList.add("show");
              match = button.innerText;
          
          }
    }
    return match;
}

qwerty.addEventListener("click", (e) => {
let button = e.target;

//Use a conditional to filter out clicks that don't happen on the buttons or if the button already has the "chosen" class 
 if (button.tagName === "BUTTON" || button.className ==="chosen") {
     const button = e.target;

 //Add the "chosen" class to the button that was pressed.
  button.classList.add("chosen");
  button.disabled = true;

  //Call the checkletter function and store the results in the variable.
  let result = checkLetter(button);

  //If the checkLetter function does not find a letter, remove one of the heart images and increment the missed counter
 if(result === null) {
     const down = document.querySelectorAll(".tries img")[missed];
     down.src='images/lostHeart.png';
     missed++
 }
 CheckWin()
 }

})

// check if the user has won
function CheckWin() {
const letter = document.getElementsByClassName("letter");
const show = document.getElementsByClassName("show");
let title = document.querySelector(".title");

if(letter.length === show.length) {

overlay.classList.add("win");
title.innerText= "Winner";
overlay.style.display = "flex";
}
//Check if the missed counter is greater than 4. If they are, display the lose overlay
if(missed > 4 ) {
    overlay.classList.add('lose');
    title.innerHTML = "Loser";
    overlay.style.display = "flex";
}

}