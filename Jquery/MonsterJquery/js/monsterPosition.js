var monsterPosition = function(x, y, startX, startY, endX, endY, visible) {
	this.x = x; //position current x
	this.y = y; //position current y
	this.startX = startX; //position x default
	this.startY = startY; //position y default
	this.endX = endX; //move to position x
	this.endY = endY; //move to position y
	this.visible = visible;
	this.checkMoveEnd = false;

	//monster move function.
	this.move = function(speed) {
		if (this.x == this.endX && this.y == this.endY ) {
			this.endX = this.startX;
			this.endY = this.startY;
			this.x -= speed;
			this.y -= speed;
		}

		if (this.x > this.endX) {
			this.x -= speed;			
		} else if (this.x < this.endX) {
			this.x += speed;
		}

		if (this.y < this.endY) {
			this.y += speed;		
		} else if (this.y > this.endY) {
			this.y -= speed;		
		}
	
		//check the monster go out display.
		if (this.x == this.startX && this.y == this.startY) {
			this.checkMoveEnd = true;
			this.visible = false;
		}
	}
}