var gameover = function(game) {
	this.game = game;
	
	this.gameover = function() {
		if (this.game.heart == 0 || self.game.score < 0) {
			this.game.running = false;
			this.game.checkpaused = true;
			this.game.context.drawImage(this.game.resource.gameover.img, 80, 200);
			if (self.game.score > sessionStorage.SCORE) {
				sessionStorage.SCORE = self.game.score;
			}
			this.game.context.fillStyle = "blue";
			this.game.context.font = "30px Arial";
			this.game.context.fillText("High Score: " + sessionStorage.SCORE, 160, 450);
		}
	}
}