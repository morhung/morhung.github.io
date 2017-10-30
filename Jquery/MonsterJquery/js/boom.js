var boom = function(game) {
	this.game = game;

	//draw boom icon
	this.drawBoom = function() {
		self.game.context.drawImage(self.game.resource.boom.img, 420, 20);
		self.game.context.fillStyle = "#ffffff";
		self.game.context.font = "15px Arial";
		self.game.context.fillText(this.game.numberBoom, 430, 26);	
	}

	//kill all monster visiable in game.
	this.killMonster = function() {
		if (self.game.numberBoom > 0 && self.game.running == true) {
			self.game.numberBoom--;
			for (var i = 0; i < self.game.monsters_arr.length; i++) {
				self.game.monsters_arr[i].bumz();
			}
			self.game.monsters_arr.splice(0, self.game.monsters_arr.length);
		}
	}	
}