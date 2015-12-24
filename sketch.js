var flowers = [];
var stems = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode (HSB, 200);
  background(0);
}

function draw() {
  for (var i = 0; i < stems.length; i++) {
    stems[i].draw(i);
  }
}

function mouseClicked() {
  var newStem = new stem (mouseX, mouseY);
  stems.push(newStem);
}

var rose = function (x, y) {
  this.rad = 0;
  this.noiseCounter = random(100000);
  this.posX = x;
  this.posY = y;

  this.draw = function() {
    push();
    translate (this.posX, this.posY);
    if (this.rad < 65) {
      noFill();
      strokeWeight(1);
      stroke (0, 200, this.rad*3);
      for (var i = 0; i <= 360; i++) {
        if (i > 0) {
          var noiseAB = noise(cos(radians(i-1))*2+this.noiseCounter, sin(radians(i-1))*2+this.noiseCounter);
          var noiseCD = noise(cos(radians(i))*2+this.noiseCounter, sin(radians(i))*2+this.noiseCounter);
          var a = cos(radians(i-1)) * (this.rad + (noiseAB*this.rad));
          var b = sin(radians(i-1)) * (this.rad + (noiseAB*this.rad));
          var c = cos(radians(i)) * (this.rad + (noiseCD*this.rad));
          var d = sin(radians(i)) * (this.rad + (noiseCD*this.rad));
          line (a, b, c, d);
        }
      }
      this.rad+=0.1;
      this.noiseCounter+=0.01;
    }
    pop();
  }
}

var stem = function (x, y) {
  var finalPosX = x;
  var finalPosY = y;
  var initPosX = x + (random(-150, 150));
  //var initPosX = window.innerWidth/2 + (random(-100, 100));
  var initPosY = window.innerHeight+50;
  var size;
  var steps = 0;
  var posX = initPosX;
  var posY = initPosY;
  var lastPosX = posX;
  var lastPosY = posY;
  var flowerIsDrawing = false;

  this.draw = function(index) {
    if (abs(posY-finalPosY) > 5) {

      posX = posX * 0.99 + finalPosX * 0.01;
      posY = posY * 0.97 + finalPosY * 0.03;

      stroke(50, 180, 70*(2-steps));
      strokeWeight(size);
      line (lastPosX, lastPosY, posX, posY);

      steps+=0.01;
      size = 8.0 * (2-steps);

      lastPosX = posX;
      lastPosY = posY;

    } else if ( flowerIsDrawing == false ) {
      var newRose = new rose(posX, posY);
      flowers.push(newRose);
      flowerIsDrawing = true;
      //flowers[index].isDrawing = true;
    } else {
      flowers[index].draw();
    }
  }
}
