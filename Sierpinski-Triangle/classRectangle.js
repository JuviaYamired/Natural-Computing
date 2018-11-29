function Rectangle(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
}

Rectangle.prototype.draw = function(){
        noStroke();
        //fill(random(255), random(255), random(255));
        fill(100, 100, 255);
        rect(this.x,this.y, this.w, this.h)
};

Rectangle.prototype.split = function(){
        var currentIndex = rectList.indexOf(this);
        rectList.splice(currentIndex, 1);
        
        rectList.push(new Rectangle(this.x, this.y, this.w/3, this.h/3));
        rectList.push(new Rectangle(this.x + this.w/3, this.y, this.w/3, this.h/3));
        rectList.push(new Rectangle(this.x + 2*this.w/3, this.y, this.w/3, this.h/3));

        rectList.push(new Rectangle(this.x, this.y + this.h/3, this.w/3, this.h/3));
        //Deleted Center
        rectList.push(new Rectangle(this.x + 2*this.w/3, this.y + this.h/3, this.w/3, this.h/3));

        rectList.push(new Rectangle(this.x, this.y + 2*this.h/3, this.w/3, this.h/3));
        rectList.push(new Rectangle(this.x + this.w/3, this.y + 2*this.h/3, this.w/3, this.h/3));
        rectList.push(new Rectangle(this.x + 2*this.w/3, this.y + 2*this.h/3, this.w/3, this.h/3));

        colorArea -= this.w/3 * this.h/3;
};

function splitAllRects(){
    
    var toSplit = [];
    for (var i = 0; i < rectList.length; i++)
	{
		var tempRect = rectList[i];
		toSplit.push(tempRect);
    }
    
    for(var i = 0; i < toSplit.length; ++i){
        toSplit[i].split();
    }
    
}

function drawAllRects(){
    for(var i = 0; i < rectList.length; ++i){
        rectList[i].draw();
    }
}