var arrayEntries;
var arrayResultAND;
var arrayResultOR;
var arrayResultXOR;
var arrayWeight;
var biasWeight;
var bias;

var iterations = 100;
var constAlpha = 0.15;
var pError = 1;

var vFactor = 0;
var rate = 60; //Speed
var loop = true;

function setup() {
    createCanvas(700, 700);
    frameRate(rate);

    arrayEntries =      [[-1, -1],[-1, 1],[1, -1],[1, 1]];
    arrayResultAND =    [-1, -1, -1, 1];    
    arrayResultOR =     [-1, 1, 1, 1];
    arrayResultXOR =    [1, -1, -1, 1];

    arrayWeight = [random(), random()];
    bias = 1;
    biasWeight = random();
}

function draw() {
    if(iterations > 0 || pError > 0.1){
        
        clear();
        perceptron();
        drawPoins();
        iterations = iterations - 1;
    }
}

function perceptron(){
    for(let i = 0; i < arrayEntries.length; ++i){
        var result = proccess(arrayEntries[i], arrayWeight);
        //pError = arrayResultAND[i] - result;
        //pError = arrayResultOR[i] - result;
        pError = arrayResultXOR[i] - result;
        weightUpdate();
        console.log('Result', result)
        console.log('Error', pError);
        console.log('Weigths', arrayWeight);
        drawLine(arrayEntries[i], arrayWeight);
    }
    var temp = arrayEntries[0];
    arrayEntries[0] = arrayEntries[3];
    arrayEntries[3] = temp;
}

function proccess(entries, weight){
    let factor = entries[0] * weight[0] + entries[1] * weight[1] + bias * biasWeight;
    if (factor > 0) {
        return 1;
    }
    else {
        return -1;
    }
}

function weightUpdate(){
    arrayWeight[0] = arrayWeight[0] - constAlpha * pError;
    arrayWeight[1] = arrayWeight[1] - constAlpha * pError;
    biasWeight = biasWeight - constAlpha * pError;
}

function getPosX(x){
    return map(x, -1, 1, 0, width);
}

function getPosY(y){
    return map(y, -1, 1, height, 0);
}

function f(x, weight) {
    let y = x * arrayWeight[0]/arrayWeight[1] + biasWeight * 1;
    return y;
}

function drawLine(entries, weight){
    var pX1 = getPosX(entries[0]);
    var pY1 = f(pX1, weight[0]);
    var pX2 = getPosX(entries[1]);
    var pY2 = f(pX2, weight[1]);

    console.log('y', pY1, pY2);
    console.log('w', weight);
    line(pX1, pY1, pX2, pY2);
}

function drawPoins(){
    for(let i = 0; i < arrayEntries.length; ++i){
        ellipse(getPosX(arrayEntries[i][0]), getPosY(arrayEntries[i][1]), 60, 60)
    }
}

function getRandomEntry(){
    return round(random());
}