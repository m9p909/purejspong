import Ball from "./Ball"
import Paddle from "./Paddle"
import Point from "./Point"

export default class BallPaddleCollisionDetector {

  constructor(private ball: Ball,
              private leftPaddle: Paddle, 
              private rightPaddle: Paddle){
  }

  pointInRectangle(point: Point, rect: Point[]){
    
  }

  checkPaddleCollision(paddle: Paddle, ball: Ball){
    const paddlePosition = paddle.getPosition()
    const paddleHeightWidth = paddle.getHeightWidth()
    const paddleRectangle = [paddlePosition]

    const ballLocation = this.ball.getPosition()
    const topLeftCorner = ballLocation
    const ballX = ball.position.getX()
    const ballY = ball.position.getY()
    const corners = [[ballX,ballY], 
      [ballX+ball.ballSize, ballY],
      [ballX,ballY+ball.ballSize],
      [ballX+ball.ballSize, ballY+ball.ballSize]]
    
    corners.map((corner) => {
      
    })

  }

}
