var rate = 60; //Speed
var totalArea;
var colorArea;
var iteration = 0;
var rectList = [];

var mWidth = 500;
var mHeight = 500;

var loop = true;

function setup() {
    totalArea = mHeight * mWidth;
    colorArea = 0;
    rectList.push(new Rectangle(0, 0, mWidth, mHeight));

    createCanvas(700, 700);
    frameRate(rate);
}

function draw() {
    if(iteration < 6){
        clear();

        drawAllRects();
        splitAllRects();
        
        text("Iteration", mWidth + 2, 0, mWidth, mHeight);
        text(iteration + 1, mWidth + 50, 0, mWidth, mHeight);
        
        text("Area Total", mWidth + 2, 25, mWidth, mHeight);
        text(totalArea, mWidth + 100, 25, mWidth, mHeight);

        text("Area Pintada", mWidth + 2, 50, mWidth, mHeight);
        text(colorArea, mWidth + 100, 50, mWidth, mHeight);

        text("Proporcion", mWidth + 2, 75, mWidth, mHeight);
        text(totalArea / colorArea, mWidth + 100, 75, mWidth, mHeight);
        
        console.log("Area Total= ", totalArea);
        console.log("Area Pintada:= ", colorArea);
        console.log("Proporcion:= ", totalArea / colorArea );
        iteration++;
    }
}