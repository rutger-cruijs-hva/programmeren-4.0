// ==============================
// DATA (arrays)
// ==============================

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
  
  let index = 0;
  let score = 0;
  
  // ==============================
  // HTML ELEMENTEN
  // ==============================
  
  const flagImg = document.getElementById("flag");
  const choices = document.getElementById("choices");
  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score");
  const nextBtn = document.getElementById("next-btn");
  
  // ==============================
  // GELUIDEN
  // ==============================
  
  // Kort geluid bij goed antwoord
  const correctSound = new Audio("/Users/rutgercruijs/Desktop/rutgers-vlaggenquiz/Geluidjes/goed.mp3");
  
  // Kort geluid bij fout antwoord
  const wrongSound = new Audio("/Users/rutgercruijs/Desktop/rutgers-vlaggenquiz/Geluidjes/fout.mp3");
  
  // Langer liedje bij eindscore
  const scoreSound = new Audio("/Users/rutgercruijs/Desktop/rutgers-vlaggenquiz/Geluidjes/outro.mp3");
  
  // ==============================
  // FUNCTIES
  // ==============================
  
  function showFlag() {
    feedback.textContent = "";
    choices.innerHTML = "";
    nextBtn.style.display = "none";
  
    const juisteVlag = flags[index];
    flagImg.src = juisteVlag.url;
  
    let antwoorden = [juisteVlag.country];
  
    while (antwoorden.length < 4) {
      const randomLand =
        flags[Math.floor(Math.random() * flags.length)].country;
  
      if (!antwoorden.includes(randomLand)) {
        antwoorden.push(randomLand);
      }
    }
  
    antwoorden.sort(() => Math.random() - 0.5);
  
    antwoorden.forEach(function (antwoord) {
      const button = document.createElement("button");
      button.textContent = antwoord;
  
      button.onclick = function () {
        checkAnswer(antwoord, juisteVlag.country);
        disableButtons();
        nextBtn.style.display = "inline-block";
      };
  
      choices.appendChild(button);
    });
  }
  
  function checkAnswer(gekozenAntwoord, juisteAntwoord) {
    if (gekozenAntwoord === juisteAntwoord) {
      feedback.textContent = "✅ Goed!";
  
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
  
  function disableButtons() {
    const buttons = choices.querySelectorAll("button");
  
    buttons.forEach(function (btn) {
      btn.disabled = true;
    });
  }
  
  // ==============================
  // EVENTS
  // ==============================
  
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
  
      // Start het score-liedje
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
  
  showFlag();