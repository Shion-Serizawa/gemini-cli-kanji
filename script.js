const KANJI_PAIRS = [
    { correct: '未', similar: '末' },
    { correct: '使', similar: '便' },
    { correct: '日', similar: '曰' },
    { correct: '頂', similar: '項' },
    { correct: '雪', similar: '雷' }
];

let currentLevel = 0;
let startTime;
let timerInterval;

const questionKanjiElement = document.getElementById('question-kanji');
const gameFieldElement = document.getElementById('game-field');
const timerElement = document.getElementById('timer');
const resultScreenElement = document.getElementById('result-screen');
const finalTimeElement = document.getElementById('final-time');
const restartButton = document.getElementById('restart-button');

function startGame() {
    currentLevel = 0;
    resultScreenElement.classList.add('hidden');
    startLevel();
    startTimer();
}

function startLevel() {
    if (currentLevel >= KANJI_PAIRS.length) {
        endGame();
        return;
    }

    const currentPair = KANJI_PAIRS[currentLevel];
    questionKanjiElement.textContent = currentPair.correct;

    const numKanji = 10 + currentLevel * 10;
    const fontSize = 30 - currentLevel * 4;

    gameFieldElement.innerHTML = '';
    const kanjiArray = Array(numKanji - 1).fill(currentPair.similar);
    kanjiArray.push(currentPair.correct);

    // Shuffle the array
    for (let i = kanjiArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [kanjiArray[i], kanjiArray[j]] = [kanjiArray[j], kanjiArray[i]];
    }

    kanjiArray.forEach(kanji => {
        const kanjiSpan = document.createElement('span');
        kanjiSpan.textContent = kanji;
        kanjiSpan.style.fontSize = `${fontSize}px`;
        kanjiSpan.classList.add('kanji');
        kanjiSpan.addEventListener('click', () => {
            if (kanji === currentPair.correct) {
                currentLevel++;
                startLevel();
            }
        });
        gameFieldElement.appendChild(kanjiSpan);
    });
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        timerElement.textContent = `タイム: ${elapsedTime.toFixed(2)}`;
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function endGame() {
    stopTimer();
    const elapsedTime = (Date.now() - startTime) / 1000;
    finalTimeElement.textContent = elapsedTime.toFixed(2);
    resultScreenElement.classList.remove('hidden');
}

restartButton.addEventListener('click', startGame);

startGame();