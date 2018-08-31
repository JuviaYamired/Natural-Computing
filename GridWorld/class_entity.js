class Entity{
    
    constructor(entity, quantity, childs, grow, hunger, sprite, size, x, y) {
        this.entity = entity;
        this.quantity = quantity;
        this.childs = childs;
        this.grow = grow;
        this.hunger = hunger;
        this.sprite = sprite;
        this.size = size;
        this.x = x;
        this.y = y;
    }
    
    show(){
        if(this.quantity > 0)
            image(this.sprite, this.x * this.size, this.y * this.size, this.size, this.size);
    }

    do(action){
        if(!isRandom && this.entity > 0){
            var nFood = 0;
            var newX = 0;
            var newY = 0;
            //            move eat nothing  
            var actions = [0,  0,  0];
            //Up 
            if(this.x > 0 && board[this.x - 1][this.y][this.entity - 1].quantity > nFood){
                nFood = board[this.x - 1][this.y][this.entity - 1].quantity; 
                newX = -1;
                newY = 0;
            }
            //Down
            if(this.x < rows - 1 && board[this.x + 1][this.y][this.entity - 1].quantity > nFood){
                nFood = board[this.x + 1][this.y][this.entity - 1].quantity; 
                newX = 1;
                newY = 0;
            }
            //Left
            if(this.y > 0 && board[this.x][this.y - 1][this.entity - 1].quantity > nFood ){ 
                nFood = board[this.x][this.y - 1][this.entity - 1].quantity; 
                newX = 0;
                newY = -1; 
            }
            //Rigth
            if(this.y < columns - 1 && board[this.x][this.y + 1][this.entity - 1].quantity > nFood){ 
                nFood = board[this.x][this.y + 1][this.entity - 1].quantity; 
                newX = 0;
                newY = 1;  
            }

            var probability = new Probability({
                p: '80%',                                 
                f: function(){
                    actions[0] = 1;
                }
            }, {
                p: '15%',
                f: function(){
                    actions[1] = 1;
                }
            },{
                p: '5%',
                f: function () {
                    actions[2] = 1;
                }
            });
            probability();

            if(actions[0] == 1){
                this.move(newX, newY);
            }
            if(actions[1] == 1){
                this.eat();
            }
            actions = [0,0,0];
        }
        else{
            switch (action){
                case 0:
                    this.move(0,0);
                break;
                case 1:
                    this.eat();
                break;
                case 2:
                    //nothing;
                break;
            }    
        }
    }

    move(newX, newY){        
        if(this.entity > 0 && this.entity < 3){
            if (board[this.x][this.y][this.entity].quantity > 0) {
                if(!isRandom){
                    let valueX = newX;
                    let valueY = newY;
                    board[this.x][this.y][this.entity].quantity -= 1;
                    board[this.x + valueX][this.y + valueY][this.entity].quantity += 1;
                    return true;
                } 
                else {
                    let valueX = floor(random(-1, 2));
                    let valueY = floor(random(-1, 2));
                    if (valueX < 0 && this.x == 0) { return false; }
                    if (valueY < 0 && this.y == 0) { return false; }
                    if (valueY > 0 && this.y == columns - 1) { return false; }
                    if (valueX > 0 && this.x == rows - 1) { return false; }
                    board[this.x][this.y][this.entity].quantity -= 1;
                    board[this.x + valueX][this.y + valueY][this.entity].quantity += 1;
                    return true;
                }                
            }
        }
    }
    
    eat() {
        if(this.entity > 0 && this.entity < 3){
            if (board[this.x][this.y][this.entity].quantity > 0) {
                if (board[this.x][this.y][this.entity - 1].quantity > 0) {
                    board[this.x][this.y][this.entity - 1].quantity -= 1;
                    this.hunger = hungerIteration[this.entity];
                    return true;
                }
            }
        }
    }

    reproduction() {
        if(this.entity >= 0 && this.entity < 3){
            if (iteration % this.grow == 0) {
                for(let i = 0; i < this.childs; ++i){
                    if (board[this.x][this.y][this.entity].quantity > 0) {
                        let valueX = floor(random(-1, 2));
                        let valueY = floor(random(-1, 2));
                        if (valueX < 0 && this.x == 0) { return false; }
                        if (valueY < 0 && this.y == 0) { return false; }
                        if (valueY > 0 && this.y == columns - 1) { return false; }
                        if (valueX > 0 && this.x == rows - 1) { return false; }
                        board[this.x + valueX][this.y + valueY][this.entity].quantity += 1;
                    }
                }
            }
        }
    }

    die(){        
        if(this.entity > 0 && this.entity < 3){
            if(this.hunger > 0){
                this.hunger-= 1;
            }
            if (this.hunger == 0) {
                if (board[this.x][this.y][this.entity].quantity > 0) {
                    board[this.x][this.y][this.entity].quantity -= 1;
                }
            }
        }
    }
}