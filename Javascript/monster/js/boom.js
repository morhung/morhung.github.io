var boom = function(game) {
	this.game = game;

	var self = this;
	
	this.drawBoom = function() {
		self.game.context.drawImage(self.game.resource.boom.img, 420, 20);		
	}

	//kill all monster visiable in game.
	this.killMonster = function() {
		if (self.game.numberBoom > 0 && self.game.running == true) {
			self.game.numberBoom--;
			self.game.monsters_arr.splice(0, self.game.monsters_arr.length);
		}
	}
}