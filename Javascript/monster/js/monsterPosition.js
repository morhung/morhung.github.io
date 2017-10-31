var monsterPosition = function(x, y, defaultX, defaultY, toX, toY, visible) {
	this.x = x; //position current x
	this.y = y; //position current y
	this.defaultX = defaultX; //position x default
	this.defaultY = defaultY; //position y default
	this.toX = toX; //move to position x
	this.toY = toY; //move to position y
	this.visible = visible;
	this.checkMoveEnd = false;

	//monster move.
	this.move = function(speed) {
		if (this.x == this.toX && this.y == this.toY ) {
			this.toX = this.defaultX;
			this.toY = this.defaultY;
			this.x -= speed;
			this.y -= speed;
		}

		if (this.x > this.toX) {
			this.x -= speed;			
		} else if (this.x < this.toX) {
			this.x += speed;
		}

		if (this.y < this.toY) {
			this.y += speed;		
		} else if (this.y > this.toY) {
			this.y -= speed;		
		}
	
		//check the monster go out display.
		if (this.x == this.defaultX && this.y == this.defaultY) {
			this.checkMoveEnd = true;
			this.visible = false;
		}
	}
}