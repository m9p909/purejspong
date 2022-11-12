import Ball from "./Ball"
import Paddle from "./Paddle"
import Rectangle from "./Rectangle"



export default class BallPaddleCollisionDetector {


  historyCounter = 0

  constructor(
    private leftPaddle: Paddle,
    private rightPaddle: Paddle) {
  }


  collisionBetweenTwoRectangles(a: Rectangle, b: Rectangle) {
    const Ax = a.pos.x
    const Ay = a.pos.y
    const Aw = a.height
    const Ah = a.width
    const Bx = b.pos.x
    const By = b.pos.y
    const Bw = b.height
    const Bh = b.width

    return Bx + Bw > Ax &&
      By + Bh > Ay &&
      Ax + Aw > Bx &&
      Ay + Ah > By;
  }


  checkPaddleCollision(paddle: Paddle, ball: Ball, onCollision: () => void) {
    if (this.collisionBetweenTwoRectangles(paddle, ball)) {
      onCollision();
    }
  }

  checkAllCollisions(ball: Ball, onCollision: () => void) {
    this.checkPaddleCollision(this.leftPaddle, ball, onCollision)
    this.checkPaddleCollision(this.rightPaddle, ball, onCollision)
  }


}
