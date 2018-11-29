var w = 2;
var cells;

var generation = 0;
var maxGeneration = 255;
var ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

function setup() {
  createCanvas(1260, 800);
  cells = Array(floor(width/w));
  for (var i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }
  cells[cells.length/2] = 1;

}

function draw() {
  if(generation < maxGeneration){
    for (var i = 0; i < cells.length; i++) {
        //draw squares
        if (cells[i] === 1) {
          fill(200);
        } else {
          fill(51);
          noStroke();
          rect(i*w, generation*w, w, w);
        }
      }
      if (generation < height/w) {
        generate();
      }
  }
}

function generate() {
  var nextgen = Array(cells.length);

  for (var i = 1; i < cells.length-1; i++) {
    var left   = cells[i-1];
    var me     = cells[i];
    var right  = cells[i+1]; 
    nextgen[i] = rules(left, me, right);
  }
  
  cells = nextgen;
  console.log(generation);
  generation++; 
}

function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
  return 0;
}