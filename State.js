class State {
  constructor(_dancer) {
    this.dancer = _dancer;
    this.r;
    this.tx;
    this.ty;
    this.sx;
    this.sy;
    this.tri;
    this.count;

    this.morphs = [];
    this.itr;
  }

  setup(_s) {
    this.count = 0;
    this.setupMorphs(_s);

    if (this.morphs.length == 0) { // nothing to do
      this.dancer.onStateEnd(this);
      return;
    }

    this.itr = 0;
    this.nextMorph();
  }

  setupMorphs(_s) { };

  nextMorph() {
    let m = this.morphs[this.itr];
    m.start();
  }

  onMorphEnd(m) {
    this.itr += 1;
    if (this.itr < this.morphs.length) {
      this.nextMorph();
    } else {
      this.dancer.onStateEnd(this);
    }
  }

  draw(c, tense) {
    push();

    noFill();

    translate(this.tx.get(tense), this.ty.get(tense));
    rotate(this.r.get(tense));

    stroke(c);
    strokeWeight(2 / sc);
    this.drawRect(this.sx.get(tense), this.sy.get(tense), this.tri.get(tense), QUADS);

    noStroke();
    fill(255);
    this.drawRect(this.sx.get(tense), this.sy.get(tense), this.tri.get(tense));

    pop();
  }

  drawRect(x, y, tri, mode) {
    if(mode === undefined) {
      ellipse(map(tri, 0, 1, x, 0), map(tri, 0, 1, y, 0), 0.1);
      ellipse(-x, y, 0.1);
      ellipse(-x, -y, 0.1);
      ellipse(x, -y, 0.1);
    }
    else {
      beginShape(mode);
      vertex(map(tri, 0, 1, x, 0), map(tri, 0, 1, y, 0));
      vertex(-x, y);
      vertex(-x, -y);
      vertex(x, -y);
      endShape(CLOSE);
    }
  }
}

class PointState extends State {
  constructor(_dancer) {
    super(_dancer);
  }

  setupMorphs(_s) {
    let _r, _tx, _ty, _sx, _sy, _tri;
    if (_s == null) {
      _r = 0;
      _tx = 0;
      _ty = 0;
      _sx = 0;
      _sy = 0;
      _tri = 0;
    } else {
      _r = _s.r.t;
      _tx = _s.tx.t;
      _ty = _s.ty.t;
      _sx = _s.sx.t;
      _sy = _s.sy.t;
      _tri = _s.tri.t;
    }
    let rEnd = 0;
    if (_s == null) {//} || _s.getClass().getName().equals("Pathrefinder$PointState")) {
      this.r = new Morph(this, rEnd, rEnd);
    } else {
      this.r = new Morph(this, _r, rEnd);
    }
    this.tri = new Morph(this, _tri, 0); // TODO: I don't like this to be in the beginning
    this.tx = new Morph(this, _tx, floor(random(-grid.nx, grid.nx)));
    this.ty = new Morph(this, _ty, floor(random(-grid.ny, grid.ny)));
    this.sx = new Morph(this, _sx, 0);
    this.sy = new Morph(this, _sy, 0);
  }
}

class LineState extends State {
  constructor(_dancer) {
    super(_dancer);
  }

  setupMorphs(_s) {
    let _r, _tx, _ty, _sx, _sy, _tri;
    if (_s == null) {
      _r = 0;
      _tx = 0;
      _ty = 0;
      _sx = 0;
      _sy = 0;
      _tri = 0;
    } else {
      _r = _s.r.t;
      _tx = _s.tx.t;
      _ty = _s.ty.t;
      _sx = _s.sx.t;
      _sy = _s.sy.t;
      _tri = _s.tri.t;
    }
    let rEnd = 0.5 * PI * floor(random(0, 2));
    if (_s == null) {// || _s.getClass().getName().equals("Pathrefinder$PointState")) {
      this.r = new Morph(this, rEnd, rEnd);
    } else {
      this.r = new Morph(this, _r, rEnd);
    }
    this.tx = new Morph(this, _tx, floor(random(-grid.nx, grid.nx)));
    this.ty = new Morph(this, _ty, floor(random(-grid.ny, grid.ny)));
    this.sx = new Morph(this, _sx, floor(random(1, grid.nx / 2)));
    this.sy = new Morph(this, _sy, 0);
    this.tri = new Morph(this, _tri, 0);
  }
}

class QuadState extends State {
  constructor(_dancer) {
    super(_dancer);
  }
  setupMorphs(_s) {
    let _r, _tx, _ty, _sx, _sy, _tri;
    if (_s == null) {
      _r = 0;
      _tx = 0;
      _ty = 0;
      _sx = 0;
      _sy = 0;
      _tri = 0;
    } else {
      _r = _s.r.t;
      _tx = _s.tx.t;
      _ty = _s.ty.t;
      _sx = _s.sx.t;
      _sy = _s.sy.t;
      _tri = _s.tri.t;
    }
    let rEnd = 0.5 * PI * floor(random(0, 2));
    if (_s == null){// || _s.getClass().getName().equals("Pathrefinder$PointState")) {
      this.r = new Morph(this, rEnd, rEnd);
    } else {
      this.r = new Morph(this, _r, rEnd);
    }
    this.tx = new Morph(this, _tx, floor(random(-grid.nx, grid.nx)));
    this.ty = new Morph(this, _ty, floor(random(-grid.ny, grid.ny)));
    this.sx = new Morph(this, _sx, floor(random(1, grid.nx / 2)));
    this.sy = new Morph(this, _sy, floor(random(1, grid.nx / 2)));
    this.tri = new Morph(this, _tri, 0);
  }
}

class TriState extends State {
  constructor(_dancer) {
    super(_dancer);
  }

  setupMorphs(_s) {
    let _r, _tx, _ty, _sx, _sy, _tri;
    if (_s == null) {
      _r = 0;
      _tx = 0;
      _ty = 0;
      _sx = 0;
      _sy = 0;
      _tri = 0;
    } else {
      _r = _s.r.t;
      _tx = _s.tx.t;
      _ty = _s.ty.t;
      _sx = _s.sx.t;
      _sy = _s.sy.t;
      _tri = _s.tri.t;
    }
    // allow 180, 270 as they are not symmetric
    let rEnd = 0.5 * PI * floor(random(0, 4));
    if (_s == null){// || _s.getClass().getName().equals("Pathrefinder$PointState")) {
      this.r = new Morph(this, rEnd, rEnd);
    } else {
      this.r = new Morph(this, _r, rEnd);
    }
    this.tx = new Morph(this, _tx, floor(random(-grid.nx, grid.nx)));
    this.ty = new Morph(this, _ty, floor(random(-grid.ny, grid.ny)));
    this.sx = new Morph(this, _sx, floor(random(1, grid.nx / 2)));
    this.sy = new Morph(this, _sy, floor(random(1, grid.nx / 2)));
    this.tri = new Morph(this, _tri, 1);
  }
}