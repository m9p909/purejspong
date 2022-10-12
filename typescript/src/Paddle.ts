import Point from "./Point"
import Renderer from "./Renderer"

export default class Paddle {
  paddleWidth=50
  paddleHeight=100
  paddleSpeed=50 // px per s
  downKeyPressed=false
  upKeyPressed=false

  constructor(private renderer: Renderer,
              private keyup: number,
              private keydown: number,
              private position: Point,
              private clock: number){
    this.position.x = this.position.x ? this.position.x : this.renderer.getCanvasWidth()-this.paddleWidth-10;
    document.addEventListener("keydown", (event) => {
      this.keydownEventHandler(event, true)
    })
    document.addEventListener("keyup", (event) => {
      this.keydownEventHandler(event, false)
    })
  }

  drawPaddle = (point: Point) => {
    this.renderer.drawRectangle(point.x, point.y, this.paddleWidth, this.paddleHeight);
  };

  updatePosition(){
    const change = this.paddleSpeed/this.clock
    const downKeyPressed = this.downKeyPressed ? 1 :0
    const upKeyPressed = this.upKeyPressed ? 1 :0
    let changeY = downKeyPressed * change + 
      upKeyPressed * -change;
    this.position = this.position.add(new Point(0,changeY))
  }

  update(){
    this.updatePosition()
    this.drawPaddle(this.position)
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

  getPosition(){
    return this.position
  }

  getHeightWidth(){
    return [this.paddleHeight, this.paddleWidth]
  }
  
}
