var pause = function(game) {
	this.game = game;
	//draw button pause in game.
	this.drawPause = function() {
		this.game.context.drawImage(this.game.resource.pause.img, 340, 20);
	}

	//paused game when click button pause and set the button icon.
	this.pauseGame = function() {
		if (this.game.checkpaused == false) {
			if (this.game.running) {
				this.game.running = false;
				this.game.context.drawImage(this.game.resource.play.img, 340, 20);
			} else {
				this.game.running = true;
				this.game.context.drawImage(this.game.resource.pause.img, 340, 20);
				this.game.start();
			}
		}
	}

}