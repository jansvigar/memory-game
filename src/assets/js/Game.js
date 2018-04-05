import Animation from './animation';

class Game {
  constructor() {
    this.cards = [
      { name: "a", imgURL: "" },
      { name: "b", imgURL: "" },
      { name: "c", imgURL: "" },
      { name: "d", imgURL: "" },
      { name: "e", imgURL: "" },
      { name: "f", imgURL: "" },
      { name: "g", imgURL: "" },
      { name: "h", imgURL: "" },
      { name: "a", imgURL: "" },
      { name: "b", imgURL: "" },
      { name: "c", imgURL: "" },
      { name: "d", imgURL: "" },
      { name: "e", imgURL: "" },
      { name: "f", imgURL: "" },
      { name: "g", imgURL: "" },
      { name: "h", imgURL: "" }
    ];
    this.flippedCards = [];
  }

  /** Fisher-Yates Shuffling Algorithm */
  /** https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976 */
  shuffleCards() {
    let currentIndex = this.cards.length - 1,
      temp,
      randomIndex;

    /** While there are still unrandomized cards */
    while (currentIndex >= 0) {
      /** Select random card from the remaining cards */
      randomIndex = Math.floor(Math.random() * currentIndex);

      /** Swap current card with the random selected card */
      temp = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;

      /** Update the current card position */
      currentIndex--;
    }

    return this.cards;
  }

  /** Method to start the game */
  start() {
    const boardElement = document.querySelector(".board");
    
    _loadCardsToBoard(boardElement, this.cards);

    boardElement.addEventListener("click", (event) =>
      _handleClickedCard(event, this.cards, this.flippedCards)
    );
  }
}

export default Game;

function _handleClickedCard(event, cards, flippedCards) {
  const clickedElement = event.target,
    cardIndex = clickedElement.parentElement.dataset.index,
    clickedCard = cards[cardIndex];

  Animation.flip(clickedElement);
  flippedCards.push(clickedCard);
  if (flippedCards.length > 1) _checkMatch(flippedCards[0], flippedCards[1]);
}

function _checkMatch(card1, card2) {
  if (card1.name === card2.name) _handleCardMatch();
  else _handleCardNotMatch();
}

function _handleCardMatch() {}

function _handleCardNotMatch() {}

function _loadCardsToBoard(board, cards) {
  if (!cards.length) {
    throw new Error("There are no card to load");
  }
  const fragment = document.createDocumentFragment();

  cards.forEach((card, idx) => {
    const listElement = document.createElement("li"),
      frontDivElement = document.createElement("div"),
      backDivElement = document.createElement("div");

    listElement.classList.add("card");
    listElement.setAttribute("data-index", idx);

    frontDivElement.classList.add("front");
    frontDivElement.textContent = card.name;
    listElement.appendChild(frontDivElement);

    backDivElement.classList.add("back");
    backDivElement.textContent = "Back";
    listElement.appendChild(backDivElement);

    fragment.appendChild(listElement);
  });

  board.appendChild(fragment);
}
