import Point from "./Point"
import Renderer from "./Renderer"
import Rectangle from './Rectangle'
import BallPaddleCollisionDetector from "./BallPaddleCollisionDetector"


export default class Paddle implements Rectangle {
  height = 50
  width = 100
  paddleSpeed = 50 // px per s
  downKeyPressed = false
  upKeyPressed = false
  pos: Point;

  constructor(private renderer: Renderer,
    private keyup: number,
    private keydown: number,
    position: { x: number | undefined, y: number },
    private clock: number,
    private collisionDetector: BallPaddleCollisionDetector) {

    const x = position.x ? position.x : this.renderer.getCanvasWidth() - this.width - 10;
    this.pos = new Point(x, position.y)

    document.addEventListener("keydown", (event) => {
      this.keydownEventHandler(event, true)
    })
    document.addEventListener("keyup", (event) => {
      this.keydownEventHandler(event, false)
    })
  }

  drawPaddle = () => {
    this.renderer.drawRectangle(this);
  };

  updatePosition() {
    const change = this.paddleSpeed / this.clock
    const downKeyPressed = this.downKeyPressed ? 1 : 0
    const upKeyPressed = this.upKeyPressed ? 1 : 0
    let changeY = downKeyPressed * change +
      upKeyPressed * -change;
    const initialPos = this.pos.clone()
    this.pos = this.pos.add(new Point(0, changeY))
    if (this.collisionDetector.checkAllCollisions()) {
      this.pos = initialPos
    }
  }

  update() {
    this.updatePosition()
  }

  render() {
    this.drawPaddle()
  }

  keydownEventHandler(event: KeyboardEvent, down: boolean) {
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

  getPosition() {
    return this.pos
  }

  getHeightWidth() {
    return [this.height, this.width]
  }

}
