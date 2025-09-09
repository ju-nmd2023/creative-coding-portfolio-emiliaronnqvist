function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  noStroke();
}

const size = 10;
const divider = 1;
const numRows = 100;
const numCols = 100;

function draw() {
  background(0);

  //mitten av canvas
  const circleX = width / 2;
  const circleY = height / 2;
  // radien på ramen
  const maxRadius = 250;

  noStroke();
  fill(0);

  //loop genom alla rader i grid
  for (let y = 0; y < numRows; y++) {
    //loop genom alla kolumner i grid
    for (let x = 0; x < numCols; x++) {
      //exakt position för små cirklarna
      let smallcircleX = x * size + size / 2;
      let smallcircleY = y * size + size / 2;

      // avståndet från mitten (ramen)
      let frame = dist(smallcircleX, smallcircleY, circleX, circleY);

      //rita bara cirklar om de ligger innanför ramen
      if (frame < maxRadius) {
        fill(255, random(150), random(200));
        const value = noise(x / divider, y / divider) * size;
        ellipse(smallcircleX, smallcircleY, value);
      }
    }
  }
}
