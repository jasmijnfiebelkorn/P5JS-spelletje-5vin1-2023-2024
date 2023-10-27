var playerleven = 1
class ExtraLife  0

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
    this.speed = random(0.05, 0.1);
      this.prevX = this.x;
      this.prevY = this.y;
    }

  
  toon() {
    image(bomPlaatje, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
  beweeg() {
     this.prevX = this.x;
      this.prevY = this.y;
      this.y += this.direction * raster.celGrootte * this.speed;
      if (this.y <= 0 || this.y >= height - raster.celGrootte) {
        this.direction *= -1;
      }
    }
   isColliding(entity) {
     const collidedWithEntity =
       this.x + raster.celGrootte > entity.x &&
       this.x < entity.x + raster.celGrootte &&
       this.y + raster.celGrootte > entity.y &&
       this.y < entity.y + raster.celGrootte;
     const traveledThroughEntity =
       (this.x >= entity.prevX && this.x <= entity.prevX + raster.celGrootte) ||
       (this.y >= entity.prevY && this.y <= entity.prevY + raster.celGrootte);
     return collidedWithEntity || traveledThroughEntity;
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
  
    
  
  wordtGeraakt(vijand, Counter) { 
    if (this.x === vijand.x && this.y === vijand.y) {
      this.lifes = -1;
    }
  }

  
  staatOp(bommenLijst) {
    for (var b = 0; b < bommenLijst.length; b++) {
      if (bommenLijst[b].isColliding(this)) {
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
  brug = loadImage("images/imageforest.jpg");
  bomPlaatje = loadImage("images/sprites/bom_100px.png"); 
  eveAnimatie = [];
  for (let i = 0; i < 5; i++) {
    eveAnimatie.push(loadImage(`images/sprites/Eve100px/Eve_${i}.png`));
  }
  appelPlaatje = loadImage("images/sprites/appel_1.png")
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
  placeAppel();
}


function placeAppel() {
  appelX = floor(random(1, raster.aantalKolommen - 1)) * raster.celGrootte;
  appelY = floor(random(1, raster.aantalRijen - 1)) * raster.celGrootte;
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

  image(appelPlaatje, appelX, appelY, raster.celGrootte, raster.celGrootte);

  
  if (!extraLife.collected && dist(eve.x, eve.y, extraLife.x, extraLife.y) < raster.celGrootte) {
    extraLife.collected = true;
    playerleven++;
  
  
  
  if (alice.x === bob.x && alice.y === bob.y) { 
    alice.beweeg(); 
  }

  fill ('white');
  textSize(20);
  text("Levens: " + playerleven, 20, 50);
  
          if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.wordtGeraakt(bommenArray) || eve.staatOp(bommenArray)){
        playerleven -= 1;
      if (playerleven <= 0){
        background("red")
        fill ("black")    
        textSize(250);
        text ("Je hebt verloren!!",10,375)
        noloop();
      }
     
   }

  }
  
  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!", 30, 300);
    noLoop();
  }
}
