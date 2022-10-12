import Point from "./Point"

export default class Vector extends Point{

  times(value: number){
    return new Vector(this.x*value, this.y*value)
  }
}
