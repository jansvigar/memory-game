import "../css/style.css";

const board = document.querySelector(".board");
board.addEventListener("click", flipCard);

function flipCard(event) {
    if(event.target.nodeName === 'DIV') {
        event.target.parentElement.classList.add("flipped");
    }
}
