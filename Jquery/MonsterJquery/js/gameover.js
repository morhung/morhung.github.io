var gameover = function(game) {
	this.game = game;
	
	/*
	* gameover when heart = 0 or score < 0.
	* when gameover, draw gameover's image and high score.
	*/
	this.gameover = function() {
		if (this.game.heart == 0 || self.game.score < 0) {
			this.game.running = false;
			this.game.checkpaused = true;
			this.game.context.drawImage(this.game.resource.gameover.img, 80, 200);

			if (self.game.score > sessionStorage.SCORE) {
				sessionStorage.SCORE = self.game.score;
			}
			//draw high score.
			this.game.context.fillStyle = "blue";
			this.game.context.font = "30px Arial";
			this.game.context.fillText("High Score: " + sessionStorage.SCORE, 160, 450);

			//draw score current
			this.game.context.fillStyle = "red";
			this.game.context.font = "30px Arial";
			this.game.context.fillText("Score: " + self.game.score, 190, 420);			
		}
	}
}