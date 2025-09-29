//This code is inspired by https://codepen.io/pixelkind/pen/VwqKyoP
class Particle {
  constructor(x, y, particleColor) {
    this.position = createVector(x, y);
    const a = Math.random() * Math.PI * 2;
    const v = 0.3 + Math.random();
    this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
    this.lifespan = 1 + Math.random() * 50;
    this.color = particleColor;
  }

  update() {
    this.lifespan--;

    this.velocity.mult(0.99);
    this.position.add(this.velocity);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(this.color);
    ellipse(0, 0, 6);
    pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);

  colorPalette = [
    color(255, 182, 193),
    color(135, 206, 250),
    color(144, 238, 144),
    color(255, 228, 181),
  ];
}

let particles = [];
let colorPalette;

function generateParticles(x, y) {
  for (let i = 0; i < 200; i++) {
    const px = x + random(-10, 10);
    const py = y + random(-10, 10);
    let particleColor = random(colorPalette);
    const particle = new Particle(px, py, particleColor);
    particles.push(particle);
  }
}

function draw() {
  background(32, 42, 68);

  for (let particle of particles) {
    particle.update();
    particle.draw();

    if (particle.isDead()) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }
}

function mouseClicked() {
  generateParticles(mouseX, mouseY);
}

let synth;

//Following one line was adapted from https://chatgpt.com/share/68d51069-73bc-8005-ac1d-0861224e6c6c
const noteArray = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

window.addEventListener("load", () => {
  synth = new Tone.PolySynth().toDestination();
  synth.set({
    oscillator: {
      type: "sine",
    },
  });

  window.addEventListener("click", async () => {
    await Tone.start();
    console.log("started");
  });

  window.addEventListener("click", () => {
    //Following 2 lines was adapted from https://chatgpt.com/share/68d51069-73bc-8005-ac1d-0861224e6c6c
    const randomNote = noteArray[Math.floor(Math.random() * noteArray.length)];
    synth.triggerAttackRelease(randomNote, "4n");
  });
});
