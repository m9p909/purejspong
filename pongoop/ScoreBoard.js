export default class ScoreBoard {
  score = [0,0]
  constructor(renderer){
    this.renderer = renderer
  }

  rightScored(){
      this.score[1]++
    console.log(this.score)
  }

  leftScored(){
      this.score[0]++
     console.log(this.score)
  }

  update(){
    //not sure how to render this yet
  }
}
