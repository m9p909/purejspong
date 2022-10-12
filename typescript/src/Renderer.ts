export default class Renderer {
  ctx: CanvasRenderingContext2D
  elem: HTMLCanvasElement
  constructor(elem: HTMLCanvasElement){
    this.elem = elem
    const ctx = elem.getContext("2d")
    if(ctx){
      this.ctx = ctx
    } else {
      throw new Error("ctx must be a canvas element with 2d context")
    }
  }

  drawRectangle(x: number, y: number, w:number, h:number){
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
