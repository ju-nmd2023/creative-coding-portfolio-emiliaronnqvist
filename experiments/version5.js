//The following code is inspired by https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(129, 91, 67);
  stroke(207, 185, 151);
  strokeWeight(0.8);
  noFill();
  noiseSeed(24);
}

let scale = 50;
let resolution = 0.009;
let numPoints = 100;

let radius = 250;
let numRings = 130;

function draw() {
  translate(innerWidth / 2, innerHeight / 2 - 30);
  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (a = 0; a < TWO_PI; a += TWO_PI / numPoints) {
      var x = r * cos(a);
      var y = r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);
    }
    endShape(CLOSE);
  }
  noLoop();
}
