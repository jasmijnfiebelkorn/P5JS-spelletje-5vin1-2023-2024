function setup() {
  canvas = createCanvas(450,450);
  canvas.parent();
  textFont("Verdana");
  textSize(14);
  noStroke();
  //noLoop();
}

function draw() {
  background('lavender');
  fill('black');
  text(mouseX + mouseY)
  fill('indianred');
  ellipse(width/2,height/2,10);
}