var restartGame = function(game) {
	this.game = game;
	
	//draw button restart
	this.drawRestart = function() {
		this.game.context.drawImage(this.game.resource.restart.img, 260, 20);
	}

	//restart game when button restart clicked.
	this.restart = function() {
		SPEED = SPEED_ARR[0];
		sessionStorage.LEVEL = 0;
		self.game.score = 0;
		this.game.heart = 5;
		this.game.level = 0;
		this.game.numberBoom = 3;
		this.game.running = true;
		this.game.checkpaused = false;
		this.game.monsters_arr.splice(0, this.game.monsters_arr.length);
		this.game.bloodList.splice(0, this.game.bloodList.length);
		this.game.start();
	}
}