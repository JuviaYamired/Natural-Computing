rate = 10;

var rooms = [ [ -1, -1, -1, -1, 0, -1 ], 
              [ -1, -1, -1, 0, -1, 100 ], 
              [ -1, -1, -1, 0, -1, -1 ], 
              [ -1, 0, 0, -1, 0, -1 ],
              [ 0, -1, -1, 0, -1, 100 ],
              [ -1, 0, -1, -1, 0, 100 ] ];

var qTraining = [ [ 0, 0, 0, 0, 0, 0 ], 
                  [ 0, 0, 0, 0, 0, 0 ], 
                  [ 0, 0, 0, 0, 0, 0 ], 
                  [ 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0 ] ];

function setup() {
    createCanvas(700, 700);
    frameRate(rate);
    noLoop();    
}

function draw() {
    
}



function randInt(x){
    return floor(random(x));
}