export default class Renderer {
  constructor(elem){
    this.ctx = elem.getContext("2d")
    this.elem = elem
  }

  drawRectangle(x, y, w, h){
    this.ctx.beginPath();

    this.ctx.rect(x, y, w, h);

    this.ctx.stroke();
  };

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
  };

  getCanvasHeight(){
    return this.elem.height;
  }

  getCanvasWidth(){
    return this.elem.width
  }


}
