export default class GameStage {
  previousTime=new Date().getMilliseconds()

  constructor (renderer, clock){
    this.renderer = renderer
    const half = renderer.getCanvasHeight()/2
    this.leftPaddle = new Paddle(renderer, {keyup: 87, keydown: 83, 
      position: new Point(10,half), clock})
    this.rightPaddle = new Paddle(renderer, 
      {keyup:38, keydown: 40, position: new Point(undefined, half), clock})
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

