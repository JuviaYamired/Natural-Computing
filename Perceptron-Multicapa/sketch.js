var arrayEntries;
var arrayResultAND;
var arrayResultOR;
var arrayResultXOR;
var entriesToHiddenWeights;
var hiddenToOutputWeights;
var biasWeights;

var iterations = 100;
var constAlpha = random();
var pError = 1;

var vFactor = 0;
var rate = 20; //Speed
var loop = true;

function setup() {
    createCanvas(700, 700);
    frameRate(rate);

    arrayEntries =      [[-1, -1],[-1, 1],[1, -1],[1, 1]];
    arrayResultAND =    [-1, -1, -1, 1];    
    arrayResultOR =     [-1, 1, 1, 1];
    arrayResultXOR =    [1, -1, -1, 1];

    entriesToHiddenWeights = [random(), random(), random()];
    hiddenToOutputWeights = [random(), random()];
    biasWeights= [random(), random()];
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
        var result = activation(arrayEntries[i], entriesToHiddenWeights);
        //pError = arrayResultAND[i] - result;
        //pError = arrayResultOR[i] - result;
        pError = arrayResultXOR[i] - result;
        weightUpdate();
        console.log('Result', result)
        console.log('Error', pError);
        console.log('Weigths', entriesToHiddenWeights);
        drawLine(arrayEntries[i], entriesToHiddenWeights);
    }
    var temp = arrayEntries[0];
    arrayEntries[0] = arrayEntries[3];
    arrayEntries[3] = temp;
}

function multiPerceptron(){
    let entryExt = entries.slice(0); 
    entryExt.push( biasWeights[0] );
    
    let e2oV = multMatrix(entryExt, entriesToHiddenWeights);
    let e2oY = activation(e2oV);
    let outputExt = e2oY.slice(0);
    outputExt.push(biasWeights[1]);

}

function activation(entries, weight){ 
    let factor = entries[0] * weight[0] + entries[1] * weight[1] + bias * biasWeight;
    if (factor > 0) {
        return 1;
    }
    else {
        return -1;
    }
}

function weightUpdate(){
    entriesToHiddenWeights[0] = entriesToHiddenWeights[0] - constAlpha * pError;
    entriesToHiddenWeights[1] = entriesToHiddenWeights[1] - constAlpha * pError;
    biasWeight = biasWeight - constAlpha * pError;
}

/*
for i := 0 to self.rowCount-1 do begin
    for j := 0 to matrixA.colCount-1 do begin
      sum := 0;
      for k := 0 to self.colCount-1 do begin
        sum := sum + self.data[i*self.colCount + k] * matrixA.data[j + k*matrixA.colCount];
      end;
      result.data[j + i*matrixA.colCount] := sum;
    end;
end;
*/

function multMatrix(mA, mB){
    let result = [0, 0, 0];
    let sum = 0;
    for(let i = 0; i < mA.length; ++i){
        for(let j = 0; j < 1; ++j){
            sum = 0;
            for(let k = 0; k < 1; ++k){
                sum = sum + mA[i + k] * mB[j + k]
            }
            result[j + i * 1] = sum;
        }   
    }
    return result;
}

function getPosX(x){
    return map(x, -1, 1, 0, width);
}

function getPosY(y){
    return map(y, -1, 1, height, 0);
}

function f(x, weight) {
    let y = x * entriesToHiddenWeights[0]/entriesToHiddenWeights[1] + biasWeight * 1;
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