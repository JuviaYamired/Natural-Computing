rate = 10;

var rooms = [ [ -1, -1, -1, -1, 0, -1 ], 
              [ -1, -1, -1, 0, -1, 100 ], 
              [ -1, -1, -1, 0, -1, -1 ], 
              [ -1, 0, 0, -1, 0, -1 ],
              [ 0, -1, -1, 0, -1, 100 ],
              [ -1, 0, -1, -1, 0, 100 ] ];

var qTraining = [ [ 0, 0, 0, 0, 0, 0 ], 
                  [ 0, 0, 0, 0, 0, 0 ], 
                  [ 0, 0, 0, 0, 0, 0 ], 
                  [ 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0 ] ];

var maxIterations = 100;
var learnFactor = 0.7;
var targetRoom = 5;
var agentPosition;
var loop = true;
var iteration = 0;
function setup() {
    createCanvas(700, 700);
    frameRate(rate);
    noLoop();    
}

function draw() {
    
    for (var it = 0; it < maxIterations; ++it) {
        var initialRoom = randInt(6);
        while (rooms[initialRoom][initialRoom] != -1) {
            initialRoom = randInt(6);
        }

        agentPosition = initialRoom;

        while (agentPosition !== targetRoom) {
            room2Go = randInt(6);

            while (rooms[agentPosition][room2Go] <= -1) {
                room2Go = randInt(6);
            }

            maxQt = max(qTraining[room2Go]);
            qTraining[agentPosition][room2Go] = rooms[agentPosition][room2Go] + learnFactor * maxQt;
            agentPosition = room2Go;
            //console.log(agentPosition);
            console.log(qTraining);
        }
        iteration++;
        console.log(qTraining);
    }    
}

function randInt(x){
    return floor(random(x));
}