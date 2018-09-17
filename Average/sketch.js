var maxNumbers = 500;

var velocity = 10;

var mFile;
function setup() {
    createCanvas(8000, 600);
    frameRate(velocity);
    noLoop();
}

var avgs = [];
var mapy0 = [];
var mapy1 = [];
var mapy2 = [];
var mapy3 = [];
var mapy4 = [];
var mapy5 = [];

function draw() { 
    noFill();
    stroke(0)
    strokeWeight(2);
    line(10, height, 10, 8);
    line(10, height, width, height);

    let rands = getRandomNumbers();
    mFile = createWriter('consoleOutput.txt');  
    
    printCombinedAverage(rands); 
    
    mFile.close();
    mFile.clear();
    drawGraph(mapy1, 'rgba(0,0,255,0.5)');
    drawGraph(mapy2, 'rgba(0,255,0,0.5)');
    drawGraph(mapy3, 'rgba(255,204,0,0.5)');
    drawGraph(mapy4, 'rgba(255,204,200,0.5)');
    drawGraph(mapy5, 'rgba(100,204,255,0.5)');
    drawGraph(mapy0, 'rgba(255,0,0,1)');
    drawAvgsVals(avgs);
}

function getRandomNumbers(){
    var randomNumbers = [];
    mFile = createWriter('RandomNumbers.txt');  
    for(let i = 0; i < maxNumbers; ++i){
        let mNumber = randInt(100)
        randomNumbers.push(mNumber);                       
        mFile.print(i + ' -  ' + mNumber + "\r\n");
    }
    mFile.close();
    mFile.clear();
    return randomNumbers;
}


function realAverage(numbers){
    if(numbers.length == 1){
        return numbers[0];
    }

    if(numbers.length < 1){
        return 0;
    }

    var numbersLessOne = numbers.slice(0);
    numbersLessOne.splice(0, 1);
    return ( realAverage(numbersLessOne) * (numbersLessOne.length) + numbers[0] ) / numbers.length;
}

function alphaAverage(numbers, alpha){
    if(alpha >= 1){
        console.log('alpha need to be lesser than 1')
        return;
    }

    if(numbers.length == 1){
        return numbers[0];
    }

    if(numbers.length < 1){
        return 0;
    }

    var numbersLessOne = numbers.slice(0);
    numbersLessOne.splice(0, 1);
    
    return  alpha * alphaAverage(numbersLessOne, alpha) + (1 - alpha) * numbers[0];
}

function printCombinedAverage(mNumbers){
    let realAvg = 0;
    let aprox1 = 0;
    let aprox2 = 0;
    let aprox3 = 0;
    let aprox4 = 0;
    let aprox5 = 0;
    
    //Get the first number of the array
    let xNumbers = mNumbers.slice(0, 1);
    for(let i = 0; i < mNumbers.length; ++i){
        let numbersLessOne = xNumbers.slice(0, xNumbers.length - 1);
        
        //calculate all averages
        realAvg = ( realAverage(numbersLessOne) * (numbersLessOne.length) + xNumbers[i] ) / xNumbers.length;
        aprox1 = 0.25 * alphaAverage(numbersLessOne, 0.25) + (1 - 0.25) * xNumbers[i];
        aprox2 = 0.5 * alphaAverage(numbersLessOne, 0.5) + (1 - 0.5) * xNumbers[i];
        aprox3 = 0.75 * alphaAverage(numbersLessOne, 0.75) + (1 - 0.75) * xNumbers[i];
        aprox4 = 0.01 * alphaAverage(numbersLessOne, 0.01) + (1 - 0.01) * xNumbers[i];
        aprox5 = 0.99 * alphaAverage(numbersLessOne, 0.99) + (1 - 0.99) * xNumbers[i];
        
        var nearest = [abs(realAvg-aprox1), abs(realAvg-aprox2), abs(realAvg-aprox3), abs(realAvg-aprox4), abs(realAvg-aprox5)];

        //write to document
        mFile.print(i + ' -  ' + mNumbers[i] + ' - ' + realAvg + ' - ' + aprox1 + ' - ' + aprox2 + ' - ' + aprox3 + ' - ' + aprox4 + ' - ' + aprox5 + ' - ' + (nearest.indexOf(min(nearest))+1) + ' - ' + min(nearest) + "\r\n");

        mapy0.push( map(realAvg, 0, 100, height, 0) );
        mapy1.push( map(aprox1, 0, 100, height, 0) );
        mapy2.push( map(aprox2, 0, 100, height, 0) );
        mapy3.push( map(aprox3, 0, 100, height, 0) );
        mapy4.push( map(aprox4, 0, 100, height, 0) );
        mapy5.push( map(aprox5, 0, 100, height, 0) );
        
        avgs.push(realAvg);
        //Get the firsts i numbers of the array
        xNumbers = mNumbers.slice(0, 2 + i );
    }
}

function randInt(x){
    return floor(random(x) + 1);
}

function drawGraph(mData, mColor){
    stroke(mColor);
    strokeWeight(4);
    beginShape();
    for(let i = 0; i< mData.length; ++i){
        vertex(i + 15*i + 10, mData[i])
    }
    endShape();
}

function drawAvgsVals(mData){
    
    let aux = 1;
    for(let i = 0; i< mData.length; ++i){
        aux = aux * -1;

        fill(0);
        strokeWeight(0);
        text(nf(mData[i],0,1), i+ 15*i + 10, mapy0[i] + (25 * aux));
        text('0', 0, height);
        text('100', 0, 8);
    }
}