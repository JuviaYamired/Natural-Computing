var springSeasonMatrix = [[ 0, 1,-1, 4,-1,-1,-1,-1,-1,-1],
						  [ 1, 0, 9,-1,-1, 9,-1,-1,-1,-1],
						  [-1, 9, 0, 4,-1, 3, 3,-1,-1,-1],
						  [ 4,-1, 4, 0,-1, 3,-1, 5,-1,-1],
						  [-1,-1,-1,-1, 0,-1,10,10, 5, 9],
						  [-1, 9, 3, 3,-1, 0, 6, 1, 9,-1],
						  [-1,-1, 3,-1,10, 6, 0, 8,10,-1],
						  [-1,-1,-1, 5,10, 1, 8, 0, 1,10],
						  [-1,-1,-1,-1, 5, 9,10, 1, 0,-1],
						  [-1,-1,-1,-1, 9,-1,-1,10,-1, 0]];

var autumnSeasonMatrix = [[ 0, 8,-1, 5,-1,-1,-1,-1,-1,-1],
						  [ 8, 0, 8,-1,-1, 8,-1,-1,-1,-1],
						  [-1, 8, 0, 8,-1, 9, 2,-1,-1,-1],
						  [ 5,-1, 8, 0,-1, 5,-1, 9,-1,-1],
						  [-1,-1,-1,-1, 0,-1,10, 4, 8,10],
						  [-1, 8, 9, 5,-1, 0, 2, 8, 1,-1],
						  [-1,-1, 2,-1,10, 2, 0,10, 9,-1],
						  [-1,-1,-1, 9, 4, 8,10, 0, 6, 1],
						  [-1,-1,-1,-1, 8, 1, 9, 6, 0,-1],
						  [-1,-1,-1,-1,10,-1,-1, 1,-1, 0]];

var winterSeasonMatrix = [[ 0, 4,-1, 7,-1,-1,-1,-1,-1,-1],
						  [ 4, 0, 7,-1,-1, 8,-1,-1,-1,-1],
						  [-1, 7, 0, 4,-1, 6, 4,-1,-1,-1],
						  [ 7,-1, 4, 0,-1, 4,-1, 5,-1,-1],
						  [-1,-1,-1,-1, 0,-1, 6, 2, 8, 9],
						  [-1, 8, 6, 4,-1, 0, 9, 1, 1,-1],
						  [-1,-1, 4,-1, 6, 9, 0, 9,10,-1],
						  [-1,-1,-1, 5, 2, 1, 9, 0, 7, 4],
						  [-1,-1,-1,-1, 8, 1,10, 7, 0,-1],
						  [-1,-1,-1,-1, 9,-1,-1, 4,-1, 0]];

var pheromones = [[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
var rate = 60;
var beta = 2;
var phRate = 0.75;
var maxAnts = 10;
var ants = [];
var bContinue = true;
var iteration = 0;
var maxIterations = 200;
var chosenMatrix = [];
function setup() {
    createCanvas(700, 700);
    frameRate(rate);
	//noLoop();
	
	chosenMatrix = [springSeasonMatrix, autumnSeasonMatrix, winterSeasonMatrix]
	chosenMatrix = chosenMatrix[randInt(3)];
	//console.log(chosenMatrix);
	for(var it = 0; it < maxAnts; ++it){
		ants.push( new classAnt(0, 0) );
	}
}

function draw() {
	//Get its probability to be chosen
	if(bContinue && iteration < maxIterations+1){
		for (var i = 0; i < maxAnts; ++i) {
			var antX = ants[i].x;
			var pObjects = [];
			var jOption = -1;
			for (var j = 0; j < chosenMatrix[antX].length; ++j) {
				if (chosenMatrix[antX][j] !== -1 && chosenMatrix[antX][j] !== 0) {
					let tempJ = j;
					var pbty = getProbability(antX, tempJ);
					if(ants[i].isVisit(j)){
						pbty = 0;
					}
					pObjects.push({
						p: pbty,
						f: function () {
							jOption = tempJ;
						}
					});
				}
			}
			var probability = new Probability(pObjects);
			probability();

			pheromones[antX][jOption] = pheromones[antX][jOption] * phRate + 1;
			ants[i].x = jOption;
			if(ants[i].isDone()){
				bContinue = false;
			}
		}
		console.log('pheromone', pheromones);
		iteration++;	
	}
	if(iteration === maxIterations || !bContinue){
		console.log('iterations', iteration);
		console.log(chosenMatrix);
		console.log('ph', pheromones);
	}
	
}

function getProbability(i, j){
	var sum = 0;
	for(var it = 0; it < chosenMatrix[i].length; ++it){
		if(chosenMatrix[i][it] !== -1 && chosenMatrix[i][it] !== 0){
			sum = sum + (pheromones[i][it] * pow( 1 / chosenMatrix[i][it], beta));
		}
	}
	return nf( pheromones[i][j] * pow( 1 / chosenMatrix[i][j], beta) / sum, 0, 5);
}

function randInt(x){
    return floor(random(x));
}