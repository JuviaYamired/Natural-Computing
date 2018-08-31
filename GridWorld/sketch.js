var sprite_ground;


var w;
var rows;
var columns;
var iteration;
var board = [];
var sprites = [];
var initialPopulation;
// Entity tier list
//                        0        1        2
var animals =           ['grass', 'rabbit', 'wolf'];
/* 
   #=====================================================================
   | SETTINGS
   |                                                                     
   | # of iterations needed to reproduction                                 
                        Tgrass  Trabbit  Twolf                                  */
var growIteration =     [20,     10,     12];
/*
   | # of childs born
   |                          Cchilds  Zchilds                                  */
var entityChilds =      [3,      7,     6];
/*
   | # of iteration needed to starve
   |                  Vgrass  Vrabbit  Vwolf                                    */
var hungerIteration =   [0,      6,      6];

/* | Set if do random actions                                                   */
var isRandom = false;

/* | Set the velocity of the simulation                                         */
var velocity = 30;

function preload(){
    sprite_ground = loadImage('assets/sprites/grass_02.png');
    sprites.push( loadImage('assets/sprites/grass_01.png') );
    sprites.push( loadImage('assets/sprites/nidoran_male_01.png') ); 
    sprites.push( loadImage('assets/sprites/poochyena_01.png') );
}

function setup() {
    createCanvas(770, 770);
    stroke(90);
    strokeWeight(2.5);
    frameRate(velocity);

    w = 70;
    rows = 10;
    columns = 10;
    
    iteration = 0;

    for( var i = 0; i < columns; i++){
        board[i] = [];
        for (var j = 0; j < rows; j++) {
            board[i][j] = [];
            for(var k = 0; k < animals.length; k++){
                initialPopulation = randInt(15);
                board[i][j][k] = new Entity(k, initialPopulation, entityChilds[k], growIteration[k],
                                            hungerIteration[k], sprites[k], w, i, j); 
            }
        }
    }
}

function draw() {
    iteration ++;    
    update();
    lifecycle();
}

function update() {
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            rect( i * w, j * w, w-1, w-1);
            image(sprite_ground, i * w, j * w, w, w);
            var dominant = 0;
            for(var k = 1; k < animals.length; k++){
                if(board[i][j][k].quantity > board[i][j][dominant].quantity){
                    //Determine the entity with more quantity of elements
                    dominant = k; 
                }
            }
            //Draws the dominant entity in the position i, j 
            board[i][j][dominant].show();           
        }
    }    
}

function lifecycle(){
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            for(var k = 0; k < animals.length; k++){
                board[i][j][k].do(randInt(3));
                board[i][j][k].reproduction();
                board[i][j][k].die();
                switch (k) {
                    case 0:
                        text('grass: ' + board[i][j][k].quantity, i * w + 5, j * w + 10);
                        break;
                    
                    case 1:
                        text('rabbit: ' + board[i][j][k].quantity, i * w + 5, j * w + w/2 + 2.5);
                        break;
                    case 2:
                        text('wolf: ' + board[i][j][k].quantity, i * w + 5, j * w + w - 5);
                        break;
                }                
            }
        }
    }
}

function randInt(x){
    return floor(random(x));
}