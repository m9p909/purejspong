import Ball from "./Ball"
import ScoreBoard from "./ScoreBoard"
import Paddle from "./Paddle"
import Renderer from "./Renderer"
import Point from "./Point"
import BallPaddleCollisionDetector from "./BallPaddleCollisionDetector"

export default class GameStage {
  previousTime = new Date().getMilliseconds()
  scoreboard: ScoreBoard
  ball: Ball
  leftPaddle: Paddle
  rightPaddle: Paddle
  collisionDetector: BallPaddleCollisionDetector

  constructor(renderer: Renderer, private clock: number) {

    this.collisionDetector = new BallPaddleCollisionDetector()
    const half = renderer.getCanvasHeight() / 2
    this.leftPaddle = new Paddle(renderer, 87, 83,
      new Point(10, half), clock, this.collisionDetector)

    this.rightPaddle = new Paddle(renderer,
      38, 40, { x: undefined, y: half }, clock, this.collisionDetector)

    this.scoreboard = new ScoreBoard(renderer)
    this.ball = new Ball(renderer, this.clock, this.scoreboard, this.collisionDetector)
    this.collisionDetector.init(this.leftPaddle, this.rightPaddle, this.ball)
  }

  getTimeElapsed() {
    const currentTime = new Date().getMilliseconds()
    const timeElapsed = currentTime - this.previousTime
    this.previousTime = currentTime
    return timeElapsed
  }

  update() {
    this.ball.update()
    this.rightPaddle.update()
    this.leftPaddle.update()
  }

  render() {

    this.scoreboard.render()
    this.ball.render()
    this.rightPaddle.render()
    this.leftPaddle.render()
  }

  next() {
    this.update()
    this.render()
  }
}

