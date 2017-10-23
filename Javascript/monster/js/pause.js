var pause = function(game) {
	this.game = game;

	this.drawPause = function() {
		this.game.context.drawImage(this.game.resource.pause.img, 340, 20);
	}

	this.pauseGame = function() {
		if (this.game.checkpaused == false) {
			if (this.game.running) {
				this.game.running = false;
				this.game.context.drawImage(this.game.resource.play.img, 340, 20);
				console.log("paused");
			}else {
				this.game.running = true;
				this.game.context.drawImage(this.game.resource.pause.img, 340, 20);
				this.game.start();
			}
		}
	}
}