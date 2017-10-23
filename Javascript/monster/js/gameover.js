var gameover = function(game) {
	this.game = game;

	var self = this;
	
	this.gameover = function() {
		if (self.game.heart == 0 || sessionStorage.SCORE < 0) {
			self.game.running = false;
			self.game.checkpaused = true;
			self.game.context.drawImage(self.game.resource.gameover.img, 80, 200);
			self.game.context.fillStyle = "blue";
			self.game.context.font = "30px Arial";
			self.game.context.fillText("High Score: " + sessionStorage.SCORE, 160, 450);
		}
	}
}