export default class Ball {
  ballSize=30
  initialVelocity = [-60, 40] // px/s
  initialPostition = [500, 250]
  velocity = this.initialVelocity
  position = this.initialPostition

  constructor({renderer,leftPaddle,rightPaddle,clock,scoreboard}){
    this.renderer = renderer
    this.leftPaddle = leftPaddle
    this.rightPaddle = rightPaddle
    this.clock = clock
    this.scoreboard = scoreboard
  }
  drawBall = (x, y) => {
    this.renderer.drawRectangle(x, y, this.ballSize, this.ballSize);
  };

  applyVelocity(){
    const seconds = this.clock/1000
    const changePos = [this.velocity[0]*seconds, this.velocity[1]*seconds]
    this.position = [this.position[0] + changePos[0], this.position[1] + changePos[1]]
  }

  checkSideCollisions(){
    const renderer = this.renderer
    const leftScored = this.position[0] >= renderer.getCanvasWidth()-this.ballSize
    const rightScored =this.position[0] <= 0
    if( leftScored || rightScored ){
      this.position = this.initialPostition
      this.velocity[0] = - this.velocity[0]
      if(leftScored){
        this.scoreboard.leftScored()
      } else {
        this.scoreboard.rightScored()
      }
    }

    if(this.position[1] >= renderer.getCanvasHeight()-this.ballSize || 
      this.position[1] <= 0){
      this.velocity[1] = - this.velocity[1]
    }
  }


  update() {
    this.applyVelocity()
    this.checkSideCollisions()
    this.drawBall(this.position[0],this.position[1])
  }

  getPosition() {
    return this.position
  }
}
