document.addEventListener("DOMContentLoaded", () => {
    createTiles();

    // let fs = require('fs');
    // let content = fs.readFileSync('words.txt', 'utf8');
    // let words = content.split(/\r?\n/);
    // let word = words[Math.floor(Math.random() * (words.length - 1))];
    
    let guessedWordsArr = [[]];
    let nextTile = 1;
    let word = "dairy";
    let guessedWordCount  = 0;
    
    const keys = document.querySelectorAll('.keyboard-row button');
    
    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
    
            if (letter === 'enter') {
                handleSubmitWord();
                return;
            }
    
            if (letter === 'del') {
                handleDeleteLetter();
                return;
            }
            
            updateGuessedWords(letter);
        };
    };

    function createTiles() {
        const gameBoard = document.getElementById("board");
        
        for (let i = 0; i < 30; i++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.classList.add("animate__animated"); //Allows element to be animated
            tile.setAttribute("id", i + 1);
            gameBoard.appendChild(tile);
        };
    };

    function handleSubmitWord() {
        const currentWordArr = getCurrentWord();
        if (currentWordArr.length !== 5) {
            window.alert("Not enough letters");
            return;
        };

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1;
        const delay = 400;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, delay * index);
        });

        guessedWordCount++;

        if (currentWord === word) {
            setTimeout(() => {
                window.alert(`Congratulations!`);
            }, delay * 5);
        };

        if (guessedWordsArr.length === 6) {
            setTimeout(() => {
                window.alert(`Sorry, you have no more guesses! The word is "${word}".`);
            }, delay * 5);
            return;
        };

        guessedWordsArr.push([]);
    };
    
    function handleDeleteLetter() {
        if (nextTile <= guessedWordsArr.length * 5) {
            return;
        };

        const currentWordArr = getCurrentWord();
        const removedLetter = currentWordArr.pop();

        guessedWordsArr[guessedWordsArr.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(nextTile - 1));

        lastLetterEl.textContent = '';
        nextTile--;
    };

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWord();
        
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);
            
            const nextTileEl = document.getElementById(nextTile);
            
            nextTile++;
            nextTileEl.textContent = letter;
        }
    };

    function getCurrentWord() {
        const numberOfGuessedWords = guessedWordsArr.length;
        return guessedWordsArr[numberOfGuessedWords - 1];
    }
    
    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)"; // Gray
        };

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)"; // Green
        };

        return "rgb(181, 159, 59)"; // Yellow
    }
});