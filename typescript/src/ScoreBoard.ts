import Renderer from "./Renderer"

export default class ScoreBoard {
  score = [0, 0]
  constructor(private renderer: Renderer) {
  }

  rightScored() {
    this.score[1]++
    console.log(this.score)
  }

  leftScored() {
    this.score[0]++
    console.log(this.score)
  }

  render() {
    //not sure how to render this yet
    this.renderer.drawText(`${this.score[0]}:${this.score[1]}`, this.renderer.getCanvasWidth() / 2 - 50, this.renderer.getCanvasHeight() / 8)
  }
}
