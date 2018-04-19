import Animation from "./animation";
import Game from "./Game";
import "../css/style.css";

// game.start();
document.querySelector(".btn-start").addEventListener("click", handleStart);
document.querySelector(".form-container").addEventListener("submit", (e) => e.preventDefault());

function handleStart() { 
    const player = document.querySelector(".input-name").value || "Unknown";
    const game = new Game(player);
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".board-container").style.display = "flex";
    
    game.start();
}

