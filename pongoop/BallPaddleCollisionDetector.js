export default class BallPaddleCollisionDetector {
  constructor(ball,leftPaddle, rightPaddle){
    this.ball = ball
    this.leftPaddle = leftPaddle
    this.rightPaddle = rightPaddle
  }

  pointInRectangle(point, rect){
    [x,y] = point
    
  }

  checkPaddleCollision(paddle){
    const paddlePosition = paddle.getPosition()
    const paddleHeightWidth = paddle.getHeightWidth()
    const paddleRectangle = [paddlePosition]

    const ballLocation = this.ball.getPosition()
    const topLeftCorner = ballLocation
    const corners = [[this.x,this.y], 
      [this.x+this.ballSize, this.y],
      [this.x,this.y+this.ballSize],
      [this.x+this.ballSize, this.y+this.ballSize]]
    
    corners.map((corner) => {
      
    })


    if(topLeftVerticalCollision && topLeftHorizontalCollision){
      this.velocity[0] = -this

    }
}
