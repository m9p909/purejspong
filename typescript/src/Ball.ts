import Renderer from "./Renderer"
import ScoreBoard from "./ScoreBoard"
import Point from "./Point"
import Vector from "./Vector"
import Rectangle from './Rectangle'
import BallPaddleCollisionDetector from './BallPaddleCollisionDetector'

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

export default class Ball implements Rectangle {
  ballSize = 30
  public width;
  public height;
  initialVelocity = new Vector(-300, 100) // px/s
  initialPostition = new Point(500, 250)
  velocity = new Vector(this.initialVelocity.x, this.initialVelocity.y)
  pos = new Point(this.initialPostition.x, this.initialPostition.y)
  history = new BallHistory();

  constructor(private renderer: Renderer,
    private clock: number,
    private scoreboard: ScoreBoard,
    private ballPaddleCollisionDetector: BallPaddleCollisionDetector) {
    this.width = this.ballSize;
    this.height = this.ballSize;
  }

  drawBall = () => {
    this.renderer.drawRectangle(this);
  };

  applyVelocity() {
    const seconds = this.clock / 1000
    const changePos = this.velocity.times(seconds)
    this.pos = this.pos.add(changePos)
  }

  applyVelocityX() {
    const seconds = this.clock / 1000
    this.pos = this.pos.add(new Vector(this.velocity.x * seconds, 0))
  }

  undoApplyVelocityX() {
    const seconds = this.clock / 1000
    this.pos = this.pos.add(new Vector(-this.velocity.x * seconds, 0))
  }

  applyVelocityY() {
    const seconds = this.clock / 1000
    this.pos = this.pos.add(new Vector(0, this.velocity.y * seconds))
  }

  undoApplyVelocityY() {
    const seconds = this.clock / 1000
    this.pos = this.pos.add(new Vector(0, -this.velocity.y * seconds))
  }

  checkSideCollisionsX() {
    const renderer = this.renderer
    const leftScored = this.pos.x >= renderer.getCanvasWidth() - this.ballSize
    const rightScored = this.pos.x <= 0
    if (leftScored || rightScored) {
      this.pos = this.initialPostition
      if (leftScored) {
        this.scoreboard.leftScored()
      } else {
        this.scoreboard.rightScored()
      }
    }
  }

  checkSideCollisionsY() {
    return this.pos.y >= this.renderer.getCanvasHeight() - this.ballSize ||
      this.pos.y <= 0
  }

  reverseHorizontalVel() {
    this.velocity.x = -this.velocity.x;
  }

  reverseVerticalVel() {
    this.velocity.y = -this.velocity.y;
  }


  updateX() {
    const prevPos = this.pos.clone();
    this.applyVelocityX()
    const changeVel = this.ballPaddleCollisionDetector.checkAllCollisions()

    if (changeVel) {
      this.reverseHorizontalVel()
      this.pos = prevPos;
    }

    this.checkSideCollisionsX();
  }

  updateY() {
    const prevPos = this.pos.clone();
    this.applyVelocityY()
    let reverseY = this.ballPaddleCollisionDetector.checkAllCollisions()


    if (this.checkSideCollisionsY()) {
      reverseY = true;
    }

    if (reverseY) {
      this.reverseVerticalVel()
      this.pos = prevPos;
    }

  }

  update() {
    this.updateX();
    this.updateY();
  }

  render() {
    this.drawBall()
  }

  getPosition() {
    return this.pos
  }
}
