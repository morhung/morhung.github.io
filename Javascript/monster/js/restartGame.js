var restartGame = function(game) {
	this.game = game;
	
	var self = this;

	this.drawRestart = function() {
		self.game.context.drawImage(self.game.resource.restart.img, 260, 20);
	}

	this.restart = function() {
		SPEED = SPEED_ARR[0];
		sessionStorage.SCORE = 0;
		self.game.heart = 5;
		self.game.level = 0;
		self.game.numberBoom = 3;
		self.game.running = true;
		self.game.checkpaused = false;
		self.game.monsters_arr.splice(0, self.game.monsters_arr.length);
		self.game.bloodList.splice(0, self.game.bloodList.length);
		self.game.start();
	}
}