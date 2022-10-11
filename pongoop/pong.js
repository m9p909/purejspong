class Renderer {
  constructor(elem){
    this.ctx = elem.getContext("2d")
    this.elem = elem
  }

  drawRectangle(x, y, w, h){
    this.ctx.beginPath();

    this.ctx.rect(x, y, w, h);

    this.ctx.stroke();
  };

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
  };

  getCanvasHeight(){
    return this.elem.height;
  }

  getCanvasWidth(){
    return this.elem.width
  }


}

class BallPaddleCollisionDetector {
  constructor(ball,leftPaddle, rightPaddle){
    this.ball = ball
    this.leftPaddle = leftPaddle
    this.rightPaddle = rightPaddle
  }

  checkPaddleCollision(paddle){
    const paddlePosition = paddle.getPosition()
    const paddleHeightWidth = paddle.getHeightWidth()

    const ballLocation = this.ball.getPosition()
    const topLeftCorner = this.getPosition()
    const corners = [[this.x,this.y], 
      [this.x+this.ballSize, this.y],
      [this.x,this.y+this.ballSize],
      [this.x+this.ballSize, this.y+this.ballSize]]

    const topLeftHorizontalCollision = 
      corners[0][0] <= paddlePosition[0]+paddleHeightWidth[1] &&
      topLeftCorner[0][0] >= paddlePosition[0]

    const topLeftVerticalCollision = 
      corners[0][1] <= paddlePosition[1] + paddleHeightWidth[0] &&
      corners[0][1] >= paddlePosition[1]

    if(topLeftVerticalCollision && topLeftHorizontalCollision){
      this.velocity[0] = -this

    }
}



class Ball {
  ballSize=30
  initialVelocity = [-60, 40] // px/s
  initialPostition = [500, 250]
  velocity = this.initialVelocity
  position = this.initialPostition

  constructor({renderer,leftPaddle,rightPaddle,clock,scoreboard}){
    this.renderer = renderer
    this.leftPaddle = leftPaddle
    this.rightPaddle = rightPaddle
    this.clock = clock
    this.scoreboard = scoreboard
  }
  drawBall = (x, y) => {
    this.renderer.drawRectangle(x, y, this.ballSize, this.ballSize);
  };

  applyVelocity(){
    const seconds = this.clock/1000
    const changePos = [this.velocity[0]*seconds, this.velocity[1]*seconds]
    this.position = [this.position[0] + changePos[0], this.position[1] + changePos[1]]
  }

  checkSideCollisions(){
    const renderer = this.renderer
    const leftScored = this.position[0] >= renderer.getCanvasWidth()-this.ballSize
    const rightScored =this.position[0] <= 0
    if( leftScored || rightScored ){
      this.position = this.initialPostition
      this.velocity[0] = - this.velocity[0]
      if(leftScored){
        this.scoreboard.leftScored()
      } else {
        this.scoreboard.rightScored()
      }
    }

    if(this.position[1] >= renderer.getCanvasHeight()-this.ballSize || 
      this.position[1] <= 0){
      this.velocity[1] = - this.velocity[1]
    }
  }



  }

  update() {
    this.applyVelocity()
    this.checkSideCollisions()
    this.drawBall(this.position[0],this.position[1])
  }

  getPosition(){
    return this.position
  }
}


class Paddle {
  paddleWidth=50
  paddleHeight=100
  paddleSpeed=50 // px per s
  downKeyPressed=false
  upKeyPressed=false

  constructor(renderer, {keyup,keydown,x,y, clock}){
    this.renderer = renderer
    this.keydown = keydown
    this.keyup = keyup
    this.x = x ? x : this.renderer.getCanvasWidth()-this.paddleWidth-10;
    this.y = y;
    this.clock = clock
    document.addEventListener("keydown", (event) => {
      this.keydownEventHandler(event, true)
    })
    document.addEventListener("keyup", (event) => {
      this.keydownEventHandler(event, false)
    })

    this.paddleY = this.renderer.getCanvasHeight()/2
  }

  drawPaddle = (x, y) => {
    this.renderer.drawRectangle(x, y, this.paddleWidth, this.paddleHeight);
  };

  updatePosition(){
    const change = this.paddleSpeed/this.clock
    let changeY = this.downKeyPressed * change + 
      this.upKeyPressed * -change;
    this.y = this.y + changeY
  }

  update(){
    this.updatePosition()
    this.drawPaddle(this.x,this.y)
  }

  keydownEventHandler(event,down) {
    event.preventDefault();

    switch (event.keyCode) {
      case this.keydown:
        this.downKeyPressed = down
        break;

      case this.keyup:
        this.upKeyPressed = down
        break;
    }
    
  }

  getPosition(){
    return [this.x, this.y]
  }

  getHeightWidth(){
    return [this.height, this.width]
  }
  
}

class ScoreBoard {
  score = [0,0]
  constructor(renderer){
    this.renderer = renderer
  }

  rightScored(){
      this.score[1]++
    console.log(this.score)
  }

  leftScored(){
      this.score[0]++
     console.log(this.score)
  }

  update(){
    //not sure how to render this yet
  }
}

class GameStage {
  previousTime=new Date().getMilliseconds()

  constructor (renderer, clock){
    this.renderer = renderer
    const half = renderer.getCanvasHeight()/2
    this.leftPaddle = new Paddle(renderer, {keyup: 87, keydown: 83, 
      x: 10, y: half, clock})
    this.rightPaddle = new Paddle(renderer, 
      {keyup:38, keydown: 40, y:half, clock})
    this.scoreboard = new ScoreBoard(renderer)
    this.ball = new Ball({renderer, 
      leftPaddle: this.leftPaddle,
      rightPaddle: this.rightPaddle,
      clock,scoreboard: this.scoreboard})
  }

  getTimeElapsed(){
    const currentTime = new Date().getMilliseconds()
    const timeElapsed = currentTime - this.previousTime
    this.previousTime = currentTime
    return timeElapsed
  }

  next(){
    this.ball.update()
    this.rightPaddle.update()
    this.leftPaddle.update()
    this.scoreboard.update()
  }
}

class Game {
  currentStage;
  clock=20 // adjusts frame rate
  constructor() {
    let elem = document.getElementById("pong");
    this.renderer = new Renderer(elem)
    this.currentStage = new GameStage(this.renderer, this.clock)
    document.addEventListener("nextFrame", () => {
      this.next()
    })
  }

  next(){
    this.renderer.resetCanvas()
    this.currentStage.next()
    setTimeout(() => {
      const event = new CustomEvent("nextFrame");
      document.dispatchEvent(event)
    }, this.clock)
  }
}

const game = new Game();
game.next()
