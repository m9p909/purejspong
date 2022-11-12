export default class Point {
  constructor(public x: number, public y: number) { }

  add(other: Point) {
    return new Point(other.x + this.x, other.y + this.y)
  }

  private getDefined(val: any) {
    if (val != undefined) {
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
