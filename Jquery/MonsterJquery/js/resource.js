var gameImage = function(name) {
	this.name = name;
	this.img  = null;
	this.loaded = false; // check img loaded?

	let self = this;

	this.loadImg = function() {
		this.img = new Image();
		$(this.img).on("load", function() {
			console.log("load imf");
			self.loaded = true;
		});
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
	
	let self = this;

	this.loadResource = function() {
		this.monster1.loadImg();
		this.monster2.loadImg();
		this.monster3.loadImg();
		this.monster4.loadImg();
		this.monster_die.loadImg();
		this.background.loadImg();
		this.pause.loadImg();
		this.play.loadImg();
		this.restart.loadImg();
		this.boom.loadImg();
		this.blood.loadImg();
		this.heart.loadImg();
		this.level.loadImg();
		this.gameover.loadImg();
	}

	//loop check image loaded after 0.5s
	setInterval(function() {
		self.checkAllImageLoaded();
	}, 500)

	this.checkAllImageLoaded = function() {
		if (this.monster1.loaded &&
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
			)
		{
			this.game.resourceLoaded = true;
		}
	}
}