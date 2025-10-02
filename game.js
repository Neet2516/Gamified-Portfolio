let currentScore = parseInt(localStorage.getItem("currentscore"))||0;
let currentLevel = 1;
let currentWordIndex = 0;

const words = [
    { word: "CAT", hint: "A small furry animal that meows", missing: 1 },
    { word: "DOG", hint: "Man's best friend", missing: 1 },
    { word: "SUN", hint: "The bright star in our sky", missing: 1 },
    { word: "BOOK", hint: "You read this", missing: 2 },
    { word: "TREE", hint: "Tall plant with branches", missing: 1 },
    { word: "WATER", hint: "Clear liquid you drink", missing: 2 },
    { word: "HOUSE", hint: "A place where people live", missing: 1 },
    { word: "PHONE", hint: "Device for calling people", missing: 1 },
    { word: "SCHOOL", hint: "Place where children learn", missing: 2 },
    { word: "FLOWER", hint: "Beautiful plant that blooms", missing: 2 },
    { word: "COMPUTER", hint: "Electronic device for work", missing: 2 },
    { word: "ELEPHANT", hint: "Large animal with a trunk", missing: 2 },
    { word: "BUTTERFLY", hint: "Colorful flying insect", missing: 3 },
    { word: "ADVENTURE", hint: "Exciting journey or experience", missing: 3 },
    { word: "CHOCOLATE", hint: "Sweet brown treat", missing: 3 }
];

function displayWord() {
    const currentWord = words[currentWordIndex];
    let displayWord = currentWord.word;
    let missingIndices = [];

    // Create array of indices to hide
    for (let i = 0; i < currentWord.missing; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * displayWord.length);
        } while (missingIndices.includes(randomIndex));
        missingIndices.push(randomIndex);
    }

    // Replace letters with underscores
    let wordArray = displayWord.split('');
    missingIndices.forEach(index => {
        wordArray[index] = '_';
    });

    document.getElementById('wordDisplay').textContent = wordArray.join('');
    document.getElementById('hint').textContent = currentWord.hint;
    document.getElementById('letterInput').value = '';
    document.getElementById('letterInput').focus();

    // Store missing indices for checking
    currentWord.missingIndices = missingIndices;
}

function checkAnswer() {
    const input = document.getElementById('letterInput').value.toUpperCase();
    const feedback = document.getElementById('feedback');

    if (!input) {
        feedback.textContent = "Please enter a letter!";
        feedback.className = "feedback incorrect";
        return;
    }

    const currentWord = words[currentWordIndex];
    let correct = false;

    // Check if the input letter belongs to any missing position
    for (let index of currentWord.missingIndices) {
        if (currentWord.word[index] === input) {
            correct = true;
            break;
        }
    }

    if (correct) {
        currentScore += 10;
        feedback.textContent = "Correct! +10 points";
        feedback.className = "feedback correct";

        setTimeout(() => {
            nextWord();
        }, 500);
    } else {
        currentScore = Math.max(0, currentScore - 2);
        feedback.textContent = "Incorrect! -2 points";
        feedback.className = "feedback incorrect";

        setTimeout(() => {
            document.getElementById('letterInput').value = '';
            document.getElementById('letterInput').focus();
        }, 1000);
    }

    updateScore();
}

var navneet = 12;



function skipWord() {
    currentScore = Math.max(0, currentScore - 5);
    document.getElementById('feedback').textContent = "Word skipped! -5 points";
    document.getElementById('feedback').className = "feedback incorrect";

    setTimeout(() => {
        nextWord();
    }, 1500);

    updateScore();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    if (currentWordIndex === 0) {
        currentLevel++;
    }

    displayWord();
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';

    updateLevel();
}

function updateScore() {
    document.getElementById('score').textContent = currentScore;
    updateProgressBar();

    if (currentScore >= 5) {
        showNextPage();
    }
}

function updateLevel() {
    document.getElementById('level').textContent = currentLevel;
}

function updateProgressBar() {
    const progress = Math.min(currentScore, 100);
    document.getElementById('progressFill').style.width = progress + '%';
}

function showNextPage() {
    // Simulate redirect after 3 seconds (you can change this URL)
    setTimeout(() => {
        localStorage.setItem("currentScore","100");
        window.location.href = "about.html"
    }, 1000);
}

// Event listeners
document.getElementById('letterInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Initialize game
displayWord();
updateScore();