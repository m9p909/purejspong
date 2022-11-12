import Renderer from './Renderer'
import GameStage from './GameStage'

export default class Game {
  currentStage;
  clock = 20 // adjusts frame rate
  renderer: Renderer
  constructor() {
    let elem: HTMLCanvasElement = document.getElementById("pong") as HTMLCanvasElement;
    this.renderer = new Renderer(elem)
    this.currentStage = new GameStage(this.renderer, this.clock)
  }

  next() {
    this.renderer.resetCanvas()
    this.currentStage.next()
    window.requestAnimationFrame(this.next.bind(this))
  }
}
