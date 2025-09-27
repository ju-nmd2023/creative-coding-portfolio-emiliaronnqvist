//The following code is inspired by https://codepen.io/pixelkind/pen/OJrRzOm
class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.color = color(255);
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (random() < 0.3) {
      this.velocity.rotate(0.1 - 0.2);
    }
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    stroke(this.color);
    strokeWeight(1.4);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );
    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  field = generateField();
  generateAgents();
}
function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}
function generateAgents() {
  for (let i = 0; i < 1 + random(2, 3); i++) {
    let agent = new Agent(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      2 + random(10, 15),
      29
    );
    agents.push(agent);
  }
}
const fieldSize = 5;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 10;
let field;
let agents = [];

function draw() {
  background(32, 42, 68, 25);
  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);
    const desiredDirection = field[x][y];
    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}

//music
const sineButton = document.getElementById("sine");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const attackInput = document.getElementById("attack");
const decayInput = document.getElementById("decay");
const sustainInput = document.getElementById("sustain");
const releaseInput = document.getElementById("release");
const buttonC = document.getElementById("buttonC");
const buttonD = document.getElementById("buttonD");
const buttonE = document.getElementById("buttonE");
const buttonF = document.getElementById("buttonF");
const buttonG = document.getElementById("buttonG");
const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");
const buttonC2 = document.getElementById("buttonC2");
const frequencyInput = document.getElementById("frequency");
const delayTimeInput = document.getElementById("delayTime");
const depthInput = document.getElementById("depth");

let chorus;
let synth;

window.addEventListener("load", () => {
  // Create Chorus effect and start
  chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
  //Create polySynth
  synth = new Tone.PolySynth().connect(chorus);
  // Set oscilliator to Sine
  synth.set({
    oscillator: {
      type: "sine",
    },
  });
});

sineButton.addEventListener("click", () => {
  synth.set({
    oscillator: {
      type: "sine",
    },
  });
});

attackInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      attack: attackInput.value,
    },
  });
});

decayInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      decay: decayInput.value,
    },
  });
});

sustainInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      sustain: sustainInput.value,
    },
  });
});

releaseInput.addEventListener("change", () => {
  synth.set({
    envelope: {
      release: releaseInput.value,
    },
  });
});

frequencyInput.addEventListener("change", () => {
  chorus.frequency.value = frequencyInput.value;
});

delayTimeInput.addEventListener("change", () => {
  chorus.delayTime = delayTimeInput.value;
});

depthInput.addEventListener("change", () => {
  chorus.depth = depthInput.value;
});

buttonC.addEventListener("click", async () => {
  await Tone.start();
  synth.triggerAttackRelease(["C3", "E3"], "4n");
});

buttonD.addEventListener("click", () => {
  synth.triggerAttackRelease(["D3", "F3"], "4n");
});

buttonE.addEventListener("click", () => {
  synth.triggerAttackRelease(["E3", "G3"], "4n");
});

buttonF.addEventListener("click", () => {
  synth.triggerAttackRelease(["F3", "A3"], "4n");
});

buttonG.addEventListener("click", () => {
  synth.triggerAttackRelease(["G3", "B3"], "4n");
});

buttonA.addEventListener("click", () => {
  synth.triggerAttackRelease(["A3", "C4"], "4n");
});

buttonB.addEventListener("click", () => {
  synth.triggerAttackRelease(["B3", "D4"], "4n");
});

buttonC2.addEventListener("click", () => {
  synth.triggerAttackRelease(["C4", "E4"], "4n");
});

window.addEventListener("click", () => {
  Tone.start().then(() => console.log("audio started"));
});
