const char = document.getElementById("char");
const map = document.getElementById("map");
const speech = document.getElementById("speech");
let readyToClick = false;

let charBottom = 210;
let charLeft = 460;
let charTop = 400;
let counter = 0;

function move(
  event,
  yLower,
  yUpper,
  xLower,
  xUpper,
  leftBoundary,
  bottomBoundary,
  house
) {
  let firstMove = true;
  let houseNumber = house;
  if (
    event.clientY >= yLower &&
    event.clientY <= yUpper &&
    event.clientX >= xLower &&
    event.clientX <= xUpper
  ) {
    const interval = setInterval(function () {
      if (charLeft < leftBoundary && firstMove === true) {
        speech.style.visibility = "hidden";
        char.src = "stand.png";
        counter += 1;
        if (counter % 2 === 0) {
          char.src = "walk1.png";
          counter = 0;
        } else {
          char.src = "walk2.png";
        }
        charLeft += 10;
        char.style.left = `${charLeft}px`;
      } else if (houseNumber === 1 || houseNumber === 2) {
        if (charTop < bottomBoundary) {
          counter += 1;
          if (counter % 2 === 0) {
            char.src = "back2.png";
            counter = 0;
          } else {
            char.src = "back1.png";
          }
          charTop += 10;
          char.style.bottom = `${charTop}px`;
        } else {
          houseNumber = 0;
          counter = 0;
        }
      } else if (houseNumber === 3) {
        speech.style.visibility = "hidden";
        firstMove = false;
        counter += 1;
        if (charLeft > 330) {
          if (counter % 2 === 0) {
            char.src = "left1.png";
            counter = 0;
          } else {
            char.src = "left2.png";
          }
          charLeft -= 10;
          char.style.left = `${charLeft}px`;
        } else if (charTop < bottomBoundary) {
          counter += 1;
          if (counter % 2 === 0) {
            char.src = "back2.png";
            counter = 0;
          } else {
            char.src = "back1.png";
          }
          charTop += 10;
          char.style.bottom = `${charTop}px`;
        } else {
          houseNumber = 0;
        }
      } else {
        char.style.visibility = "hidden";
        window.location.href = `http://127.0.0.1:3000/index${house}.html`;
        counter = 0;
        clearInterval(interval);
      }
    }, 100);
  }
}

map.addEventListener("click", function (event) {
  if (readyToClick === true) {
    move(event, 163, 235, 624, 720, 651, 470, 1);
    move(event, 61, 138, 543, 635, 565, 565, 2);
    move(event, 162, 234, 301, 396, 460, 470, 3);
  }
});

const interval2 = setInterval(function () {
  counter += 1;
  if (charBottom < 400) {
    if (counter % 2 === 0) {
      char.src = "back2.png";
      counter = 0;
    } else {
      char.src = "back1.png";
    }
    charBottom += 10;
    char.style.bottom = `${charBottom}px`;
  } else {
    char.src = "front.png";
    speech.style.visibility = "visible";
    readyToClick = true;
    clearInterval(interval2);
  }
}, 100);
