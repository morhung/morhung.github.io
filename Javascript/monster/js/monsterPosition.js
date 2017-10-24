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
	this.move = function() {
		if (this.x == this.toX && this.y == this.toY ) {
			this.toX = this.defaultX;
			this.toY = this.defaultY;
			this.x -= SPEED;
			this.y -= SPEED;
		}

		if (this.x > this.toX) {
			this.x -= SPEED;			
		} else if (this.x < this.toX) {
			this.x += SPEED;
		}

		if (this.y < this.toY) {
			this.y += SPEED;		
		} else if (this.y > this.toY) {
			this.y -= SPEED;		
		}
	
		//check the monster go out display.
		if (this.x == this.defaultX && this.y == this.defaultY) {
			this.checkMoveEnd = true;
			this.visible = false;
		}
	}
}