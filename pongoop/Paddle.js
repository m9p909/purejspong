
export default class Paddle {
  paddleWidth=50
  paddleHeight=100
  paddleSpeed=50 // px per s
  downKeyPressed=false
  upKeyPressed=false

  constructor(renderer, {keyup,keydown,position,clock}){
    this.renderer = renderer
    this.keydown = keydown
    this.keyup = keyup
    this.position = position
    this.position.x = x ? x : this.renderer.getCanvasWidth()-this.paddleWidth-10;
    this.clock = clock
    document.addEventListener("keydown", (event) => {
      this.keydownEventHandler(event, true)
    })
    document.addEventListener("keyup", (event) => {
      this.keydownEventHandler(event, false)
    })

    this.paddleY = this.renderer.getCanvasHeight()/2
  }

  drawPaddle = (x, y) => {
    this.renderer.drawRectangle(x, y, this.paddleWidth, this.paddleHeight);
  };

  updatePosition(){
    const change = this.paddleSpeed/this.clock
    let changeY = this.downKeyPressed * change + 
      this.upKeyPressed * -change;
    this.y = this.y + changeY
  }

  update(){
    this.updatePosition()
    this.drawPaddle(this.x,this.y)
  }

  keydownEventHandler(event,down) {
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
    return [this.x, this.y]
  }

  getHeightWidth(){
    return [this.height, this.width]
  }
  
}
