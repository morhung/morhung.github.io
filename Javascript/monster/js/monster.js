var monster = function(game) {
	this.game = game;
	this.img = null; //img icon monster
	this.type = 1; // monster's image type;
	this.die = false; // monster's state.
	this.pos = null; //position of monster when create
	this.click = false;

	this.init = function() {

		//random image'monster type in game.
		this.type = this.getRandomMonster(1, 4); //4 type monster icon.
		if (this.type == 1) {
			this.img = this.game.resource.monster1.img;
		}
		if (this.type == 2) {
			this.img = this.game.resource.monster2.img;			
		}
		if (this.type == 3) {
			this.img = this.game.resource.monster3.img;			
		}
		if (this.type == 4) {
			this.img = this.game.resource.monster4.img;			
		}

		/* 
		*	set the monster's position when create. There 're 8 postions in game'
		*	function(x, y, defaultX, defaultY, toX, toY, die, dieX, dieY)
		**/
		pmonster1 = new monsterPosition(0, 100, 0, 100, 240, 340, false, 0, 0, true); 
		pmonster2 = new monsterPosition(0, 315, 0, 315, 240, 315, false, 0, 0, true); 
		pmonster3 = new monsterPosition(0, 530, 0, 530, 240, 290, false, 0, 0, true); 
		pmonster4 = new monsterPosition(215, 530, 215, 530, 215, 290, false, 0, 0, true); 
		pmonster5 = new monsterPosition(430, 530, 430, 530, 190, 290, false, 0, 0, true); 
		pmonster6 = new monsterPosition(430, 315, 430, 315, 190, 315, false, 0, 0, true); 
		pmonster7 = new monsterPosition(430, 100, 430, 100, 190, 340, false, 0, 0, true); 
		pmonster8 = new monsterPosition(215, 100, 215, 100, 215, 340, false, 0, 0, true);

		//add monster's position when create to array and random it.
		let postions = [pmonster1, pmonster2, pmonster3, pmonster4, pmonster5, pmonster6, pmonster7, pmonster8];
		
		this.pos = postions[this.getRandomMonster(0, 7)];

	}

	this.getRandomMonster = function(min, max) {
		return Math.floor(Math.random() * (max - min +1)) + min;
	}

	//update the monster's position when it move
	this.update = function() {
		if (this.pos.visible) {
			this.pos.move();
		}
	 }

	//draw the monster
	this.draw = function() {
		if (this.pos.visible) {
			this.game.context.drawImage(
				this.img,
				this.pos.x,
				this.pos.y
			);
		}
	}

	//check monster's position when go out display.
	this.checkMoveEndLine = function() {
		if (this.pos.checkMoveEnd) {
			return true;
		}
		return false;
	}
	
	//action when click monster
	this.clickMonster = function(cx, cy) {
		if (cx >= this.pos.x && (cx <= this.pos.x + 70) && cy >= this.pos.y && (cy <= this.pos.y + 70)) {
			this.pos.dieX = cx;
			this.pos.dieY = cy;
			this.pos.x = this.pos.defaultX;
			this.pos.y = this.pos.defaultY;

			//blood position
			let blood = {};
			blood.x = this.pos.dieX;
			blood.y = this.pos.dieY;

			//blood array
			this.game.bloodList.push(blood);
			return true;
		}
		return false;
	}

	//set level in game.
	this.setLevel = function(){
		let level_old = this.game.level;
		this.game.level = Math.floor(self.game.score / 50);
		if (this.game.level < level_old) {
			this.game.level = level_old;	
		}	
	}
}