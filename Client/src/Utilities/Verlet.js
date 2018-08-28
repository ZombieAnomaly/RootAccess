import Vector from './Vector';

class Verlet extends Vector {
    constructor(x, y) {
      super(x, y);
      this.prev = new Vector(x,y);
    }
    
    step() {
      let dx = this.x - this.prev.x,
          dy = this.y - this.prev.y;
      
      this.prev.x = this.x;
      this.prev.y = this.y;
      this.x += dx;
      this.y += dy;
    }
}

export default Verlet;