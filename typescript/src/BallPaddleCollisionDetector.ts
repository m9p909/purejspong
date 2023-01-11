import Ball from "./Ball"
import Paddle from "./Paddle"
import Rectangle from "./Rectangle"



export default class BallPaddleCollisionDetector {
  leftPaddle?: Paddle
  rightPaddle?: Paddle
  ball?: Ball

  historyCounter = 0

  init(
    leftPaddle: Paddle,
    rightPaddle: Paddle,
    ball: Ball) {
    this.leftPaddle = leftPaddle
    this.rightPaddle = rightPaddle
    this.ball = ball

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
      return true;
    }

    return false
  }

  checkAllCollisions(): boolean {
    if (this.ball && this.leftPaddle && this.rightPaddle)
      return this.collisionBetweenTwoRectangles(this.ball, this.leftPaddle) || this.collisionBetweenTwoRectangles(this.ball, this.rightPaddle)
    return false
  }


}
