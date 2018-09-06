var rate = 10; //Speed

var solutions = [];
var fitnessVals = [];
var newSolutions = [];

var population = 4;
var nFeatures = 2;
var minValue = 0;
var maxValue = 4;
var iteration;
var selected1;
var selected2;

var gxPos = 0;
var gyPos = 18;
var gySpace = 30;
function setup() {
    createCanvas(900, 750);
    frameRate(rate);
    var loop = true;
    iteration = 0;

    textSize(16);
    textStyle(BOLD);
    text('First solutions', gxPos, gyPos + window.innerHeight/2 - 60);

    //First population
    solutions = [];
    textStyle(NORMAL);
    for(let i = 0; i < population; ++i) {
        solutions.push(solution(nFeatures, minValue, maxValue));
        for(let j = 0; j < solutions[i].length;++j){
            text(nf(solutions[i][j], 0, 6), gxPos + j * 90, (gyPos + window.innerHeight/2 - 60) + (i+1) * gySpace);
        }
    }
}

function draw() {
    iteration = iteration + 1;
    
    if (loop) {
        fill(255);
        strokeWeight(0);
        rect(5, 5, 200, 200);
        fill(0);
        text(iteration, 20, 20);
        fitness();
        selection();
        crossover();
        mutation();
        replacement();
        
        //STOP CONDITION
        if (max(fitnessVals) >= 0.9999) {
            loop = false;

        }
    }

}

function fitness(){
    fitnessVals = [];
    for(let i = 0; i < solutions.length; ++i){
        fitnessVals.push( pow(sin(PI * normal(solutions[i])) / (PI * normal(solutions[i])), 2) );
    }    


    //SHOW VALUES
    fill(255);
    strokeWeight(0);
    rect(gxPos + 330, gyPos, 400, gySpace * 4);
    fill(0);

    
    textStyle(BOLD);
    text('Fitness', gxPos + 330, gyPos);
    textStyle(NORMAL);

    for(let i = 0; i < fitnessVals.length; ++i){
        //console.log('FIT',pow(sin(PI * normal([0.1,0.1])) / (PI * normal([0.1,0.1])), 2));
        text(nf(fitnessVals[i],0,6), gxPos + 330, gyPos + (i+1) * gySpace );
    }
}

function selection(){
    let max1 = fitnessVals.indexOf(max(fitnessVals));
    let cpArray = fitnessVals.slice(0);
    cpArray.splice(cpArray.indexOf(max(cpArray)),1);

    let max2 = fitnessVals.indexOf(max(cpArray));
    cpArray.splice(cpArray.indexOf(max(cpArray)),1);
    
    let max3 = fitnessVals.indexOf(max(cpArray));
    cpArray.splice(cpArray.indexOf(max(cpArray)),1);
    
    let max4 = fitnessVals.indexOf(max(cpArray));
    
    let muton= 0;
    let probability = new Probability({
        p: '35%',                                 
        f: function(){
            muton = max1;
        }
    }, {
        p: '30%',
        f: function(){
            muton = max2;
        }
    }, {
        p: '20%',
        f: function(){
            muton = max3;
        }
    }, {
        p: '15%',
        f: function(){
            muton = max4;
        }
    });

    probability();
    selected1 = abs(muton);
    probability();
    //while(muton == selected1){
    //    probability();
    //}
    selected2 = abs(muton);

    let selectedParents = [];
    selectedParents = [solutions[selected1].slice(0), solutions[selected2].slice(0)];
    
    //SHOW VALUES
    fill(255);
    strokeWeight(0);
    rect(gxPos + 650, gyPos, 200, gySpace * 4);
    fill(0)

    
    textStyle(BOLD);
    text('Selection', gxPos + 650, gyPos);
    textStyle(NORMAL);

    for(let i = 0; i < selectedParents.length; ++i) {
        for(let j = 0; j < selectedParents[i].length; ++j){
            text(nf(selectedParents[i][j], 0, 6), (gxPos+650) + j * 90, gyPos + (i+1) * gySpace);
        }
    }
}

function crossover(){
    
    let parents = [solutions[selected1].slice(0), solutions[selected2].slice(0)];

    
    let newSolution1 = [parents[randInt(2)][0], parents[randInt(2)][1]];    
    let newSolution2 = [parents[randInt(2)][0], parents[randInt(2)][1]];
    let newSolution3 = [((parents[0][0] + parents[1][0])/2)%maxValue, ((parents[0][1] + parents[1][1])/2)%maxValue];
    let newSolution4 = [((parents[0][0] * parents[1][0])/2)%maxValue, ((parents[0][1] * parents[1][1])/2)%maxValue];
    newSolutions = [newSolution1, newSolution2, newSolution3, newSolution4];

    fill(255);
    strokeWeight(0);
    rect(gxPos + 650, gyPos + window.innerHeight - 170, 200, gySpace * 4);
    fill(0)

    
    textStyle(BOLD);
    text('Crossover', gxPos + 650, gyPos + window.innerHeight - 170);
    textStyle(NORMAL);

    for(let i = 0; i < newSolutions.length; ++i) {
        for(let j = 0; j < newSolutions[i].length; ++j){
            text(nf(newSolutions[i][j], 0, 6), (gxPos + 650) + j * 90,(gyPos + window.innerHeight - 170) + (i+1) * gySpace);
        }
    }
}

function mutation(){
    var muton = 0;
    let probability = new Probability({
        p: '90%',                                 
        f: function(){
            muton = 0;
        }
    }, {
        p: '10%',
        f: function(){
            muton = 1;
        }
    });
    for(let i= 0; i < newSolutions.length; ++i){
        probability();

        if(muton === 1){
            let mutationFactor = random();

            if((newSolutions[i][0] * mutationFactor) < maxValue  && (newSolutions[i][1] * mutationFactor) <maxValue){
                newSolutions[i][0] *= mutationFactor;
                newSolutions[i][1] *= mutationFactor;    
            }
        }
    }
    
    fill(255);
    strokeWeight(0);
    rect(gxPos + 330, gyPos + window.innerHeight - 170, 200, gySpace * 4);
    fill(0)

    
    textStyle(BOLD);
    text('Mutation', gxPos + 330, gyPos + window.innerHeight - 170);
    textStyle(NORMAL);

    for(let i = 0; i < newSolutions.length; ++i) {
        for(let j = 0; j < newSolutions[i].length; ++j){
            text(nf(newSolutions[i][j], 0, 6), (gxPos + 330) + j * 90,(gyPos + window.innerHeight - 170) + (i+1) * gySpace);
        }
    }  
}

function replacement(){
    replaceFitness = [];
    for(let i = 0; i < newSolutions.length; ++i){
        replaceFitness.push(normal(newSolutions[i]));
    }

    let replacer = randInt(4);//replaceFitness.indexOf(max(replaceFitness));
    let replaced = randInt(4);//fitnessVals.indexOf(min(fitnessVals));

    solutions[replaced] = newSolutions[replacer].slice(0);

    fill(255);
    strokeWeight(0);
    rect(gxPos + 200, gyPos + window.innerHeight/2 - 60, 170, gySpace * 4);
    fill(0)

    
    textStyle(BOLD);
    text('Next Generation', gxPos + 200, gyPos + window.innerHeight/2 - 60);
    textStyle(NORMAL);

    for(let i = 0; i < solutions.length; ++i) {
        for(let j = 0; j < solutions[i].length; ++j){
            text(nf(solutions[i][j], 0, 6), (gxPos+200) + j * 90,(gyPos + window.innerHeight/2 - 60) + (i+1) * gySpace);
        }
    }  
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