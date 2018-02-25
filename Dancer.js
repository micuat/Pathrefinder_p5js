class Dancer {
  constructor() {
    this.states = new Array(8);
    this.curState = 0;
  
    this.trace = new Array(512);
    this.curTrace = 0;
  
    this.states[0] = this.randomState();
    this.states[0].setup(null);

    for (let i = 0; i < this.trace.length; i++) {
      this.trace[i] = createVector(100000, 100000);
    }
  }

  draw() {
    let s = this.states[this.curState];

    if (frameCount % 4 == 0) {
      this.trace[this.curTrace + 0].x = s.tx.t + (map(s.tri.t, 0, 1, s.sx.t, 0) * cos(s.r.t) - map(s.tri.t, 0, 1, s.sy.t, 0) * sin(s.r.t));
      this.trace[this.curTrace + 0].y = s.ty.t + (map(s.tri.t, 0, 1, s.sx.t, 0) * sin(s.r.t) + map(s.tri.t, 0, 1, s.sy.t, 0) * cos(s.r.t));
      this.trace[this.curTrace + 1].x = s.tx.t + (-s.sx.t * cos(s.r.t) - s.sy.t * sin(s.r.t));
      this.trace[this.curTrace + 1].y = s.ty.t + (-s.sx.t * sin(s.r.t) + s.sy.t * cos(s.r.t));
      this.trace[this.curTrace + 2].x = s.tx.t + (-s.sx.t * cos(s.r.t) + s.sy.t * sin(s.r.t));
      this.trace[this.curTrace + 2].y = s.ty.t + (-s.sx.t * sin(s.r.t) - s.sy.t * cos(s.r.t));
      this.trace[this.curTrace + 3].x = s.tx.t + (s.sx.t * cos(s.r.t) + s.sy.t * sin(s.r.t));
      this.trace[this.curTrace + 3].y = s.ty.t + (s.sx.t * sin(s.r.t) - s.sy.t * cos(s.r.t));
      this.curTrace = (this.curTrace + 4) % this.trace.length;
    }
    stroke(255, 0, 0);
    beginShape(POINTS);
    for (let v of this.trace) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);

    s.draw(color(255, 64), -1);
    s.draw(color(255, 255), 0);
    s.draw(color(255, 64), 1);
  }

  onStateEnd(prevS) {
    this.curState = (this.curState + 1) % this.states.length;
    this.states[this.curState] = this.randomState();
    this.states[this.curState].setup(prevS);
  }

  randomState() {
    let s;
    switch(floor(random(2))) {
      //    switch(floor(random(4))) {
    case 0:
      s = new PointState(this);
      break;
    case 1:
      s = new LineState(this);
      break;
    case 2:
      s = new QuadState(this);
      break;
    default:
      s = new TriState(this);
      break;
    }
    return s;
  }
}