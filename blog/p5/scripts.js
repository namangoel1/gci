var ex1 = function( s ) {
  s.setup = function() {

  }

  s.draw = function() {
    s.ellipse(50, 50, 80, 80);
  }
}

var one = new p5(ex1, 'ex1');


var ex2 = function( s ) {

  var opacity = 200;
  var step = 3;
  var round = 0;
  // Opacity, step, and round are used to 
  // make the star blink

  s.setup = function() {
    s.createCanvas(640, 480);
  }

  s.draw = function() {
    s.stroke(0, 0, 0, 0);
    s.background(30, 144, 255);

    // Increases/decreases opacity 
    // appropriately
    if ( round % 2 == 0 )
      opacity += step;
    else 
      opacity -= step;
    if ( opacity >= 255 || opacity <= 200 )
      round++;

    s.fill(255, opacity); // Change fill through (rgb, a)

    star(s.mouseX, s.mouseY); // Follow the mouse
  }

  function star(x, y) {
    // Modified p5 code to create
    // a 5-pointed star

    s.translate(x, y); // Sets origin to center of the star
    s.rotate(s.frameCount / 200); // Rotates the star 

    var angle = (Math.PI * 2) / 5;
    var halfAngle = angle/2.0;
    s.beginShape();
    for (var a = 0; a < Math.PI * 2; a += angle) {
      var sx = s.cos(a) * 50;
      var sy = s.sin(a) * 50;
      s.vertex(sx, sy);
      sx = s.cos(a+halfAngle) * 30;
      sy = s.sin(a+halfAngle) * 30;
      s.vertex(sx, sy);
    }
    s.endShape(s.CLOSE);
  }
}

var ex2 = new p5(ex2, 'ex2');


