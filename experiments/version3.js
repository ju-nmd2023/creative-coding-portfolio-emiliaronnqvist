//The following code is inspired by https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(207, 185, 151);
  stroke(129, 91, 67);
  strokeWeight(1);
  noFill();
  noiseSeed(69);
}

let scale = 40;
let resolution = 0.0045;
let numPoints = 1000;

let radius = 130;
let numRings = 25;

function draw() {
  beginShape();
  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (
      a = -TWO_PI / numPoints;
      a < TWO_PI + TWO_PI / numPoints;
      a += TWO_PI / numPoints
    ) {
      var x = width / 2 + r * cos(a);
      var y = height / 2 + r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);

      if (random() > 0.5 - 0.3 * sin(r)) {
        endShape();
        beginShape();
      }
    }
    endShape();
  }
  noLoop();
}
