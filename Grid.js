class Grid {
  constructor(_nx, _ny) {
    this.nnx = _nx;
    this.nny = _ny;
    this.nx = this.nnx - 5;
    this.ny = this.nny - 5;
  }

  draw() {
    for (let i = -this.nny; i <= this.nny; i++) {
      for (let j = -this.nnx; j <= this.nnx; j++) {
        stroke(255, 255);
        strokeWeight(1/sc);
        let d = 0.125;
        line(j - d, i, j + d, i);
        line(j, i - d, j, i + d);
      }
    }
  }
}