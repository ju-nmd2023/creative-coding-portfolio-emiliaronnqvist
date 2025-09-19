function setup() {
  createCanvas(400, 400);
  background(255);
  stroke(20);
  strokeWeight(1);
  noFill();
}

let scale = 50;
let resolution = 0.002;
let numPoints = 500;

let radius = 150;
let numRings = 40;
function draw() {
  for (r = 0; r < radius; r += radius / numRings) {
    beginShape();
    for (
      a = -TAU / numPoints;
      a < TAU + TAU / numPoints;
      a += TAU / numPoints
    ) {
      var x = width / 2 + r * cos(a);
      var y = height / 2 + r * sin(a);

      var n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);

      if (random() > 0.75 - 0.25 * sin(r)) {
        endShape();
        beginShape();
      }
    }
    endShape();
  }
  noLoop();
}
