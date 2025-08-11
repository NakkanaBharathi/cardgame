const cards = [
              "https://images5.alphacoders.com/532/532559.jpg",
              "https://wallpapers.com/images/hd/naruto-itachi-afqyfayl4vhd87jv.jpg",
               "https://i.pinimg.com/736x/2b/58/66/2b5866526f67707a36d72d31b2faf142.jpg"
            ];   

// Duplicate and shuffle cards
let cardsArray = [...cards, ...cards];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  shuffle(cardsArray);
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  
  cardsArray.forEach(imgSrc => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = imgSrc;

    // Front face (image)
    const front = document.createElement("img");
    front.src = imgSrc;
    front.classList.add("front-face");
    front.alt = "Naruto Card";

    // Back face (card back)
    const back = document.createElement("div");
    back.classList.add("back-face");
    back.textContent = "";

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    matchedCount++;
    resetTurn();
    if (matchedCount === cards.length) {
      document.getElementById("status").textContent = "🎉 You Win! All pairs matched!";
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
