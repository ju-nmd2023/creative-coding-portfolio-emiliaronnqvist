//The following code is inspired by https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(207, 185, 151);
  stroke(129, 91, 67);
  strokeWeight(1);
  noFill();
  noiseSeed(24);
}

let scale = 50;
let resolution = 0.009;
let numPoints = 100;

let radius = 143;
let numRings = 60;

function draw() {
  push();
  stroke(129, 91, 67);
  strokeWeight(4);
  line(width / 2, height / 2 - 150, width / 2, height / 2 + 150);
  pop();
  push();
  translate(width / 2 + 35, height / 2 - 419);
  rotate(0.78);

  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (a = 0; a < TWO_PI; a += TWO_PI / numPoints) {
      var x = 150 + r - cos(a);
      var y = 200 + r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);
    }
    endShape(CLOSE);
  }
  pop();
  noLoop();
}
