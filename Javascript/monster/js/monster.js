var monster = function(game) {
	this.game = game;
	this.img = null; //img icon monster
	this.type = 1; // monster's image type;
	this.die = false; // monster's state.
	this.pos = null; //position of monster when create
	this.click = false;
	
	var blood = {}; //blood obj
	
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
		*	function(x, y, defaultX, defaultY, toX, toY, visiable)
		**/
		pmonster1 = new monsterPosition(0, 100, 0, 100, 240, 340, true); 
		pmonster2 = new monsterPosition(0, 315, 0, 315, 240, 315, true); 
		pmonster3 = new monsterPosition(0, 530, 0, 530, 240, 290, true); 
		pmonster4 = new monsterPosition(215, 530, 215, 530, 215, 290, true); 
		pmonster5 = new monsterPosition(430, 530, 430, 530, 190, 290, true); 
		pmonster6 = new monsterPosition(430, 315, 430, 315, 190, 315, true); 
		pmonster7 = new monsterPosition(430, 100, 430, 100, 190, 340, true); 
		pmonster8 = new monsterPosition(215, 100, 215, 100, 215, 340, true);

		//add monster's position when create to array and random it.
		let postions = [pmonster1, pmonster2, pmonster3, pmonster4, pmonster5, pmonster6, pmonster7, pmonster8];
		
		//random monster's position when creat monster.
		this.pos = postions[this.getRandomMonster(0, 7)];

	}

	//get random in [min, max].
	this.getRandomMonster = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//update the monster's position when it move
	this.update = function() {
		if (this.pos.visible) {
			this.pos.move(this.game.speed);
		}
	 }

	//draw the monster
	this.draw = function() {
		if (this.pos.visible) {
			this.game.context.drawImage(this.img, this.pos.x, this.pos.y);
		}
	}

	//check monster's position when go out display.
	this.checkMoveEndLine = function() {
		return this.pos.checkMoveEnd == true ? true : false;
	}
	
	//action when click monster
	this.clickMonster = function(cx, cy) {
		if (cx >= this.pos.x && (cx <= this.pos.x + 70) && cy >= this.pos.y && (cy <= this.pos.y + 70)) {
			//blood position when monster died			
			blood.x = cx;
			blood.y = cy;

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

		//if level++, heart++
		if (this.game.level > sessionStorage.LEVEL) {
			this.game.heart++;
			sessionStorage.LEVEL = this.game.level;
		}
	}

	//blood's position of monster when click boom.
	this.bumz = function() {	
		blood.x = this.pos.x + 40;
		blood.y = this.pos.y + 40;
		this.game.bloodList.push(blood);
	}
}