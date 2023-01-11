import Rectangle from "./Rectangle"

export default class Renderer {
  ctx: CanvasRenderingContext2D
  elem: HTMLCanvasElement
  constructor(elem: HTMLCanvasElement) {
    this.elem = elem
    const ctx = elem.getContext("2d")
    if (ctx) {
      ctx.font = "48px arial"
      this.ctx = ctx
    } else {
      throw new Error("ctx must be a canvas element with 2d context")
    }
  }

  drawRectangle(rect: Rectangle) {
    this.ctx.beginPath();

    this.ctx.rect(rect.pos.x, rect.pos.y, rect.height, rect.width);

    this.ctx.stroke();
  };

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
  };

  getCanvasHeight() {
    return this.elem.height;
  }

  getCanvasWidth() {
    return this.elem.width
  }

  drawText(text: string, x: number, y: number) {
    this.ctx.fillText(text, x, y)
  }





}
