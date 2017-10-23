var gameImage = function(name) {
	this.img = null;
	this.name = name;
	this.loaded = false;

	var self = this;

	this.load = function() {
		this.img = new Image();
		this.img.onload = function() {
			self.loaded = true;
		}
		this.img.src = 'img/' + name + '.png';
	}
}

var resource = function(game) {
		this.game = game;
		this.monster1 = new gameImage("monster1");
		this.monster2 = new gameImage("monster2");
		this.monster3 = new gameImage("monster3");
		this.monster4 = new gameImage("monster4");
		this.monster_die = new gameImage("blood");
		this.background = new gameImage("background3");
		this.pause = new gameImage("pause");
		this.play = new gameImage("play");
		this.restart = new gameImage("restart");
		this.boom = new gameImage("boom");
		this.blood = new gameImage("blood");
		this.heart = new gameImage("heart");
		this.level = new gameImage("level");
		this.gameover = new gameImage("gameover");

		var self = this;
		
		this.load = function() {
			this.monster1.load();
			this.monster2.load();
			this.monster3.load();
			this.monster4.load();
			this.monster_die.load();
			this.background.load();
			this.pause.load();
			this.play.load();
			this.restart.load();
			this.boom.load();
			this.blood.load();
			this.heart.load();
			this.level.load();
			this.gameover.load();
		}

		setInterval(function() {
			self.checkAllImageLoaded();
		}, 500)

		//Check all Image loaded?
		this.checkAllImageLoaded = function() {
		if (
			this.monster1.loaded &&
			this.monster2.loaded &&
			this.monster3.loaded &&
			this.monster4.loaded &&
			this.monster_die.loaded &&
			this.background.loaded &&
			this.pause.loaded &&
			this.play.loaded &&
			this.restart.loaded &&
			this.boom.loaded &&
			this.blood.loaded &&
			this.heart.loaded &&
			this.level.loaded &&
			this.gameover.loaded
			) {
			this.game.resourceLoaded = true;
		}
	}
}

	
