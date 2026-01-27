// ==============================
// DATA (arrays)
// ==============================
// Lesstof: ARRAYS & OBJECTEN (Les 2 / Les 3)
// Bron (NL/EN):
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
//
// We gebruiken hier een array met objecten.
// Elk object bevat een land (string) en een afbeelding (url).

const flags = [
  { country: "Indonesië", url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg" },
  { country: "Monaco", url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg" },
  { country: "Japan", url: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg" },
  { country: "Italië", url: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg" },
  { country: "Frankrijk", url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg" },
  { country: "Duitsland", url: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" },
  { country: "België", url: "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg" },
  { country: "Nederland", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg" }
];

// ==============================
// VARIABELEN
// ==============================
// Lesstof: VARIABELEN met let / const (Les 2)
// Bron:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types

let index = 0;   // Houdt bij welke vlag aan de beurt is
let score = 0;   // Houdt de score van de speler bij

// ==============================
// HTML ELEMENTEN (DOM)
// ==============================
// Lesstof: DOM manipulatie (Les 3)
// Bron:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById

const flagImg = document.getElementById("flag");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

// ==============================
// GELUIDEN (Audio)
// ==============================
// Extra functionaliteit, maar nog steeds basis JavaScript
// Lesstof-uitbreiding (past binnen niveau Les 3)
// Bron:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
// https://www.geeksforgeeks.org/javascript/javascript-play-a-mp3-file-in-js/

const correctSound = new Audio("Geluidjes/goed.mp3");   // Geluid bij goed antwoord
const wrongSound   = new Audio("Geluidjes/fout.mp3");   // Geluid bij fout antwoord
const scoreSound   = new Audio("Geluidjes/outro.mp3");  // Muziek bij eindscore

// ==============================
// FUNCTIES
// ==============================
// Lesstof: FUNCTIES (Les 2 / Les 3)
// Bron:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

function showFlag() {
  feedback.textContent = "";       // Feedback leegmaken
  choices.innerHTML = "";          // Oude knoppen verwijderen
  nextBtn.style.display = "none";  // Volgende knop verbergen

  const juisteVlag = flags[index]; // Huidige vlag uit de array halen
  flagImg.src = juisteVlag.url;    // Afbeelding tonen

  let antwoorden = [juisteVlag.country]; // Array met juiste antwoord

  // Lesstof: WHILE loop + Math.random (Les 3)
  // Bron:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

  while (antwoorden.length < 4) {
    const randomLand =
      flags[Math.floor(Math.random() * flags.length)].country;

    if (!antwoorden.includes(randomLand)) {
      antwoorden.push(randomLand);
    }
  }

  // Antwoorden husselen (basis random sort)
  antwoorden.sort(() => Math.random() - 0.5);

  // Lesstof: forEach (Les 3)
  // Bron:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  antwoorden.forEach(function (antwoord) {
    const button = document.createElement("button");
    button.textContent = antwoord;

    // Lesstof: EVENTS met onclick (Les 3)
    // Bron:
    // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick

    button.onclick = function () {
      checkAnswer(antwoord, juisteVlag.country);
      disableButtons();
      nextBtn.style.display = "inline-block";
    };

    choices.appendChild(button);
  });
}

// Controleert of het antwoord juist is
function checkAnswer(gekozenAntwoord, juisteAntwoord) {
  // Lesstof: IF / ELSE (Les 2)
  // Bron:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else

  if (gekozenAntwoord === juisteAntwoord) {
    feedback.textContent = "✅ Goed!";

    // Audio afspelen bij gebruikersactie
    // Bron:
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play

    correctSound.currentTime = 0;
    correctSound.play();

    score++;
    scoreDisplay.textContent = "Score: " + score;
  } else {
    feedback.textContent =
      "❌ Fout! Het juiste antwoord is " + juisteAntwoord;

    wrongSound.currentTime = 0;
    wrongSound.play();
  }
}

// Zet alle knoppen uit na één klik
function disableButtons() {
  const buttons = choices.querySelectorAll("button");

  buttons.forEach(function (btn) {
    btn.disabled = true;
  });
}

// ==============================
// EVENTS
// ==============================
// Lesstof: EVENTS & CONDITIES (Les 3)

nextBtn.onclick = function () {
  index++;

  if (index < flags.length) {
    showFlag();
  } else {
    feedback.textContent =
      "🎉 Je hebt het spel voltooid! Je eindscore is " +
      score +
      "/" +
      flags.length;

    // Eindmuziek afspelen bij score-scherm
    scoreSound.currentTime = 0;
    scoreSound.play();

    choices.innerHTML = "";
    nextBtn.style.display = "none";
    flagImg.style.display = "none";
  }
};

// ==============================
// START SPEL
// ==============================
// Lesstof: FUNCTIE AANROEPEN (Les 2)

showFlag();