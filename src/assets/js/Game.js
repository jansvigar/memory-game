import Animation from "./animation";
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
    this.cardsToCheck = [];
    this.numberOfFlippedCards = 0;
    this.moves = 0;
    this.rating = '★★★';
    this.seconds = 0; 
    this.timerInterval = null;
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
    this._startTimer();
  }

  _handleClickedCard(event) {
    const clickedElement = event.target;
    if(clickedElement.nodeName !== 'DIV') return;
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

    this._updateScorePanel();
  
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
  }

  _updateScorePanel() {
    document.querySelector('div.moves').textContent = ++this.moves;
    if(this.moves >= 48) {
      this.rating = '★';
    } else if(this.moves >= 24) {
      this.rating = '★★';
    } 
    document.querySelector('div.rating').textContent = this.rating;
  }

  _startTimer() {
    var self = this;
    this.timerInterval = setInterval(function() {
      self.seconds++;
      let minutes = Math.floor(self.seconds/60);
      let seconds = self.seconds % 60;
      seconds = `${seconds < 10 ? '0' + seconds : seconds}`;
      document.querySelector('div.time').textContent = `${minutes}:${seconds}`;
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this.timerInterval);
  }
  
  _loadCardsToBoard() {
    if (!this.cards.length) {
      throw new Error("There are no card to load");
    }
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
  }
  
}

