import Renderer from "./Renderer"
import ScoreBoard from "./ScoreBoard"
import Point from "./Point"
import Vector from "./Vector"


export default class Ball {
  ballSize=30
  initialVelocity = new Vector(-60, 40) // px/s
  initialPostition = new Point(500,250)
  velocity =  new Vector(this.initialVelocity.x, this.initialVelocity.y)
  position = new Point(this.initialPostition.x, this.initialPostition.y)

  constructor(private renderer: Renderer,
              private clock: number ,
              private scoreboard: ScoreBoard){
  }

  drawBall = (point: Point) => {
    this.renderer.drawRectangle(point.x, point.y, this.ballSize, this.ballSize);
  };

  applyVelocity(){
    const seconds = this.clock/1000
    const changePos = this.velocity.times(seconds)
    this.position = this.position.add(changePos)
  }

  checkSideCollisions(){
    const renderer = this.renderer
    const leftScored = this.position.x >= renderer.getCanvasWidth()-this.ballSize
    const rightScored =this.position.x <= 0
    if( leftScored || rightScored ){
      this.position = this.initialPostition
      this.velocity.x = - this.velocity.y
      if(leftScored){
        this.scoreboard.leftScored()
      } else {
        this.scoreboard.rightScored()
      }
    }

    if(this.position.y >= renderer.getCanvasHeight()-this.ballSize || 
      this.position.y <= 0){
      this.velocity.y = - this.velocity.y
    }
  }


  update() {
    this.applyVelocity()
    this.checkSideCollisions()
    this.drawBall(this.position)
  }

  getPosition() {
    return this.position
  }
}
