class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    iadd({x, y}) {
      this.x += x;
      this.y += y;
    }
    
    add({x, y}) {
      return new Vector(this.x + x, this.y + y);
    }
    
    idiv({x, y}) {
      this.x /= x;
      this.y /= y;
    }
    
    imul({x, y}) {
      this.x *= x;
      this.y *= y;
    }
    
    simul(n) {
      this.x *= n;
      this.y *= n;
    }
    
    norm() {
      let magnitude = this.length;
      return new Vector(this.x / magnitude, this.y / magnitude);
    }
    
    inorm() {
      let magnitude = this.length;
      this.x /= magnitude;
      this.y /= magnitude;
    }
    
    sub({x, y}) {
      return new Vector(this.x - x, this.y - y);
    }
    
    get length() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    
    static distance(a, b) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }
}

export default Vector;