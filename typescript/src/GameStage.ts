import Ball from "./Ball"
import ScoreBoard from "./ScoreBoard"
import Paddle from "./Paddle"
import Renderer from "./Renderer"
import Point from "./Point"

export default class GameStage {
  previousTime=new Date().getMilliseconds()
  scoreboard: ScoreBoard
  ball :Ball
  leftPaddle: Paddle
  rightPaddle: Paddle

  constructor (renderer: Renderer, private clock: number){
    const half = renderer.getCanvasHeight()/2
    this.leftPaddle = new Paddle(renderer, 87, 83, 
      new Point(10,half), clock)

    this.rightPaddle = new Paddle(renderer, 
      38, 40, new Point(undefined, half), clock)

    this.scoreboard = new ScoreBoard(renderer)
    this.ball = new Ball(renderer, 
      this.clock,this.scoreboard)
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

