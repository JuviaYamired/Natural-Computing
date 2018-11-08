//Strings Array
var selfNumbers = [];
var selfStrings = [];
var detectorNumbers = [];
var detectorSet = [];
var randomNumbers = [];
var randomStringsSet = [];
var finalNumbers = [];
var finalSets = [];

//Set lenghts
var nColors = 200;
var nDetectors = 100;
var nRandoms = 50;

//String Comparator
var nHammingBits = 13;
var rContiguousBits = 13;
var useComparator = 2;  // 1-Hamming 2-R-bits


var rate = 60;

function setup() {
    createCanvas(600, 600);
    frameRate(rate);
    noLoop();
}

function draw() {

    genSelfStrings();
    console.log('===SelfStrings===');
    console.log(selfNumbers);
    console.log(selfStrings);
    
    genRandomList();
    console.log('===RandomStrings===');
    console.log(randomNumbers);
    console.log(randomStringsSet);
    
    //13 Bits
    nHammingBits = 13;
    rContiguousBits = 13;
    console.log('===13 bits===');
    genDetectorSet();
    console.log('===DetectorSet===');
    console.log(detectorNumbers);
    console.log(detectorSet);
    genRandomStrings();
    console.log('===FinalEvaluation===');
    console.log(finalNumbers);
    console.log(finalSets);
    results();

    //15 Bits
    nHammingBits = 15;
    rContiguousBits = 15;
    console.log('===15 bits===');
    genDetectorSet();
    console.log('===DetectorSet===');
    console.log(detectorNumbers);
    console.log(detectorSet);
    genRandomStrings();
    console.log('===FinalEvaluation===');
    console.log(finalNumbers);
    console.log(finalSets);
    results();

    //17 Bits
    nHammingBits = 17;
    rContiguousBits = 17;
    console.log('===17 bits===');
    genDetectorSet();
    console.log('===DetectorSet===');
    console.log(detectorNumbers);
    console.log(detectorSet);
    genRandomStrings();
    console.log('===FinalEvaluation===');
    console.log(finalNumbers);
    console.log(finalSets);
    results();
}


function isBlue(iColor){ 
    return ( iColor[0] <= iColor[1] && iColor[2] >= 128 && abs(iColor[0] - iColor[1]) < 85 && (iColor[0] + iColor[1])/2  <= 128 ) ||
           ( iColor[0] > iColor[1] && iColor[2] >= 128 && abs(iColor[0] - iColor[1]) < 85 && (iColor[0] + iColor[1])/2  <= 85 ) ;
}

function genSelfStrings(){
    var iColor;
    selfNumbers = [];
    selfStrings = [];
    for(var i = 0; i < nColors; ++i){
        iColor =  [randInt(256), randInt(256), randInt(256)];
        while(!isBlue(iColor)){
            iColor = [randInt(256), randInt(256), randInt(256)];
        }
        selfNumbers.push(iColor);
        iColor = [completeString(iColor[0].toString(2)), completeString(iColor[1].toString(2)), completeString(iColor[2].toString(2))];
        selfStrings.push(iColor);
    }
}

function genDetectorSet(){
    var iColor;
    detectorNumbers = [];
    detectorSet = [];
    for(var i = 0; i < nDetectors ; ++i){
        iColor =  [completeString(randInt(256).toString(2)), completeString(randInt(256).toString(2)), completeString(randInt(256).toString(2))];

        for(var j = 0; j < selfStrings.length; ++j){
            if(useComparator === 1){
                if( !getHamming(iColor, selfStrings[j]) ){
                    detectorNumbers.push([parseInt(iColor[0],2), parseInt(iColor[1],2), parseInt(iColor[2],2)]);
                    detectorSet.push(iColor);
                    break;    
                }
            }

            if(useComparator === 2){
                if( !getRBits(iColor, selfStrings[j]) ){
                    detectorNumbers.push([parseInt(iColor[0],2), parseInt(iColor[1],2), parseInt(iColor[2],2)]);
                    detectorSet.push(iColor);
                    break;    
                }
            }

            /*
            if(iColor[0] !== selfStrings[j][0] && iColor[1] !== selfStrings[j][1] && iColor[2] !== selfStrings[j][2]){
                detectorSet.push(iColor);
                break;
            }
            */
        } 
    }
}

function genRandomStrings(){
    finalNumbers = [];
    finalSets = [];
    for(var i = 0; i < randomStringsSet.length ; ++i){
        for(var j = 0; j < detectorSet.length; ++j){
            if(useComparator === 1){
                if( getHamming(randomStringsSet[i], detectorSet[j]) ){
                    finalNumbers.push([parseInt(randomStringsSet[i][0], 2), parseInt(randomStringsSet[i][1], 2), parseInt(randomStringsSet[i][2], 2)]);
                    finalSets.push(randomStringsSet[i]);
                    break;    
                }
            }

            if(useComparator === 2){
                if( getRBits(randomStringsSet[i], detectorSet[j]) ){
                    finalNumbers.push([parseInt(randomStringsSet[i][0], 2), parseInt(randomStringsSet[i][1], 2), parseInt(randomStringsSet[i][2], 2)]);
                    finalSets.push(randomStringsSet[i]);
                    break;    
                }
            }
        } 
    }
}

function genRandomList(){
    var iColor;
    randomNumbers = [];
    randomStringsSet = [];
    for(var i = 0; i < nRandoms; ++i){
        iColor =  [completeString(randInt(256).toString(2)), completeString(randInt(256).toString(2)), completeString(randInt(256).toString(2))];
        randomNumbers.push([parseInt(iColor[0],2), parseInt(iColor[1],2), parseInt(iColor[2],2)]);
        randomStringsSet.push(iColor);
    }
}

function getRBits(a, b){
    var temp1 = a[0] + a[1] + a[2];
    var temp2 = b[0] + b[1] + b[2];
    for(var i = 0; i < temp1.length - rContiguousBits; ++i){
        if( temp2.indexOf( temp1.substring(i, rContiguousBits + i) ) !== -1 ){
            return true;
        }
    }
    return false;
}

function getHamming(a, b){
    var count = 0;
    for(var i = 0; i < a.length; i++){
        for(var j = 0; j < a[i].length; ++j){
            if(a[i][j] == b[i][j]){
                count++;
            }
        }
    }
    return count >= nHammingBits;
}

function results(){
    var count = 0;
    for(var i = 0; i < finalNumbers.length; ++i){
        if(isBlue(finalNumbers[i])){
            count++;
        }
    }
    
    console.log('Porcentage', (count / finalNumbers.length) * 100 + '%' );
}

function completeString(iColor){
    var nChars='';
    if(iColor.length < 8){
        for(var i = 0; i < 8 - iColor.length; ++i){
            nChars = nChars + '0';
        }
    }
    return nChars + iColor;
}

function randInt(x){
    return floor(random(x));
}