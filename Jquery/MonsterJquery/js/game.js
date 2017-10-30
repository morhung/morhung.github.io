sessionStorage.SCORE = 0;
sessionStorage.LEVEL = 0;

var game = function() {
	this.canvas = null;
	this.context = null;
	this.resource = null;
	this.boom = null;
	this.pause = null;
	this.restartGame = null;
	this.gameover = null;
	this.monsters_arr = [];
	this.bloodList = [];
	this.score = 5000;
	this.heart = 5;
	this.level = 0;
	this.numberBoom = 3;
	this.resourceLoaded = false;
	this.running = true;
	this.checkpaused = false;
	this.speed_arr = [];
	this.speed;
	

	let self = this;

	this.init = function() {
		this.canvas = $("#canvas_game")[0];
		this.context = this.canvas.getContext("2d");

		this.resource = new resource(this);
		this.boom = new boom(this);
		this.pause = new pause(this);
		this.restartGame = new restartGame(this);
		this.gameover = new gameover(this);

		this.resource.loadResource();
		this.createSpeedArr(240);
		this.speed = self.speed_arr[0];

		this.canvas.click(function(e) {
			let xPosition = e.pageX - this.offsetLeft;
			let yPosition = e.pageY - this.offsetTop;		
			
			//menu click
			if (yPosition < 100) {
				
				//restart
				if (xPosition > 260 && xPosition < 340 && yPosition > 20 && yPosition < 90) {			
						self.restartGame.restart();			
				}

				//pause
				if (xPosition > 340 && xPosition < 420 & yPosition > 20 && yPosition < 90) {
					self.pause.pauseGame();
				}

				//boom
				if (xPosition > 420 && xPosition < 490 && yPosition > 20 && yPosition < 90) {
					self.boom.killMonster();
				}
			} else if (yPosition > 100 && self.running == true) {

				//game click
				let i = 0;
				let countNotClickMonster = 0;
				for (; i < self.monsters_arr.length; i++) {
					if (self.monsters_arr[i].clickMonster(xPosition, yPosition)) {	
						self.monsters_arr[i].setLevel();
						self.monsters_arr.splice(i, 1);
						self.score += 10;			
						self.speed = self.speed_arr[self.level];															
						return;					
					}
				}
			
				// not click in monster => score = score - 5.
				if (i == self.monsters_arr.length) {
					self.score -= 5;
					countNotClickMonster++;
				}

				// not click 5 times in monster =>> score = score - 5.
				if (countNotClickMonster == 5) {
					self.heart--;
					countNotClickMonster = 0;
				}				
			}				
		});
		
		setInterval(self.creatMonster, 2000);
	}

	this.creatMonster = function() {
		if (self.running) {
			if (self.resourceLoaded) {
				let newMonster = new monster(self);
				newMonster.initMonster();
				self.monsters_arr.push(newMonster);
			}
		}
	}

	this.start = function() {
		this.loop();
	}
	//loop in game
	this.loop = function(){
		if (self.running) {
			self.update();
			self.draw();
			//setTimeout(self.loop);
			requestAnimationFrame(self.loop);
		}
	}

	this.update = function() {
		this.updateAllmonsters();
	}

	/*
	* update monster's position when it move.
	* if it move out display, del it in monsters array and score + 5
	 */
	this.updateAllmonsters = function() {
		for (let i = 0; i < this.monsters_arr.length; i++) {
			this.monsters_arr[i].update();
			if (self.monsters_arr[i].checkMoveEndLine()) {
				self.monsters_arr.splice(i, 1);
				self.score -= 5;
			}
		}
	}

	/*
	* draw the game
	* if resource not loaded, draw the Loading...wait for load resource
	* if resource loaded, draw game (image, text,...)
	 */
	this.draw = function() {
		self.context.fillStyle = "#3e738e";
		self.context.fillRect(0, 0, 500, 600);
		if (self.resourceLoaded == false) {
			self.drawLoading();
		} else {
			self.drawGame();
		}
	}

	//draw loading... when loading resource.
	this.drawLoading = function() {
		self.context.fillStyle = '#ffffff';
		self.context.font = '30px Arial';
		self.context.fillText('Loading...', 150, 300);
	}

	// draw the game and menu game
	this.drawGame = function() {
		self.drawBackground();	
		self.drawHeart();
		self.drawLevel();
		self.drawBlood();
		self.drawAllmonsters_arr();
		self.boom.drawBoom();
		self.pause.drawPause();
		self.drawScore();
		self.restartGame.drawRestart();
		self.gameover.gameover();
	}

	//Draw all monsters_arr
	this.drawAllmonsters_arr = function() {
		for (var i = 0; i < this.monsters_arr.length; i++) {
			this.monsters_arr[i].draw();
		}
	}

	// draw score and score value in game.
	this.drawScore = function(){
		self.context.fillStyle = '#ffffff';
		self.context.font = '26px Arial bold';
		self.context.fillText('Score: ' + self.score, 10, 25);
	}

	//background in game
	this.drawBackground = function() {
		self.context.drawImage(self.resource.background.img, 0, 100);
	}

	//draw heart
	this.drawHeart = function() {
		self.context.drawImage(self.resource.heart.img, 10, 32);
		self.context.fillStyle = "#ffffff";
		self.context.font = "26px Arial bold";
		self.context.fillText(this.heart, 50, 55);
	}

	//draw level
	this.drawLevel = function() {
		self.context.drawImage(self.resource.level.img, 10, 66);
		self.context.fillStyle = "#ffffff";
		self.context.font = "26px Arial bold";
		self.context.fillText(self.level, 50, 92);
	}

	//draw blood when monster died.
	this.drawBlood = function() {
		if (self.bloodList.length > 8) {
			self.bloodList.splice(0, 1); //del first index in array bloodList
		}

		//list blood
		if (self.bloodList.length > 0) {
			for (bi = 0; bi < self.bloodList.length; bi++) {
				self.context.drawImage(self.resource.blood.img, self.bloodList[bi].x - 50, self.bloodList[bi].y - 50);
			}
		}
	}

	//Creat SPEED's array.
	this.createSpeedArr = function(n) {
		for (var i = 2; i < n; i++) {
			if ((n % i) == 0 && i != 3) {
				self.speed_arr.push(i);
			}
		}
	}
}