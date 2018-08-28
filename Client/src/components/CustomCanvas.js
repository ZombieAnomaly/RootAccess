import React, { Component } from 'react';
import Verlet from '../Utilities/Verlet';
import Vector from '../Utilities/Vector';

class CustomCanvas extends Component{

    constructor(props){
        super(props);
        this.canvas;
        this.context;
        this.particles = [];

        this.draw = this.draw.bind(this);
        this.resize = this.resize.bind(this);
    }

    componentDidMount(){
        this.canvas = document.getElementById("C");
        this.context = this.canvas.getContext("2d");
        this.resize(true);
        this.draw();
        window.addEventListener("resize", this.resize);
    }

    // Transliteration of pythons itertools.combinations
    *combinations(iterable, r) {
        let pool    = Array.from(iterable),
            n       = pool.length,
            indices = [],
            i, j;
        
        if(r > n) return;
        
        for(i = 0; i < r; i++) indices.push(i);
        
        yield indices.map((idx) => pool[idx]);
        
        while(true) {
          for(i = r - 1; i >= 0; i--) if(indices[i] != i + n - r) break;
          if(!(i >= 0)) return;
          indices[i] += 1;
          for(j = i+1; j < r; j++) indices[j] = indices[j-1] + 1;
          
          yield indices.map((idx) => pool[idx]);
        }
    }

    draw() {
        let i, j;
        this.canvas.width += 0;
        
        this.context.strokeStyle = this.context.fillStyle = "green";
        
        for(i = 0; i < this.particles.length; i++) {
          let p1 = this.particles[i];
          for(j = i+1; j < this.particles.length; j++) {
            let p2 = this.particles[j];
            
            let distance = Vector.distance(p1, p2);
            if(distance > 90) continue;
            //context.globalAlpha = 1 - distance / 200;
            this.context.lineWidth = 1 - distance / 100;
            this.context.beginPath();
            this.context.moveTo(p1.x, p1.y);
            this.context.lineTo(p2.x, p2.y);
            this.context.stroke();
          }
        }
        
        this.context.globalAlpha = 1;
        for(let i = 0; i < this.particles.length; i++) {
          let point = this.particles[i];
        //for(let point of particles) {
        this.context.rect(point.x - 1, point.y - 1, 2, 2);
        point.step();
          
        if (0 > point.x) point.x = -(point.prev.x = point.x);
        if (point.x > this.canvas.width) point.x -= (point.prev.x = point.x) - this.canvas.width;
        
        if (0 > point.y) point.y = -(point.prev.y = point.y);
        if (point.y > this.canvas.height) point.y -= (point.prev.y = point.y) - this.canvas.height;
        }
        this.context.fillStyle = "white";
        this.context.fill();
        requestAnimationFrame(this.draw);
    }

    resize(bool) {
        this.canvas.width = window.innerWidth
        this.canvas.height= window.innerHeight;
        if(bool == true){this.canvas.height = window.innerHeight;}
        this.particles = [];
        for(let i = 0; i < Math.min(this.canvas.width, this.canvas.height) / 2; i++) {
          let particle = new Verlet(this.canvas.width * Math.random(), this.canvas.height * Math.random());
          let r = Math.PI * 2 * Math.random()
          particle.prev.iadd(new Vector(
            Math.cos(r),
            Math.sin(r)
          ));
          this.particles.push(particle);
        }
    }

      render(){
        return(<canvas id="C"></canvas>);
      }
    
}

export default CustomCanvas;

