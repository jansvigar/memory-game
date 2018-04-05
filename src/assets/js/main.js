import Animation from "./animation";
import Game from "./Game";
import "../css/style.css";

const game = new Game();
game.shuffleCards();
game.start();