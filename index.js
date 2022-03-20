let modalBody = document.getElementById("modalBody");
let modal = document.getElementById("modal");
let input = document.querySelector(".input___player");

/* arreglo con todas las combinaciones posibles para ganar y predecir movimientos del bot */
let combinaciones = [
  [
    [1, 2],
    [3, 6],
    [4, 8],
  ],
  [
    [0, 2],
    [4, 7],
  ],
  [
    [0, 1],
    [5, 8],
    [4, 6],
  ],
  [
    [4, 5],
    [0, 6],
  ],
  [
    [0, 8],
    [2, 6],
    [3, 5],
    [1, 7],
  ],
  [
    [2, 8],
    [3, 4],
  ],
  [
    [7, 8],
    [4, 2],
    [0, 3],
  ],
  [
    [6, 8],
    [4, 1],
  ],
  [
    [2, 5],
    [7, 6],
    [4, 0],
  ],
];

const validateRegister = () => {
  modal.classList.remove("hide");
  modal.classList.add("show");
  modalBody.innerHTML = `Debes completar tu registro`;
  setTimeout(() => {
    modal.classList.remove("show");
    modal.classList.add("hide");
  }, 1000);
};
const drawDot = (element) => {
  element.innerHTML = `<img src="assets/images/dotBlack.svg" width="50px" alt="bola Negra">`;
  setTimeout(() => {
    BotdrawDot(element);
    viewWinner(element);
  }, 1000);
};
/* Funcion para comprobar si existe un ganador */
const viewWinner = (element) => {
  let positionItems = element.dataset.position;
  let win = false;
  for (let t = 0; t < combinaciones[positionItems].length; t++) {
    let contadorWin = 0;
    for (let y = 0; y < combinaciones[positionItems][t].length; y++) {
      let elemento =
        document.querySelectorAll(".item__grid")[
          combinaciones[positionItems][t][y]
        ];
      if (elemento) {
        if (elemento.querySelector("img")) {
          if (
            elemento.querySelector("img").src ==
            element.querySelector("img").src
          ) {
            contadorWin++;
          }
        }
      }
      if (contadorWin >= 2) {
        modal.classList.remove("hide");
        modal.classList.add("show");
        modalBody.innerHTML = `Hay un ganador!!!`;
        return;
      }
    }
  }
};
/* funcion para dar movimiento al bot */
const BotdrawDot = (element) => {
  let itemsBox = document.querySelectorAll(".item__grid");
  let positionItems = element.dataset.position;
  for (let y = 0; y < combinaciones[positionItems].length; y++) {
    let auxDraw = false;
    for (let i = 0; i < combinaciones[positionItems][y].length; i++) {
      if (itemsBox[combinaciones[positionItems][y][i]].querySelector("img")) {
        console.log(itemsBox[i], "fs");
        for (let z = 0; z < combinaciones[positionItems].length; z++) {}
      } else {
        itemsBox[
          combinaciones[positionItems][y][i]
        ].innerHTML = `<img src="assets/images/dotRed.svg" width="50px" alt="bola Negra">`;
        auxDraw = true;
        break;
      }
    }
    if (auxDraw) break;
  }
};

/* manejador de eventos general */
document.addEventListener("click", (e) => {
  if (e.target.matches(".container__grid .item__grid")) {
    if (input.value.length <= 0) {
      validateRegister();
    } else {
      drawDot(e.target);
    }
  }
});
