var pause = function(game) {
	this.game = game;

	var self = this;

	this.drawPause = function() {
		self.game.context.drawImage(self.game.resource.pause.img, 340, 20);
	}

	this.pauseGame = function() {
		if (self.game.checkpaused == false) {
			if (self.game.running) {
				self.game.running = false;
				self.game.context.drawImage(self.game.resource.play.img, 340, 20);
				console.log("paused");
			}else {
				self.game.running = true;
				self.game.context.drawImage(self.game.resource.pause.img, 340, 20);
				self.game.start();
			}
		}	
	}
}