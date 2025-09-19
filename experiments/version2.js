//Following code is inspired på N
function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  noStroke();
}

const size = 1;
const divider = 20;
const numRows = 4000;
const numCols = 4000;

function draw() {
  background(32, 42, 68);

  //mitten av canvas
  const circleX = width / 2;
  const circleY = height / 2;
  // radien på ramen
  const maxRadius = 250;

  noStroke();
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
        fill(255);
        const value = noise(x / divider, y / divider) * size;
        ellipse(smallcircleX, smallcircleY, value);
      }
    }
  }
}
