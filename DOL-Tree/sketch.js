var rate = 60; //Speed

//Activate activity3 angle calculation
var activity3 = true;

//False activate unexpected effect
var normalEffect = true;
var angle = 90;
var stateStack = [];

var angleIncreaseFactor = 22.5;
var figString = 'G[-F]G[+F]F';

angleIncreaseFactor = 22.5;
figString = 'F+[[G]-G]-F[-FG]+G';

//figString = 'FF+[+F-F-F]-[-F+F+F]';
//figString = 'F[+FFG][G]-FG';
/*
angleIncreaseFactor = 20;
figString = 'F[-G]F[+G]-G';
*/
/*
angleIncreaseFactor = 25.7;
figString = 'F[-G][+G]FG';
*/
//figString = 'FG[-F[G]-G][G+G][+F[G]+G]' 


var alphabet = '+-FG[]';
//var prodTable = ['G[-F]G[+F]F', 'GG', '[', ']'];
    
var    prodTable = ['F+[[G]-G]-F[-FG]+G', 'FF'];

var defaultX = 350;
var defaultY = 700;
var posX = defaultX;
var posY = defaultY;
var branchSize = 1;
var maxIt = 5;
var it = 0;
var wind = 1;
function setup() {
    createCanvas(700, 700);
    frameRate(rate);
    //noLoop();    
}

function draw() {
    if(it < maxIt){
        //Reset values for next iteration
        clear();
        stateStack = [];
        posX = defaultX;
        posY = defaultY;
        angle = 90;

        for(var i = 0; i < figString.length; ++i){
            parse(i);
        }
        replaceProductions();        
    }
    else{
        
        clear();
        stateStack = [];
        posX = defaultX;
        posY = defaultY;
        angle = 90;
       
        if(normalEffect){
            if(angleIncreaseFactor >= 45){
                wind = -1;
            }
            if(angleIncreaseFactor <=22.5){
                wind = 1;
            }
            angleIncreaseFactor+= wind * 1.25;    
        }
        else{
            if(angleIncreaseFactor >= 45){
                wind = -1;
            }
    
            angleIncreaseFactor+= wind * 1.5;        
        }

        for(var i = 0; i < figString.length; ++i){
            parse(i);
        }
        
    }
    it++;
}

function parse(it){
    switch (figString[it]) {
        case 'F':
            if(activity3){
                F(posX, posY, angle + ((stateStack.length)/0.100) );
            }
            else{
                F(posX, posY, angle);
            }
            break;
        case 'G':
            if(activity3){
                G(posX, posY, angle + ((stateStack.length)/0.100) );
            }
            else{
                G(posX, posY, angle);
            }
            break;
        case '+':
            increaseAngle();
            break;
        case '-':
            reduceAngle();
            break;
        case '[':
            saveState();
            break;
        case ']':
            loadState();
            break;
    }
}

function replaceProductions(){
    //figString = figString.replace(new RegExp('G','g'), prodTable[1]);
    //figString = figString.replace(new RegExp('F','g'), prodTable[0]);

    
    figString = figString.replace(new RegExp('F','g'), prodTable[1]);
    figString = figString.replace(new RegExp('G','g'), prodTable[0]);
}

function F(nX, nY, nAngle){
    posX = nX - branchSize * cos(radians(nAngle));
    posY = nY - branchSize * sin(radians(nAngle));
    line(nX, nY, posX, posY);
}

function G(nX, nY, nAngle){
    posX = nX - branchSize * cos(radians(nAngle));
    posY = nY - branchSize * sin(radians(nAngle));
    line(nX, nY, posX, posY);
}

function saveState(){
    stateStack.push(new State(posX, posY, angle));
}

function loadState(){
    lastPos = stateStack.length - 1;
    posX = stateStack[lastPos].x;
    posY = stateStack[lastPos].y;
    angle = stateStack[lastPos].angle;
    stateStack.pop();
}

function increaseAngle(){
    angle+= angleIncreaseFactor;
}

function reduceAngle(){
    angle-= angleIncreaseFactor;
}