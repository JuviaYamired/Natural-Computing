var rate = 60; //Speed

//Choiced solution
var solution;
//Selected (random) neighbor
var neighbor;   

//Initial temperature
var temperature = 10;

// Fitness of solution
var fitness1 = 0;
//Fitness  of neighbor
var fitness2 = 0;

//History of choiced solutions
var historySolutions = [];
//History of selected (random) neighbors
var historyNeighbors = [];
//History of [solution, neighbor] probabilities 
var historyProbability = [];
//Count iterations when prev-last and last solutions were equal, when not become 0 again
var counter = 0;

var nFeatures = 2;
var minValue = -4;
var maxValue = 4;

var iteration;

var loop = true;


function setup() {
    createCanvas(700, 700);
    frameRate(rate);
    iteration = 0;

    //First random generated solution
    solution = getSolution(nFeatures, minValue, maxValue);
    historySolutions.push(solution);
    console.log(solution);
    
}

function draw() {
    iteration = iteration + 1;
    if(loop){
        clear();
        
        getNeightbor();        
        acceptance();
        cooldown();
               
        drawIterationCounter();
        drawTemperature();
        drawActualSolutionFitnessGraph();
        drawActualNeighborFitnessGraph();
        drawProbabilitGraph();

        //STOP CONDITION
         
        //If temperature is near 0 then stop
        if (temperature <= 0.01 ) {
            loop = false;
        }

        //Count iterations where solution was the same
        if(historySolutions.length > 2){
            if(historySolutions[historySolutions.length-1] === historySolutions[historySolutions.length-2]){
                counter += 1;
            }
            else{
                counter = 0;
            }
        }

        //If solution is stable after n iterations then stop
        if(counter > 300){
            loop = false;
        }
    }
}

//Select a random neighbor
function getNeightbor(){
    neighbor = null;
    neighbor = getSolution(nFeatures, minValue, maxValue);
    historyNeighbors.push(neighbor);
    console.log('actual',solution);
    console.log('neighbor', neighbor);
}


//Accpetance function that choose the next solution   
function acceptance(){
    //Get fitness of both solutions
    fitness1 = fitness(solution);
    fitness2 = fitness(neighbor);
    console.log('fit1', fitness1, 'fit2', fitness2);

    //Get its probability to be chosen
    var p1 = getProbabilty(fitness1);
    var p2 = getProbabilty(fitness2);
    historyProbability.push([p1, p2]);
    console.log('prob1',p1, 'prob2', p2);

    //If neighbor is better choose it else choose by probability
    if(fitness2 > fitness1){
        solution = neighbor;
    }
    else{
        let choice = 0;
        var probability = new Probability({
            p: p1 + '%',
            f: function () {
                choice = 0;
            }
        }, {
            p: p2 + '%',
            f: function () {
                choice = 1;
            }
        });
    
        probability();
    
        switch (choice) {
            case 0:
                solution = solution;      
                break;
            case 1:
                solution = neighbor;
                break;
        }
    }
    historySolutions.push(solution);
}

//Reduce temperature
function cooldown(){
    temperature = temperature / ( 1 + ( 0.00001 * iteration ) );
    console.log('temperature',temperature);
}

//            f(i) --> fitness
// p(i) =  e    T
//         Sumaj( e f(i) )  --> los demas valores
//                   T

//Get probability of a solution
function getProbabilty(fitnessval){
    return exp(fitnessval/temperature)/(exp(fitness1/temperature) + exp(fitness2/temperature));
}

//Generate a random solution
function getSolution(n, min, max){
    let entity = [];
    for(let i = 0; i < n; i++){
        entity.push(random(min, max));
    }
    return entity;
}

//Calculate fitness value
function fitness(mSolution){
    if(((PI * normal(mSolution))) === 0){
        return pow(sin(PI * normal(mSolution)) / 0.00000000001, 2);            
    }
    return pow(sin(PI * normal(mSolution)) / (PI * normal(mSolution)), 2);    
}

//Help functions

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

function drawIterationCounter() {
    fill(0);
    strokeWeight(0);
    text('iteration:', width - 115, 15);
    fill(0);
    strokeWeight(0);
    text(iteration, width - 35, 15);
}

function drawTemperature() {
    fill(0);
    strokeWeight(0);
    text('temperature:', width - 115, 40);
    fill(0);
    strokeWeight(0);
    text(nf(temperature, 0, 3), width - 35, 40);
}

function drawActualSolutionFitnessGraph() {
    stroke(0);
    strokeWeight(2);
    noFill();
    
    let drawHeight = (height / 2) - 20;
    beginShape();
    for (var i = 0; i < historySolutions.length; ++i) {
        var y = map(fitness(historySolutions[i]), 0, 1, drawHeight , 10);
        vertex(i + 15, y)
    }
    
    if (historySolutions.length > width/2 - 15) {
        historySolutions.splice(0, 1);
    }
    endShape();

    fill(0);
    strokeWeight(0);
    text('actual fitness / time', width/4, 8);
    text('0', 0, drawHeight);
    text('1', 0, 8);
    let lastFitness = nf(fitness(historySolutions[historySolutions.length-1]),0,4);
    text(lastFitness, i+15, y);
    noFill();
    colorMode(RGB, 255, 255, 255, 1);
    strokeWeight(4);
    stroke(255, 0, 10, 0.3);
    line(10, drawHeight, 10, 8);
    line(10, drawHeight, width/2 + 15, drawHeight);
}

function drawActualNeighborFitnessGraph() {
    stroke(0);
    strokeWeight(2);
    noFill();

    let maxDrawHeight = height/2;
    let minDrawHeight = height - 5;
    beginShape();
    for (var i = 0; i < historyNeighbors.length; ++i) {
        var y = map(fitness(historyNeighbors[i]), 0, 1, height - 7, maxDrawHeight);
        vertex(i + 15, y)
    }
    
    if (historyNeighbors.length > width/2 - 15) {
        historyNeighbors.splice(0, 1);
    }
    endShape();

    fill(0);
    strokeWeight(0);
    text('neighbor fitness / time', width/4, maxDrawHeight);
    text('0', 0, minDrawHeight);
    text('1', 0, maxDrawHeight);
    let lastFitness = nf(fitness(historyNeighbors[historyNeighbors.length-1]),0,4);
    text(lastFitness, i+15, y);
    
    noFill();
    colorMode(RGB, 255, 255, 255, 1);
    strokeWeight(4);
    stroke(255, 0, 10, 0.3);
    line(10, minDrawHeight, 10, maxDrawHeight);
    line(10, minDrawHeight, maxDrawHeight, minDrawHeight);
}

function drawProbabilitGraph() {
    stroke(0);
    strokeWeight(2);
    noFill();

    let maxDrawWidth = width/4 * 4 - 60;
    let minDrawWidth = width/4 * 3 - 60;
    let maxDrawHeight = height/4 * 2 - 60;
    let minDrawHeight = height/4 * 3 - 60;
    beginShape();
    for (var i = 0; i < historyProbability.length; ++i) {
        var y1 = map(historyProbability[i][0], 0, 1, minDrawHeight, maxDrawHeight);
        var y2 = map(historyProbability[i][1], 0, 1, minDrawHeight, maxDrawHeight);
        colorMode(RGB, 255, 0, 0, 1);
        vertex(i + minDrawWidth, y1)
        colorMode(RGB, 0, 255, 0, 1);
        point(i + minDrawWidth, y2)
    }
    
    if (historyProbability.length > width/4 - 15) {
        historyProbability.splice(0, 1);
    }
    endShape();

    fill(0);
    strokeWeight(0);
    text('probabilty / time', minDrawHeight, maxDrawHeight);
    text('0', minDrawWidth - 10, minDrawHeight + 5);
    text('1', minDrawWidth - 10, maxDrawHeight + 5);
    let lastP1 = nf(historyProbability[historyProbability.length-1][0]*100,0,2);
    let lastP2 = nf(historyProbability[historyProbability.length-1][1]*100,0,2);

    text('p1: '+lastP1, i + minDrawWidth, y1);
    text('p2: '+lastP2, i + minDrawWidth, y2);
    noFill();
    colorMode(RGB, 255, 255, 255, 1);
    strokeWeight(4);
    stroke(255, 0, 10, 0.3);
    line(minDrawWidth, minDrawHeight, minDrawWidth, maxDrawHeight);
    line(minDrawWidth, minDrawHeight, maxDrawWidth, minDrawHeight);
}