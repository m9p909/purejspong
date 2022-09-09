let c = document.getElementById("pong");

const ctx = c.getContext("2d");

const paddleWidth = 50;

const paddleHeight = 100;

const leftPaddleX = 10;

const rightPaddleX = 980 - 50;

const ballSize = 30;

const paddleSpeed = 30;

const drawRectangle = (x, y, w, h) => {
  ctx.beginPath();

  ctx.rect(x, y, w, h);

  ctx.stroke();
};

const drawPaddle = (x, y) => {
  drawRectangle(x, y, paddleWidth, paddleHeight);
};

const drawPaddleLeft = (y) => {
  drawPaddle(leftPaddleX, y);
};

const drawPaddleRight = (y) => {
  drawPaddle(rightPaddleX, y);
};

const drawBall = (x, y) => {
  drawRectangle(x, y, ballSize, ballSize);
};

const resetCanvas = () => {
  ctx.clearRect(0, 0, c.width, c.height);
};

const incrementPlayer1Points = (state) => {
  state.player1Points += 1;

  return state;
};

const incrementPlayer2Points = (state) => {
  state.player2Points += 1;

  return state;
};

const resetBall = (ball, goingRight) => {
  ball.velocityX = -20;

  ball.velocityY = -ball.velocityY;

  ball.x = 500;

  ball.y = 250;

  return ball;
};

const handleSideCollisions = (state) => {
  const ball = state.ball;

  if (ball.x > c.width - ballSize) {
    state = incrementPlayer1Points(state);

    state.ball = resetBall(state.ball, false);
  }

  if (ball.x <= 0) {
    state = incrementPlayer2Points(state);

    state.ball = resetBall(state.ball, true);
  }

  if (ball.y >= c.height - ballSize * 2 || ball.y <= ballSize) {
    state.ball.velocityY = -state.ball.velocityY;
  }

  return state;
};

const getCornersOfBox = (x, y, w, h) => {
  return [
    [x, y],
    [x + w, y],
    [x, y + h],
    [x + w, y + h],
  ];
};

const getCornersOfPaddle = (x, y) => {
  return getCornersOfBox(x, y, paddleWidth, paddleHeight);
};

const collisionVertical = (state) => {
  ballCorners = getCornersOfBox(state.ball.x, state.ball.y, ballSize, ballSize);

  paddleCorners = getCornersOfPaddle(leftPaddleX, state.leftPaddleY);
};

const handlePaddleCollisions = (state) => {
  
  if (collisionHorizontal(state)) {
    state.ball.velocityX = -state.ball.velocityX;
  }

  if (collisionVertical(state)) {
    state.ball.velocityY = -state.ball.velocityY;
  }

  if (collisionDiagonal(state)) {
    state.ball.velocityX = -state.ball.velocityX
    state.ball.velocityY = - state.ball.velocityY
  }

  return state;
};

const handleBallCollisions = (state) => {
  state = handleSideCollisions(state);

  state = handlePaddleCollisions(state);
};

const applyVelocity = (ball) => {
  ball.x = ball.x + ball.velocityX;

  ball.y = ball.y + ball.velocityY;
  ball.ballHistory.push(ball)


  return ball;
};

class BallHistory {
  previousLocations = [];

  constructor(history){
    if(history){
      for(const value in history){
        this.previousLocations.push(value)
      }
    }
  }

  push(v) {
    this.previousLocations.push(v);
    if(this.previousLocations.length() > 5) {
      this.previousLocations.shift()
    }
  }

  pop() {
    return this.previousLocations.pop();
  }

  
}

const initialState = {
  leftPaddleY: 250,
  rightPaddleY: 250,
  player1Points: 0,
  player2Points: 0,
  ball: {
    x: 500,
    y: 250,
    velocityX: -20,
    velocityY: 30,
    ballHistory: new BallHistory()
  },
};

const startingControllerState = {
  player1: {
    up: false,

    down: false,
  },

  player2: {
    up: false,

    down: false,
  },
};

let currentControllerState = startingControllerState;

const keydownHandler = (event, down) => {
  event.preventDefault();

  const w = 87;

  const s = 83;

  const uparrow = 38;

  const downarrow = 40;

  const updateState = (controllerState, down, player, direction) => {
    let state = controllerState;

    state["player" + player][direction] = down;

    controllerState = state;

    return controllerState;
  };

  switch (event.keyCode) {
    case w:
      currentControllerState = updateState(
        currentControllerState,
        down,
        1,
        "up"
      );

      break;

    case s:
      currentControllerState = updateState(
        currentControllerState,
        down,
        1,
        "down"
      );

      break;

    case uparrow:
      currentControllerState = updateState(
        currentControllerState,
        down,
        2,
        "up"
      );

      break;

    case downarrow:
      currentControllerState = updateState(
        currentControllerState,
        down,
        2,
        "down"
      );

      break;
  }
};

document.addEventListener("keydown", (event) => {
  keydownHandler(event, true);
});

document.addEventListener("keyup", (event) => {
  keydownHandler(event, false);
});

const render = (state) => {
  resetCanvas();

  drawPaddleLeft(state.leftPaddleY);

  drawPaddleRight(state.rightPaddleY);

  drawBall(state.ball.x, state.ball.y);
};

const updatePaddlesWithUserInput = (state) => {
  console.log(currentControllerState);

  if (currentControllerState.player1.up) {
    state.leftPaddleY = state.leftPaddleY - paddleSpeed;
  }

  if (currentControllerState.player1.down) {
    state.leftPaddleY = state.leftPaddleY + paddleSpeed;
  }

  if (currentControllerState.player2.up) {
    state.rightPaddleY = state.rightPaddleY - paddleSpeed;
  }

  if (currentControllerState.player2.down) {
    state.rightPaddleY = state.rightPaddleY + paddleSpeed;
  }

  return state;
};

const gameFunction = (state) => {
  state = updatePaddlesWithUserInput(state);

  state.ball = applyVelocity(state.ball);

  state = handleBallCollisions(state);

  render(state);

  return state;
};

let currentState = initialState;

const triggerNextFrameEvent = () => {
  const event = new CustomEvent("nextFrame");

  document.dispatchEvent(event);
};

const runGame = () => {
  setTimeout(() => {
    currentState = gameFunction(currentState);

    triggerNextFrameEvent();
  }, 500);
};

document.addEventListener("nextFrame", () => {
  runGame();
});

runGame();





