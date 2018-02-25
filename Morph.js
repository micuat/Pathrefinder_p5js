class Morph {
  constructor(_state, _tStart, _tEnd, _t) {
    this.state = _state;
    this.tEnd = _tEnd;

    if (_t === undefined) {
      this.t = this.tStart = _tStart;
    }
    else {
      this.tStart = _tStart;
      this.t = _t;
    }

    if (this.tStart != this.tEnd) {
      this.state.morphs.push(this);
    }
  }

  start() {
    console.log(this)
    this.t = this.tStart;
    if (this.tStart != this.tEnd)
      this.ani(this, 2, "t", this.tEnd, 0);
    // Ani.to(this, 2, "t", tEnd, Ani.QUART_IN_OUT, "onStart:onStart, onEnd:onEnd");
    else {
      this.state.onMorphEnd(this);
    }
  }

  ani(self, duration, param, end, easing) {
    let start = self[param];
    let startTime = millis();
    let endTime = startTime + duration * 1000;
    let interval = setInterval(function () {
      let val = map(millis(), startTime, endTime, start, end);
      self[param] = val;
      if (millis() >= endTime) {
        self[param] = end;

        clearInterval(interval);
        self.onEnd();
      }
    }, 50);
  }

  onStart() {
  }

  onEnd() {
    this.state.onMorphEnd(this);
  }

  get(tense) {
    if (tense < 0) return this.tStart; // past
    else if (tense == 0) return this.t; // present
    else return this.tEnd; // future
  }

  p() {
    return (this.t - this.tStart) / (this.tEnd - this.tStart + 0.001);
  }
}