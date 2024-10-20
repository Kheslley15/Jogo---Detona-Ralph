const state = {
  view: {
    square: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    TempoRestante: document.querySelector("#tempo-restante"),
    pontos: document.querySelector("#pontos"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 5,
  },
  actions: {
    timeId: setInterval(randomSquare, 1000),
    countDownTimeId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.TempoRestante.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimeId);
    clearInterval(state.actions.timeId);
    playSound("game-over")
    alert("Game over! O seu resltado foi: " + state.values.result);
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`)
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.square.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.square[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.square.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.pontos.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function main() {
  addListenerHitBox();
}

main();
