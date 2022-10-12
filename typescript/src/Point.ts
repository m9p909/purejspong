export default class Point {
  constructor(public x: number | undefined,public y: number | undefined){}

  add(other: Point){
    if(!(this.x && this.y)){
      throw new Error("X or Y is undefined x: "+this.x+" y: "+this.y);
    }
    if(!(other.x && other.y)){
      throw new Error("X or Y is undefined on other x: "+this.x+" y: "+this.y);
    }
      return new Point(other.x+this.x, other.y+this.y)
  }

  private getDefined(val: any){
    if(val != undefined){
      return val
    } else {
      throw new Error("Cannot get undefined")
    }

  }

  getX(): number {
    return this.getDefined(this.x)
  }

  getY(): number {
    return this.getDefined(this.y)
  }
}
