import Ball from "./Ball"
import Paddle from "./Paddle"
import Point from "./Point"
import Rectangle from "./Rectangle"

class BallHistory {
  hist: Point[] = [];
  push(ball: Ball) {
    this.hist.push(ball.pos);
    if (this.hist.length > 200) {
      this.hist.shift();
    }
  }

  pop() {
    return this.hist.pop()
  }

  empty() {
    return this.hist.length === 0
  }
}

export default class BallPaddleCollisionDetector {

  ballHistory = new BallHistory()

  historyCounter = 0

  constructor(private ball: Ball,
    private leftPaddle: Paddle,
    private rightPaddle: Paddle) {
  }


  collisionBetweenTwoRectangles(a: Rectangle, b: Rectangle) {
    const Ax = a.pos.x
    const Ay = a.pos.y
    const Aw = a.height
    const Ah = a.height
    const Bx = b.pos.x
    const By = b.pos.y
    const Bw = b.width
    const Bh = b.height

    return Bx + Bw > Ax &&
      By + Bh > Ay &&
      Ax + Aw > Bx &&
      Ay + Ah > By;
  }

  savehistory() {
    const pattern = 4
    this.historyCounter = this.historyCounter++ % pattern
    return this.historyCounter % pattern === 0;
  }



  checkPaddleCollision(paddle: Paddle, ball: Ball, onCollision: () => void) {
    if (this.collisionBetweenTwoRectangles(paddle, ball)) {
      while (this.collisionBetweenTwoRectangles(paddle, ball)) {
        const newPos = this.ballHistory.pop();
        if (newPos) {
          ball.pos = newPos;
        } else {
          break;
        }
      }
      onCollision();
    }

    if (this.savehistory()) {
      this.ballHistory.push(ball);
    }
  }

  solve() {
    this.checkPaddleCollision(this.leftPaddle, this.ball);
    this.checkPaddleCollision(this.rightPaddle, this.ball);
  }

}
