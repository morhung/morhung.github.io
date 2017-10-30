var SPEED_ARR = []; //array speed
var SPEED;
sessionStorage.SCORE = 0;
sessionStorage.LEVEL = 0;

var game = function() {
	this.canvas = null;
	this.context = null;
	this.resource = null; // resource
	this.monsters_arr = []; // monster array
	this.boom = null;
	this.numberBoom = 3; //number Boom in game
	this.pause = null;
	this.checkpaused = false;
	this.restartGame = null;
	this.score = 0;
	this.heart = 5;
	this.level = 0;
	this.resourceLoaded = false; // check resource loaded??
	this.bloodList = []; // blood array when monster died
	this.running = true; // check running status
	this.gameover = null;
	this.timeLoop = 16; //60 frame/s
	
	let clearTime;
	let countNotClickMonster = 0;
	let self = this;
	
	//create game function.
	this.init = function() {
		this.canvas = document.getElementById("canvas_game");
		this.context = this.canvas.getContext("2d");

		//creat obj
		this.resource = new resource(this);
		this.boom = new boom(this);
		this.pause = new pause(this);
		this.restartGame = new restartGame(this);
		this.gameover = new gameover(this);
			
		this.resource.load(); // load resource
		this.createSpeedArr(240); // creat the speed array
		SPEED = SPEED_ARR[0];
		
		//event click in game.
		this.canvas.addEventListener("click", function(e) {
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

				for (; i < self.monsters_arr.length; i++) {
					if (self.monsters_arr[i].clickMonster(xPosition, yPosition)) {	
						self.monsters_arr[i].setLevel();
						self.monsters_arr.splice(i, 1);
						self.score += 10;			
						SPEED = SPEED_ARR[self.level];															
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

		//create 1 monster after 2s
		setInterval(self.creatMonster, 2000);	
	}

	//start game.
	this.start = function() {	
		this.loop();			
	}

	// Create Monster and push it to monster array
	this.creatMonster = function() {
		if (self.running) {
			if (self.resourceLoaded) {
				newMonster = new monster(self);
				newMonster.init();
				self.monsters_arr.push(newMonster); //push monsters_arr to monster array.
			}
		}			
	}

	//loop in game
	this.loop = function(){
		if (self.running) {
			self.update();
			self.draw();
			clearTimeout(clearTime);
			clearTime = setTimeout(self.loop, self.timeLoop); 
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
		self.drawBoomNumber();
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

	//draw max number boom in game
	this.drawBoomNumber = function() {
		self.context.fillStyle = "#ffffff";
		self.context.font = "15px Arial";
		self.context.fillText(this.numberBoom, 430, 26);
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
				SPEED_ARR.push(i);
			}
		}
	}
}