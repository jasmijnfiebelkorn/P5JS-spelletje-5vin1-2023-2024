class Counter {
  constructor() {
    this.lifes = 3;
    this.x = 9
  }

  decreaseLife() {
    this.lifes--;
  }

  display() {
    textSize(24);
    fill('blue');
    text(`Lives: ${this.lifes}`, this.x, 30);
  }
}
let counter = new Counter();
function keyTyped() {
  if (key === ' ') {
    counter.decreaseLife();
  }
}


class Raster {
  constructor(r, k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0; rij < this.aantalRijen; rij++) {
      for (var kolom = 0; kolom < this.aantalKolommen; kolom++) {
        if (rij == 11) {
          fill('orange');
        } 
        else {
          noFill();
        }
         rect(kolom * this.celGrootte, rij * this.celGrootte, this.celGrootte, this.celGrootte);
        if (kolom == 17) {
          fill('orange');
        }
        else {
          noFill();
        }
        rect(kolom * this.celGrootte, rij * this.celGrootte, this.celGrootte, this.celGrootte);
      }
    }
    pop();
  }
}

class Bom {
  constructor() {
    this.x = floor(random(raster.aantalKolommen -9, raster.aantalKolommen)) * raster.celGrootte;
    this.direction = 5;
    this.y = floor(random(0, raster.aantalRijen)) * raster.celGrootte;
    this.speed = 0.2;
  }
  toon() {
    image(bomPlaatje, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
  beweeg() {
    this.y += this.direction * raster.celGrootte * this.speed;
    if (this.y <= 0 || this.y >= height - raster.celGrootte){
      this.direction *= -1;
     }
    }
}
class Jos {
  constructor() {
    this.x = 0;
    this.y = 200;
    this.animatie = [];
    this.frameNummer = 3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.aanDeBeurt = true;
    this.staOpBom = false;
  }
 beweeg() {
   if (keyIsDown(65)) { 
    this.x -= this.stapGrootte;
    this.frameNummer = 2;
  }
  if (keyIsDown(68)) { 
    this.x += this.stapGrootte;
    this.frameNummer = 1;
  }
  if (keyIsDown(87)) { 
    this.y -= this.stapGrootte;
    this.frameNummer = 4;
  }
  if (keyIsDown(83)) { 
    this.y += this.stapGrootte;
    this.frameNummer = 3;
  }
  this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
  this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  if (this.x === canvas.width - raster.celGrootte) {
    this.gehaald = true;
  }
}
  wordtGeraakt(vijand) {
    if (this.x === vijand.x && this.y === vijand.y) {
      return true;
    } else {
      return false;
    }
  }
  staatOp(bommenLijst) {
    for (var b = 0; b < bommenLijst.length; b++) {
      if (bommenLijst[b].x === this.x && bommenLijst[b].y === this.y) {
        this.staOpBom = true;
      }
    }
    return this.staOpBom;
  }
  toon() {
    image(this.animatie[this.frameNummer], this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}
class Vijand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }
  beweeg() {
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  }
  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}
var x;
var speed;
  speed = 10;
var bommenArray = [];
var eve;
var alice;
var bob;
var brug;
var bomPlaatje;
var eveAnimatie;
function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  bomPlaatje = loadImage("images/sprites/bom_100px.png");
  eveAnimatie = [];
  for (let i = 0; i < 5; i++) {
    eveAnimatie.push(loadImage(`images/sprites/Eve100px/Eve_${i}.png`));
  }
}
function setup() {
  canvas = createCanvas(900, 600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  raster = new Raster(12, 18);
  raster.berekenCelGrootte();
  for (var b = 0; b < 5; b++) {
    bommenArray.push(new Bom());

  }
  eve = new Jos();
  eve.stapGrootte = 1 * raster.celGrootte;
  eve.animatie = eveAnimatie;
  alice = new Vijand(700, 200);
  alice.stapGrootte = 1 * eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");
  bob = new Vijand(600, 400);
  bob.stapGrootte = 1 * eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");
}
function draw() {
  background(brug);
  raster.teken();
  for (var b = 0; b < bommenArray.length; b++) {
    bommenArray[b].beweeg();
    bommenArray[b].toon();
  }
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  
  eve.toon();
  alice.toon();
  bob.toon();

  counter.display();

  if (alice.x === bob.x && alice.y === bob.y) {
    bob.beweeg();
  }


  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.wordtGeraakt(bommenArray) || eve.staatOp(bommenArray)) {
    background('red');
    fill('white');
    text("Je hebt verloren!", 30, 300);
    noLoop();
    
  }
  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!", 30, 300);
    noLoop();
  }
}