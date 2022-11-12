import Renderer from "./Renderer"
import ScoreBoard from "./ScoreBoard"
import Point from "./Point"
import Vector from "./Vector"
import Rectangle from './Rectangle'


export default class Ball implements Rectangle {
  ballSize=30
  public width;
  public height;
  initialVelocity = new Vector(-300, 100) // px/s
  initialPostition = new Point(500,250)
  velocity =  new Vector(this.initialVelocity.x, this.initialVelocity.y)
  pos = new Point(this.initialPostition.x, this.initialPostition.y)

  constructor(private renderer: Renderer,
              private clock: number ,
              private scoreboard: ScoreBoard){
                this.width = this.ballSize;
                this.height = this.ballSize;
  }

  drawBall = () => {
    this.renderer.drawRectangle(this);
  };

  applyVelocity(){
    const seconds = this.clock/1000
    const changePos = this.velocity.times(seconds)
    this.pos = this.pos.add(changePos)
  }

  checkSideCollisions(){
    const renderer = this.renderer
    const leftScored = this.pos.x >= renderer.getCanvasWidth()-this.ballSize
    const rightScored =this.pos.x <= 0
    if( leftScored || rightScored ){
      this.pos = this.initialPostition
      this.velocity.y = -this.velocity.y
      this.reverseHorizontal()
      if(leftScored){
        this.scoreboard.leftScored()
      } else {
        this.scoreboard.rightScored()
      }
    }

    if(this.pos.y >= renderer.getCanvasHeight()-this.ballSize || 
      this.pos.y <= 0){
      this.velocity.y = - this.velocity.y
    }
  }

  reverseHorizontal(){
    this.velocity.x = -this.velocity.x;
  }


  update() {
    this.applyVelocity()
    this.checkSideCollisions()
  }

  render(){
    this.drawBall()
  }

  getPosition() {
    return this.pos
  }
}
