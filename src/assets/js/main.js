import Animation from "./animation";
import Game from "./Game";
import "../css/style.css";

// game.start();
document.querySelector(".btn-start").addEventListener("click", handleStart);
document.querySelector(".form-container").addEventListener("submit", (e) => e.preventDefault());
document.querySelector(".btn-leaderboard").addEventListener("click", handleViewLeaderboard);

function handleStart() { 
    const player = document.querySelector(".input-name").value || "Unknown";
    const game = new Game(player);
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".board-container").style.display = "flex";
    
    game.start();
}

function handleViewLeaderboard() {
    updateLeaderboard();
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".leaderboard-container").style.display = "block";
    document.querySelector(".btn-back").addEventListener("click", handleBackToGame);
}

function handleBackToGame() {
    document.querySelector(".form-container").style.display = "block";
    document.querySelector(".leaderboard-container").style.display = "none";
}

function updateLeaderboard() {
    const tbody = document.querySelector(".leaderboard tbody");
    tbody.innerHTML = '';
    const playerScores = JSON.parse(localStorage.getItem("MEMORY_GAME_SCORE")) || [];
    playerScores.sort(function(a, b){
        if(a.moves < b.moves) return -1;
        if(a.moves > b.moves) return 1;
        if(a.seconds < b.seconds) return -1;
        if(a.seconds > b.seconds) return 1;
        return 0;
    })
    console.log(playerScores);
    const fragment = document.createDocumentFragment();
    playerScores.forEach((score, index) => {
        const tr = document.createElement("tr"),
            positionTD = document.createElement("td"),
            playerTD = document.createElement("td"),
            ratingTD = document.createElement("td"),
            movesTD = document.createElement("td"),
            timeTD = document.createElement("td");
        
        positionTD.textContent = index + 1;
        playerTD.textContent = score.player;
        ratingTD.textContent = score.rating;
        movesTD.textContent = score.moves;
        timeTD.textContent = formatTime(score.seconds);

        tr.appendChild(positionTD);
        tr.appendChild(playerTD);
        tr.appendChild(ratingTD);
        tr.appendChild(movesTD);
        tr.appendChild(timeTD);

        fragment.appendChild(tr);
    });

    document.querySelector(".leaderboard tbody").appendChild(fragment);
}

function formatTime(seconds) {
    let minutesTxt, secondsTxt;

    minutesTxt = Math.floor(seconds/60);
    if(minutesTxt > 99) return '99:99';
    secondsTxt = seconds % 60;

    minutesTxt = minutesTxt <= 10 ? '0' + minutesTxt : minutesTxt.toString();
    secondsTxt = secondsTxt <= 10 ? '0' + secondsTxt : secondsTxt.toString();

    return minutesTxt + ':' + secondsTxt;
}

