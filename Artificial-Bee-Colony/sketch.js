var rate = 10; //Speed

var solutions = [];
var fitnessVals = [];
var neightbors = [];

var minValue = -5;
var maxValue = 5;
var iteration = 0;

var colonySize = 0;         //TC
var explorationLimit = 0;   //LE
var nFeatures = 2;      //D
var phi = 0;
var ev = []; 
var xBest = [0,0];
var loop;

function setup() {  
    createCanvas(900, 750);
    frameRate(rate);
    loop = true;

    //Initialization
    colonySize = 20;
    explorationLimit = colonySize*nFeatures/2;
    iteration = 0;

    //First population
    solutions = [];
    for(var i = 0; i < colonySize/2; ++i) {
        solutions.push(solution(nFeatures, minValue, maxValue));
    }

    fitness();
    //noLoop();
}

function draw() {
    
    if (loop && iteration < 25) {
        for(var j = 0; j < colonySize/2 ;++j){
            beeWorkers(j);
        }

        for(var j = 0; j < colonySize/2 ;++j){
            beeOnLooker(j);
        }
        beeSearcher();

        //STOP CONDITION
        if (max(fitnessVals) >= 0.9999) {
            //loop = false;
        }
        console.log('===============================');
        console.log('Solutions', solutions);
        console.log('Fitness', fitnessVals);
        console.log('xBest', xBest, 'fitness', getFitness(xBest));
    }
    iteration = iteration + 1;
}

function fitness(){
    fitnessVals = [];
    for(var i = 0; i < solutions.length; ++i){
        var fun = (abs(solutions[i][0]) + abs(solutions[i][1])) * (sin(solutions[i][0]) + sin(solutions[i][1])) * (cos(solutions[i][0]) + cos(solutions[i][1])); 
        if(fun >= 0){
            fitnessVals.push( 1/(1 + fun) );
        }
        else{
            fitnessVals.push( 1 + abs(fun) );
        }
    }
}

function getFitness(a){
    return (abs(a[0]) + abs(a[1])) * (sin(a[0]) + sin(a[1])) * (cos(a[0]) + cos(a[1]));
}

function beeWorkers(pos){
    phi = random(-1, 1);
    neightbors[pos] = suma(solutions[pos], mult(phi, less(solutions[pos], getSolution(nFeatures, minValue, maxValue))));
    var holdFitness = getFitness(neightbors[pos]);
    if(holdFitness < fitnessVals[pos]){
        ev[pos] = 1;
    }
    fitness();
}

function beeOnLooker(){

    phi = random(-1, 1);
    var pObjects = [];
    var jOption = 0;
    for(var i = 0; i < solutions.length; ++i){
        let tempI = i;
        var pbty = getProbability(i) - 0.0001;
        pObjects.push({
            p: pbty,
            f: function () {
                jOption = tempI;
            }
        });
    }
    var probability = new Probability(pObjects);
	probability();
    
    pos = jOption;

    neightbors[pos] = suma(solutions[pos], mult(phi, less(solutions[pos], getSolution(nFeatures, minValue, maxValue))));
    var holdFitness = getFitness(neightbors[pos]);
    if(holdFitness < fitnessVals[pos]){
        ev[pos] = 1;
    }
    fitness();
}

function beeSearcher(){
    if (max(fitnessVals) > getFitness(xBest)){
        var bestIndex = fitnessVals.indexOf( max(fitnessVals) );
        xBest = solutions[bestIndex];
    }
    else{
        xBest = solutions[bestIndex];
    }

    solutions = [];
    for(var i = 0; i < colonySize/2; ++i) {
        solutions.push(solution(nFeatures, minValue, maxValue));
    }
}

function suma(a, b){
    c = [a[0] + b[0], a[1] + b[1]];
    return c;
}

function less(a, b){
    c = [a[0] - b[0], a[1] - b[1]];
    return c;
}

function mult(a, b){
    return [a*b[0], a*b[1]];
}

function getProbability(pos){
	var sum = 0;
	for(var it = 0; it < fitnessVals.length; ++it){
        sum = sum + abs(fitnessVals[it]);
	}
	return abs(fitnessVals[pos]) / sum;
}

function solution(n, min, max){
    let entity = [];
    for(let i = 0; i < n; i++){
        entity.push(random(min, max + 0.000001));
    }
    return entity;
}

function normal(mArray){
    let rValue = 0.0;
    for(let i = 0; i < mArray.length; ++i){
        rValue+= mArray[i] * mArray[i];
    }
    return sqrt(rValue);
}

function randInt(x){
    return floor(random(x));
}

//Generate a random solution
function getSolution(n, min, max){
    let entity = [];
    for(let i = 0; i < n; i++){
        entity.push(random(min, max));
    }
    return entity;
}