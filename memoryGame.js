document.body.innerHTML = `
<h3 >Score: <span id="result"></span></h3>

<div id="grid"></div>
<div id="message"></div>
`;

const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
];

// Sort the card array randomly
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const messageDisplay = document.getElementById("message");

let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    console.log(card, i);
    card.addEventListener("click", flipCard);
    gridDisplay.append(card);
  }
}

createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  console.log("check for match");

  if (optionOneId == optionTwoId) {
    messageDisplay.textContent = "You clicked the same card!";
    return;
  }

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    messageDisplay.textContent = `You've found a match`;
    messageDisplay.style.color = "green";

    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    messageDisplay.textContent = "Sorry, try again.";
    messageDisplay.style.color = "red";
  }

  resultDisplay.textContent = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations, you found them all!";
    resultDisplay.style.color = "green";

    // Optionally disable further clicks on cards once game is won
    document
      .querySelectorAll("img")
      .forEach((card) => card.removeEventListener("click", flipCard));
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id"); // Corrected the typo here
  if (!cardsChosenIds.includes(cardId)) {
    // Prevents clicking the same card twice
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);

    console.log(cardsChosen);
    console.log(cardsChosenIds);

    this.setAttribute("src", cardArray[cardId].img);

    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}
