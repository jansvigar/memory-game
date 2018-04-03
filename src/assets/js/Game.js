class Game {
  constructor() {
    this.cards = [
      { name: "a", imgURL: "", matched: false },
      { name: "b", imgURL: "", matched: false },
      { name: "c", imgURL: "", matched: false },
      { name: "d", imgURL: "", matched: false },
      { name: "e", imgURL: "", matched: false },
      { name: "f", imgURL: "", matched: false },
      { name: "g", imgURL: "", matched: false },
      { name: "h", imgURL: "", matched: false },
      { name: "a", imgURL: "", matched: false },
      { name: "b", imgURL: "", matched: false },
      { name: "c", imgURL: "", matched: false },
      { name: "d", imgURL: "", matched: false },
      { name: "e", imgURL: "", matched: false },
      { name: "f", imgURL: "", matched: false },
      { name: "g", imgURL: "", matched: false },
      { name: "h", imgURL: "", matched: false }
    ];
    this.flippedCards = [];
  }

  /** Fisher-Yates Shuffling Algorithm */
  /** https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976 */
  shuffleCards() {
    let currentIndex = this.cards.length,
      temp,
      randomIndex;

    /** While there are still unrandomized cards */
    while (currentIndex > 0) {
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
    boardElement.addEventListener("click", (event, cards, flippedCards) =>
      _handleClickedCard(event, cards, flippedCards)
    );
  }
}

export default Game;

function _handleClickedCard(event, cards, flippedCards) {
  const clickedElement = event.target,
    cardIndex = clickedElement.dataset.index,
    clickedCard = cards[cardIndex];

  Animation.flip(clickedElement);
  flippedCards.push(clickedCard);
  if (flippedCards.length > 1) _checkMatch(flippedCards[0], flippedCards[1]);
}

function _checkMatch(card1, card2) {
  if (card1.name === card2.name) _handleCardMatch();
  else _handleCardNotMatch();
}
