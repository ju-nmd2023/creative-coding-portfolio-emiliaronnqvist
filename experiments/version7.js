//The following code is adapted from https://codepen.io/pixelkind/pen/OJrRzOm
class Agent {
  constructor(x, y, maxSpeed, maxForce, color) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.color = color;
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
    strokeWeight(0.4);
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
  background(110, 5, 0);
  field = generateField();
  generateAgents();
}
function generateField() {
  let field = [];
  noiseSeed(Math.random() * 50);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const rotation = noise(x / divider, y / divider) * PI - PI / 2;
      field[x].push(p5.Vector.fromAngle(-HALF_PI + rotation));
    }
  }
  return field;
}
function generateAgents() {
  for (let i = 0; i < 900; i++) {
    let colour = color(255, 100, 0, 20);
    let agent = new Agent(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      17,
      3,
      colour
    );
    agents.push(agent);
  }
}
const fieldSize = 10;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 4;
let field;
let agents = [];

function draw() {
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
