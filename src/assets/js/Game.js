import Animation from "./animation";
import Utils from "./utils";
import dogPic1 from "../img/dog-pic-1.jpg";
import dogPic2 from "../img/dog-pic-2.jpg";
import dogPic3 from "../img/dog-pic-3.jpg";
import dogPic4 from "../img/dog-pic-4.jpg";
import dogPic5 from "../img/dog-pic-5.jpg";
import dogPic6 from "../img/dog-pic-6.jpg";
import dogPic7 from "../img/dog-pic-7.jpg";
import dogPic8 from "../img/dog-pic-8.jpg";

export default class Game {
  constructor() {
    this.cards = [
      { name: "dog-pic-1", imgURL: dogPic1 },
      { name: "dog-pic-2", imgURL: dogPic2 },
      { name: "dog-pic-3", imgURL: dogPic3 },
      { name: "dog-pic-4", imgURL: dogPic4 },
      { name: "dog-pic-5", imgURL: dogPic5 },
      { name: "dog-pic-6", imgURL: dogPic6 },
      { name: "dog-pic-7", imgURL: dogPic7 },
      { name: "dog-pic-8", imgURL: dogPic8 },
      { name: "dog-pic-1", imgURL: dogPic1 },
      { name: "dog-pic-2", imgURL: dogPic2 },
      { name: "dog-pic-3", imgURL: dogPic3 },
      { name: "dog-pic-4", imgURL: dogPic4 },
      { name: "dog-pic-5", imgURL: dogPic5 },
      { name: "dog-pic-6", imgURL: dogPic6 },
      { name: "dog-pic-7", imgURL: dogPic7 },
      { name: "dog-pic-8", imgURL: dogPic8 }
    ];
    this.boardElement = document.querySelector(".board");
    this.player = document.querySelector(".input-name").value || "Unknown";

    this._initialize();
    this._handleClickedCard = this._handleClickedCard.bind(this);
    this._handleRestart = this._handleRestart.bind(this);
  }

  _initialize() {
    this.cardsToCheck = [];
    this.numberOfFlippedCards = 0;
    this.moves = 0;
    this.rating = "★★★";
    this.seconds = 0;
    this.timerInterval = null;
    document.querySelector("div.moves").textContent = this.moves;
    document.querySelector("div.time").textContent = "00:00";
    document.querySelector("div.rating").textContent = this.rating;
  }

  /** Fisher-Yates Shuffling Algorithm */
  /** https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976 */
  _shuffleCards() {
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
    this._shuffleCards();
    this._loadCardsToBoard(this.boardElement, this.cards);
    this._initialize();
    this._startTimer();
    this.boardElement.addEventListener("click", this._handleClickedCard);
    document.querySelector(".btnReset").addEventListener("click", this._handleRestart);
  }

  _handleClickedCard(event) {
    event.stopPropagation();
    const clickedElement = event.target;
    if (
      clickedElement.nodeName !== "DIV" ||
      !clickedElement.parentElement.classList.contains("card") ||
      !clickedElement.classList.contains("back") ||
      clickedElement.parentElement.classList.contains("flipped")
    )
      return;

    if (this.cardsToCheck.length >= 2) return;

    this.moves++;
    Animation.flip(clickedElement);

    this.cardsToCheck.push(clickedElement.parentElement);
    if (this.cardsToCheck.length === 2) {
      const isMatched = this._checkMatch(...this.cardsToCheck);

      if (isMatched) {
        this.numberOfFlippedCards += 2;
        this._handleCardMatch(...this.cardsToCheck);
      } else this._handleCardNotMatch(...this.cardsToCheck);

      setTimeout(() => (this.cardsToCheck.length = 0), 2000);
    }

    this._updateScorePanel();
  }

  _checkMatch(card1Element, card2Element) {
    if (card1Element.dataset.name === card2Element.dataset.name) return true;
    return false;
  }

  _handleCardMatch(card1Element, card2Element) {
    setTimeout(() => {
      Animation.highlight(card1Element.querySelector("div.front"));
      Animation.highlight(card2Element.querySelector("div.front"));
    }, 1000);

    setTimeout(() => {
      Animation.unhighlight(card1Element);
      Animation.unhighlight(card2Element);
    }, 1500);

    if (this.numberOfFlippedCards === 16) this._displayWinModal();
  }

  _handleCardNotMatch(card1Element, card2Element) {
    setTimeout(() => {
      Animation.shake(card1Element);
      Animation.shake(card2Element);
    }, 1000);

    setTimeout(() => {
      Animation.unshake(card1Element);
      Animation.unshake(card2Element);
    }, 1500);

    setTimeout(() => {
      Animation.unflip(card1Element);
      Animation.unflip(card2Element);
    }, 1800);
  }

  _displayWinModal() {
    this._stopTimer();
    setTimeout(() => {
      this.boardElement.removeEventListener("click", this._handleClickedCard);
      const modal = document.querySelector(".modal-container");
      modal.querySelector("#player-time").textContent = Utils.formatTime(this.seconds);
      modal.querySelector("#player-rating").textContent = this.rating;
      document
        .querySelector(".btnRestart")
        .addEventListener("click", this._handleRestart);
      document
        .querySelector(".btnQuit")
        .addEventListener("click", this._handleQuit);
      modal.style.display = "block";

      const playerScores =
        JSON.parse(localStorage.getItem("MEMORY_GAME_SCORE")) || [];

      playerScores.push({
        player: this.player,
        moves: this.moves,
        rating: this.rating,
        seconds: this.seconds
      });
      localStorage.setItem("MEMORY_GAME_SCORE", JSON.stringify(playerScores));
    }, 2000);
  }

  _handleRestart() {
    this._stopTimer();
    const modal = document.querySelector(".modal-container");
    modal
      .querySelector(".btnRestart")
      .removeEventListener("click", this._handleRestart);
      modal
      .querySelector(".btnQuit")
      .removeEventListener("click", this._handleQuit);
    modal.style.display = "none";
    this.start();
  }

  _handleQuit() {
    const modal = document.querySelector(".modal-container");
    modal
      .querySelector(".btnRestart")
      .removeEventListener("click", this._handleRestart);
      modal
      .querySelector(".btnQuit")
      .removeEventListener("click", this._handleQuit);
    modal.style.display = "none";
    document.querySelector(".board-container").style.display = "none";
    document.querySelector(".form-container").style.display = "block";
  }

  _updateScorePanel() {
    document.querySelector("div.moves").textContent = this.moves;
    if (this.moves > 50) {
      this.rating = "★";
    } else if (this.moves > 32) {
      this.rating = "★★";
    }
    document.querySelector("div.rating").textContent = this.rating;
  }

  _startTimer() {
    var self = this;
    this.timerInterval = setInterval(function() {
      self.seconds++;
      document.querySelector("div.time").textContent = Utils.formatTime(self.seconds);
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this.timerInterval);
  }

  _loadCardsToBoard() {
    if (!this.cards.length) {
      throw new Error("There are no card to load");
    }
    const modal = document.querySelector(".modal-container");
    this.boardElement.innerHTML = "";
    const fragment = document.createDocumentFragment();

    this.cards.forEach(card => {
      const listElement = document.createElement("li"),
        frontDivElement = document.createElement("div"),
        backDivElement = document.createElement("div"),
        frontImgElement = document.createElement("img");

      listElement.classList.add("card");
      listElement.setAttribute("data-name", card.name);

      frontImgElement.src = card.imgURL;
      frontDivElement.classList.add("front");
      frontDivElement.appendChild(frontImgElement);
      listElement.appendChild(frontDivElement);

      backDivElement.classList.add("back");
      listElement.appendChild(backDivElement);

      fragment.appendChild(listElement);
    });

    this.boardElement.appendChild(fragment);
    this.boardElement.appendChild(modal);
  }
}
