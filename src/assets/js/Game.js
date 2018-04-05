import Animation from "./animation";

export default class Game {
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
    this.boardElement = document.querySelector(".board");
    this.cardsToCheck = [];
    this.numberOfFlippedCards = 0;
    this._handleClickedCard = this._handleClickedCard.bind(this);
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
    this._loadCardsToBoard(this.boardElement, this.cards);

    this.boardElement.addEventListener("click", this._handleClickedCard);
  }

  _handleClickedCard(event) {
    const clickedElement = event.target;
    if(clickedElement.parentElement.classList.contains("flipped")) return;
    Animation.flip(clickedElement);

    this.cardsToCheck.push(clickedElement.parentElement);
    if (this.cardsToCheck.length === 2) {
      const isMatched = this._checkMatch(...this.cardsToCheck);
  
      if (isMatched) {
        this._handleCardMatch();
        this.numberOfFlippedCards+=2;
      }
      else this._handleCardNotMatch(...this.cardsToCheck);
  
      this.cardsToCheck.length = 0;
    }
  
    console.log(this.numberOfFlippedCards);
  
    if(this.numberOfFlippedCards===16) console.log("You win!!!");
  }
  
  _checkMatch(card1Element, card2Element) {
    if (card1Element.dataset.name === card2Element.dataset.name) return true;
    return false;
  }
  
  _handleCardMatch() {
    console.log("cards matched");
  }
  
  _handleCardNotMatch(card1Element, card2Element) {
    setTimeout(() => {
      Animation.unflip(card1Element);
      Animation.unflip(card2Element);
    }, 1500);
    console.log("cards not matched");
  }
  
  _loadCardsToBoard() {
    if (!this.cards.length) {
      throw new Error("There are no card to load");
    }
    const fragment = document.createDocumentFragment();
  
    this.cards.forEach(card => {
      const listElement = document.createElement("li"),
        frontDivElement = document.createElement("div"),
        backDivElement = document.createElement("div");
  
      listElement.classList.add("card");
      listElement.setAttribute("data-name", card.name);
  
      frontDivElement.classList.add("front");
      frontDivElement.textContent = card.name;
      listElement.appendChild(frontDivElement);
  
      backDivElement.classList.add("back");
      backDivElement.textContent = "Back";
      listElement.appendChild(backDivElement);
  
      fragment.appendChild(listElement);
    });
  
    this.boardElement.appendChild(fragment);
  }
  
}

