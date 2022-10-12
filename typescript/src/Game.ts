import Renderer from './Renderer'
import GameStage from './GameStage'

export default class Game {
  currentStage;
  clock=20 // adjusts frame rate
  renderer: Renderer
  constructor() {
    let elem: HTMLCanvasElement = document.getElementById("pong") as HTMLCanvasElement;
    this.renderer = new Renderer(elem)
    this.currentStage = new GameStage(this.renderer, this.clock)
    document.addEventListener("nextFrame", () => {
      this.next()
    })
  }

  next(){
    this.renderer.resetCanvas()
    this.currentStage.next()
    setTimeout(() => {
      const event = new CustomEvent("nextFrame");
      document.dispatchEvent(event)
    }, this.clock)
  }
}
