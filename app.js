let errSound = new Audio("img/error-126627.mp3");
let finishedSound = new Audio("img/winfantasia-6912.mp3");
let matchedSound = new Audio("img/achive-sound-132273.mp3");

const btn = document.querySelectorAll(".btn");
let card;
const cardio = document.querySelectorAll(".card");
const easyCard = document.querySelector(".cards");
const hardCard = document.querySelector(".cards2");
const menu = document.querySelector(".menu");
const end = document.querySelector(".end");
const endspan = document.querySelector("#endp");
const newgame = document.querySelectorAll(".newG");
const reset = document.querySelectorAll(".reset");
let len;
let cardcount = 0;
let endLimit;
let moves = 0;
let card1, card2;
let disableCard = true;

function matchCards(one, two) {
  moves++;
  document.querySelector("#moves").innerHTML = moves;
  if (one === two) {
    matchedSound.play();
    cardcount++;
    if (cardcount == endLimit) {
      finishedSound.play();
      setTimeout(() => {
        endspan.innerHTML = moves;
        suffleCards();
        end.style.display = "flex";
      }, 1000);
    }
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);

    disableCard = true;
    card1 = card2 = "";
  } else {
    errSound.play();
    setTimeout(() => {
      card1.classList.add("shake");
      card2.classList.add("shake");
    }, 400);
    setTimeout(() => {
      card1.classList.remove("shake", "flip");
      card2.classList.remove("shake", "flip");
      card1 = card2 = "";
    }, 1200);
    disableCard = true;
  }
}

function suffleCards() {
  moves = 0;
  cardcount = 0;
  card1 = card2 = "";
  document.querySelector("#moves").innerHTML = moves;
  card.forEach((c) => {
    c.classList.remove("flip");
    c.addEventListener("click", flipCard);
  });
  len.sort(() => (Math.random() > 0.5 ? 1 : -1));
  card.forEach((c, i) => {
    let imgTag = c.querySelector("img");
    imgTag.src = `img/${len[i]}.jpg`;
  });
}
// card flipping fuction.
function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== card1 && disableCard && !card2) {
    clickedCard.classList.add("flip");
    if (!card1) {
      return (card1 = clickedCard);
    }
    disableCard = false;
    card2 = clickedCard;
    let card1img = card1.querySelector("img").src,
      card2img = card2.querySelector("img").src;
    matchCards(card1img, card2img);
  }
}

btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.classList.contains("easy")) {
      len = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
      card = document.querySelectorAll(".cards .card");
      easyCard.style.display = "grid";
      hardCard.style.display = "none";
      menu.style.display = "none";
      suffleCards();
      endLimit = 8;
    } else if (e.target.classList.contains("hard")) {
      len = [
        1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ];
      card = document.querySelectorAll(".cards2 .card");
      easyCard.style.display = "none";
      hardCard.style.display = "grid";
      menu.style.display = "none";
      suffleCards();
      endLimit = 18;
    }
  });
});

newgame.forEach((newgame) => {
  newgame.addEventListener("click", () => {
    easyCard.style.display = "none";
    hardCard.style.display = "none";
    end.style.display = "none";
    menu.style.display = "flex";
  });
});

cardio.forEach((c) => {
  c.addEventListener("click", flipCard);
});

reset.forEach((r) => {
  r.addEventListener("click", () => {
    end.style.display = "none";
    suffleCards();
  });
});
