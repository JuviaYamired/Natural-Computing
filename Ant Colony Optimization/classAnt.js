class classAnt{
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visitMatrix = [[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    }

    isVisit(i){
        return this.visitMatrix[i][i] == 1;
    }

    updateMatrix(i){
        console.log(this.visitMatrix);
        this.visitMatrix[i][i] = 1;
    }

    printMatrix(){
        console.log(this.visitMatrix);
    }

    isDone(){
        var done = true;
        for(var i = 0; i < this.visitMatrix[0].length; ++i){
            done = this.visitMatrix[i][i] === 1;
        }
        
        if(done){
            done = this.x === this.y;
        }

        return done;
    }
}