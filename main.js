var game = new Phaser.Game(368, 594, Phaser.AUTO, 'phaser-example'); //Initializing the game, with a 368px by 594px workspace
var lives; //Declaring the lives variable  
var lostLifeAlready; //Declaring lostLifeAlready boolean variable 
var bugAquiredAlready; //Declaring lostLifeAlready boolean variable 
var countDownTime; //Declaring countDownTime variable used for endScreenState
var timer, timerEvent, text; //Declaring three variables for count donw timer on endScreenState
var endScore = 0; //Declaring the endScore to 0 when game starts
var highScore = 0; //Declaring the highscore to 0 when game starts
var highScoreB = true; //Declaring highScoreB boolean to true when game start to allow new highscore when game begins
var cheatActivated = false; //Set 'cheatActivated' boolean to false
var bug; //Declaring bug varaible
var bugSmall; //Declaring bugSmall varaible
var bugSmall2; //Declaring bugSmall2 varaible
var bugSmall3; //Declaring bugSmall3 varaible
var bugSmall4; //Declaring bugSmall4 varaible
var bugSmall5; //Declaring bugSmall5 varaible
var x; //Declaring bug varaible
var runbug = false; //Declaring runbug varaible
var bugCount; //count how many bugs were eaten

/* startScreenState (Function is run when game is start, it display the start screen for the game) (START)*/
var startScreenState = {    
    /* Preload() function (START) */
    preload: function() { //Preload() function loads in all variables below, before the game start screen is created
        game.load.audio('hoverSound', 'assets/click.wav'); //Preload the sound asset for the 'hoverSound'
        game.load.audio('secretSound', 'assets/secret.wav'); //Preload the sound asset for the 'secretSound'
        game.load.audio('startSound', 'assets/start.wav'); //Preload the sound asset for the 'startSound' 
        game.load.image('loadingScreen', 'assets/loadingScreen.png'); //Preload the image asset for the 'loadingScreen'
        game.load.image('mainLogo', 'assets/mainLogo.png'); //Preload the image asset for the 'mainLogo'
        game.load.image('highScoreText', 'assets/highScoreText.png'); //Preload the image asset for the 'highScoreText'
        game.load.spritesheet('button', 'assets/startBtn.png', 193, 58); //Preload the spite sheet sizes for the image asset for the 'startBtn'
		game.load.spritesheet('button1', 'assets/cheatBtn.png', 193, 58); //Preload the spite sheet sizes for the image asset for the 'startBtn'
        game.scale.pageAlignHorizontally = true; //Setting the game to allign horizontally on the screen
        game.scale.pageAlignVertically = true; //Setting the game to allign vertically on the screen
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Allow the game to scale to different screen sizes
    },
    /* Preload() function (END) */

    /* Create() function (START) */
    create: function() { //'Create()' function creates all the code below to allow the startScreenState to function 
        console.log("1-START SCREEN CREATED/LOADED"); //Message output
        loadingScreen = game.add.tileSprite(0,0,368,594,'loadingScreen'); //Creating the 'startScreenState' background
		var playButton = game.add.image(game.world.centerX, game.world.centerY-30, "mainLogo"); //Drawing the main logo to the screen
        playButton.anchor.set(0.5); //Setting the anchor of the main logo
        var tween = game.add.tween(playButton).to({width: 374, height:48}, 1500, "Linear", true, 0, -1); //adding a tween to the button (Moving in out 20px)
        tween.yoyo(true); //Adding yoyo tween to image above
        button = game.add.button(game.world.centerX - 95, 300, 'button', this.actionOnClick, 2, 2, 0); //Create button with different positios using image, thus giving hover effect(Down, over, out).
        button.onInputOver.add(this.over); //When pointer is over button run 'over()' function beneath
		
		button1 = game.add.button(game.world.centerX - 185, game.world.height-50, 'button1', this.actionOnClickCheatCode, 2, 2, 0); //Create button with different positios using image, thus giving hover effect(Down, over, out).
        button1.onInputOver.add(this.over); //When pointer is over button run 'over()' function beneath
		
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //Add event listner to run 'actionOnClick()' function when spacebar is clicked
        spaceKey.onDown.add(this.actionOnClick, this); //Run the 'actionOnClick()' function when space bar is pressed
        var image = game.add.image(10, 20, 'highScoreText'); //Loading the 'highScoreText' image onto the screen in the top right corner
        if(endScore > highScore) { //If 'endScore' is greater than 'highScore' run code beneath
            this.endScore = game.add.text(190, 28, "0", { font: "30px Arial", fill: "#00ff00" }); //Add the 'endScore' text to the screen
            this.endScore.text = endScore; //Set the 'endScore' text value to equals the 'endScore' value
            highScore = endScore; //Set current 'highScore' equals 'endScore'           
        }
        else if(endScore <= highScore) { //If 'endScore' is less or equals to current 'highScore' run code beneath
            this.endScore = game.add.text(190, 28, "0", { font: "30px Arial", fill: "#00ff00" }); //Add the 'endScore' text to the screen
            this.endScore.text = highScore; //Set the 'endScore' text value to equals the 'highScore' value
        }
    },
    /* Create() function (END) */
    
    /* Over() function (START) */
    over: function() { /* 'Over()' functoin called when pointer was over button object mentioned above */
         this.hoverSound = game.add.audio('hoverSound'); //Get reference to the 'hoverSound' mentioned above
         this.hoverSound.play(); //Play 'hoverSound'
    },
    /* Over() function (END) */
    
    /* ActionOnClick() function (START) */
    actionOnClick: function() { /* 'ActionOnClick()' functno called when button mentioned above is clicked */
		cheatActivated = false; //Set 'cheatActivated' boolean to false
        console.log("2-PLAY GAME BUTTON CLICKED"); //Message output
        game.state.start('main'); //Set the game state to main thus running code beneath
        this.startSound = game.add.audio('startSound'); //Get reference to the 'startSound' mentioned above
        this.startSound.play(); //Play 'startSound'
    },
    /* ActionOnClick() function (END) */   
	/* ActionOnClickCheatCode() function (START) */
    actionOnClickCheatCode: function() { /* 'ActionOnClickCheatCode()' functno called when button mentioned above is clicked */
		cheatActivated = true; //Set 'cheatActivated' boolean to false
        console.log("Cheat Code Activated"); //Message output
        game.state.start('main'); //Set the game state to main thus running code beneath
        this.secretSound = game.add.audio('secretSound'); //Get reference to the 'secretSound' mentioned above
        this.secretSound.play(); //Play 'secretSound'
    },
    /* ActionOnClickCheatCode() function (END) */  
};
/* startScreenState (END)*/

/* endScreenState (Function is run when the user looses all lives or hits boundary walls, displays current score) (START)*/
var endScreenState = {
    /* Preload() function (START) */
    preload: function() { //Preload() function loads in all variables below, before the game end screen is created
        game.load.image('endScreen', 'assets/endScreen.png'); //Preload the image asset for the 'endScreen'
        game.load.image('scoreText', 'assets/scoreText.png'); //Preload the image asset for the 'scoreText'
        game.load.image('newHighScoreText', 'assets/newHighScoreText.png'); //Preload the image asset for the 'newHighScoreText'
    },
    /* Preload() function (END) */

    /* Create() function (START) */
    create: function() { //'Create()' function creates all the code below to allow the startScreenState to function 
        console.log("5-END SCREEN CREATED/LOADED"); //Message output
        timer = game.time.create();4//Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this); //The timer counter values
        timer.start(); //Start the timer
        endScreen = game.add.tileSprite(0,0,368,594,'endScreen'); //Creating the 'endScreenState' background
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //Add event listner to run 'startGame()' function when spacebar is clicked
        spaceKey.onDown.add(this.startGame, this); //Run the 'startGame()' function when space bar is pressed
        game.input.onDown.add(this.startGame, this); //Run the 'startGame()' function when screen is pressed
        this.countDown = game.add.text(game.world.centerX, game.world.centerY+100, "0", { font: "30px Arial", fill: "#ffffff" }); //Display the counter value on thes screen 
        this.countDown.text = countDownTime; //With the value of counDownTime
        if(endScore > highScore && endScore != 0) { //If 'endScore' is greater then 'highScore' and 'endScore' is not 0, run code beneath
            highScoreB = true; //Set highScoreB boolean to true
        }
        else if(endScore <= highScore && endScore != 0) { //If 'endScore' is greater then 'highScore' and 'endScore' is not 0 run code beneath
             highScoreB = false; //Set highScoreB boolean to false
        }
    },
    /* Create() function (END) */
    
    /* Render() function (START) */
    render: function () { //'Render()' function keeps get called thus update the time values to give a count donw effect
        if(highScoreB == true) { //If boolean 'highScoreB' equals true
            var image = game.add.image(10, 20, 'newHighScoreText'); //Display the 'newHighScoreText' image on thes screen 
            this.endScore = game.add.text(190, 28, "0", { font: "30px Arial", fill: "#00ff00" }); //Display the new high score text value on thes screen 
            this.endScore.text = endScore; //With the value of the new 'endScore'
            highScore = endScore; //Make 'highScore' equal 'endScore'          
        }
        else if(highScoreB == false) { //If boolean 'highScoreB' equals false
            var image = game.add.image(10, 20, 'scoreText'); //Display the 'scoreText' image on thes screen 
            this.endScore = game.add.text(120, 28, "0", { font: "30px Arial", fill: "#00ff00" }); //Display the current score text value on thes screen 
            this.endScore.text = endScore; //With the value of the 'endScore'
        }
        if (timer.running) { //If our timer is running, show the time in a nicely formatted way, else show 'Done!'
            countDownTime = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#ff0"; //Display the timer on the screen 
            this.countDown.text = countDownTime -25; //With the value counting down
            if(this.countDown.text < 1){ //If the count down value is less then 1 set the game state to 'startScreenState' 
                 game.state.start('startScreenState'); //Set game state to 'startScreenState' 
            }
        } //When time runs up
        else {
            game.debug.text("Done!", 2, 14, "#0f0"); //Display done on the screen
        }
     },
    /* Render() function (END) */
    
    /* EndTimer() function (START) */
    endTimer: function() { //When this function is called the timer gets stoped
        timer.stop(); //Stop the timer when the delayed event triggers
    },
    /* EndTimer() function (END) */
    
    /* StartGame() function (START) */
    startGame: function() { //Function is called when screen or space bar was pressed in the state above
        game.state.start('main'); //Set game state to 'main' 
    },   
    /* StartGame() function (END) */
    
    /* FormatTime() function (START) */
    formatTime: function(s) { //This function Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60); 
        var seconds = "0" + (s - minutes * 60);
        return seconds.substr(-2);   
    } 
    /* FormatTime() function (END) */
};
/* endScreenState (END)*/

/* mainState (Function is run after the start screen, this state contains all the code to allow th game function as a whole) (START)*/
var mainState = {
    /* Preload() function (START) */
    preload: function() { //Preload() function loads in all variables below, before the game end screen is created
        game.load.audio('point', 'assets/pointSound.wav'); //Preload the sound asset for the 'point' 
        game.load.audio('life', 'assets/life.wav'); //Preload the sound asset for the 'life' 
        game.load.audio('collect', 'assets/collectBug.wav'); //Preload the sound asset for the 'collect' 
        game.load.image('rock', 'assets/pipe.png'); //Preload the image asset for the 'rock'
        game.load.audio('jump', 'assets/jump.wav'); //Preload the sound asset for the 'jump' 
        game.load.audio('gameOver', 'assets/gameOver.wav'); //Preload the sound asset for the 'gameOver' 
        game.load.audio('rockHit', 'assets/rockHit.wav'); //Preload the sound asset for the 'rockHit' 
        game.load.image('bg', 'assets/bg.png'); //Preload the image asset for the 'bg'
        game.load.image('smoke', 'assets/smoke.png'); //Preload the image asset for the 'smoke'
		game.load.spritesheet('bat', 'assets/bat.png', 50, 50, 4); //Preload the spite sheet sizes for the image asset for the 'bat'
		game.load.spritesheet('bug', 'assets/bug.png', 80.5, 112, 4); //Preload the spite sheet sizes for the image asset for the 'bat'
		game.load.image('bugSmall', 'assets/bugSmall.png', 80.5, 112, 4); //Preload the spite sheet sizes for the image asset for the 'bat'
		game.load.image('bugSmall2', 'assets/bugSmall.png', 80.5, 112, 4); //Preload the spite sheet sizes for the image asset for the 'bat'
		game.load.image('scoreboard', 'assets/scoreBoard.png'); //Preload the image asset for the 'scoreboard'
   },
    /* Preload() function (END) */

    /* Create() function (START) */
    create: function() { //'Create()' function creates all the code below to allow the startScreenState to function 
        console.log("3-MAIN GAME STARTED/LOADED"); //Message output
		bugCount = 0; //Set bugCount to 1
        this.jumpSound = game.add.audio('jump'); //Adding the audio variable 'jump'
        this.gameOverSound = game.add.audio('gameOver'); //Adding the audio variable 'gameOver'
        this.rockHitSound = game.add.audio('rockHit'); //Adding the audio variable 'rockHit'
        this.pointSound = game.add.audio('point'); //Adding the audio variable 'point'
        this.collectSound = game.add.audio('collect'); //Adding the audio variable 'collect'
        this.lifeSound = game.add.audio('life'); //Adding the audio variable 'life'
        bg = game.add.tileSprite(0,0,368,594,'bg'); //Creating the 'mainState' background
		scoreboard = game.add.tileSprite(7,7,134,57,'scoreboard'); //Creating the 'mainState' background
		backgroundSpeed = 3; //Setting the background speed variable to through, this allows to get background animation effect
        lostLifeAlready = false; //Set 'lostLifeAlready' boolean to false
        bugAquiredAlready = false; //Set 'bugAquiredAlready' boolean to false
        game.physics.startSystem(Phaser.Physics.ARCADE); //Set the game physics system to ARCADE mode
        this.bat = game.add.sprite(100, 245, 'bat'); // Display the bat at the position x=100 and y=245
        var walk = this.bat.animations.add('fly'); //Add an animatation called 'fly' to bat
        this.bat.animations.play('fly', 24, true); //Run the 'fly' animatin on bat at 24fps
        game.physics.arcade.enable(this.bat); //Add ARCADE physics to the bat, used for movements, gravity, collisions, etc.
        this.bat.body.gravity.y = 1000; // Add gravity to the bat to make it fall
		bug = this.bug = game.add.sprite(500, 500, 'bug'); // Display the bug at the position x=500 and y=500
		var walk1 = this.bug.animations.add('fly11'); //Add an animatation called 'fly' to bug
		this.bug.animations.play('fly11', 24, true); //Run the 'fly' animatin on bug at 24fps
		game.physics.arcade.enable(this.bug); //Add ARCADE physics to the bug, used for movements, gravity, collisions, etc.
		//this.bug.body.gravity.y = 1000; // Add gravity to the bat to make it fall
		bug.body.checkCollision.up = true; //Allowing collision detectection for bug up
		bug.body.checkCollision.down = true; //Allowing collision detectection for bug down
		bug.body.checkCollision.left = true; //Allowing collision detectection for bug left
		bug.body.checkCollision.right = false; //Allowing collision detectection for bug right
		bug.body.immovable = true; //Allowing allowing bug to move when hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //Making the spacebar key as event listner 
        spaceKey.onDown.add(this.jump, this); //Add event listner to run 'jump()' function when spacebar is clicked   
        this.rocks = game.add.group(); //Add rocks which holds all the rock constant values
        this.timer = game.time.events.loop(1500, this.addRowOfRocks, this); //Runs function 'addRowOfRocks' every 1.5 seconds, thus drawing new pipes the screen.
        this.timer = game.time.events.loop(100, this.changebugBool, this); //Runs function 'addRowOfRocks' every 1.5 seconds, thus drawing new pipes the screen.
        this.timer = game.time.events.loop(1, this.checkForCol, this); //Runs function 'addRowOfRocks' every 1.5 seconds, thus drawing new pipes the screen.
		if(cheatActivated == true){ //Check if varaible cheatActivated equals true
		this.score = 100; //Set score to 100
		   this.lives = 100; //Setting the lives to 5 
		}
		else {
			this.score = 0; //Set score to 0
			this.lives = 3; //Setting the lives to 3
		}
        this.labelScore = game.add.text(30, 27, "0", { font: "30px Arial", fill: "#ffffff" }); //Display current score on the screen
        this.livesLost = 0; //Setting livesLost to 0
        this.labelLives = game.add.text(103, 27, "0", { font: "30px Arial", fill: "#00ff00" }); //Display current lives on the screen
		this.labelLives.text = this.lives; //Set lives value to that of the 'lives' varaible
        this.bat.anchor.setTo(-0.2, 0.5); //Setting a anchor to the bat in order to keep it in same postion when moving
        game.input.onDown.add(this.jump, this); //Call the 'jump' function when we tap/click on the screen
        this.smokeEmitter = game.add.emitter(this.bat.x, this.bat.y +10, 20); //Adding partical system with smoke emitter to bat
        this.smokeEmitter.makeParticles("smoke"); //Make the smoke particals equal the img 'smoke' made above
        this.smokeEmitter.setXSpeed(0,-100); //Send smoke partical from rear of bat
        this.smokeEmitter.setYSpeed(30, 30); //Send smoke partical from rear of bat drop
        this.smokeEmitter.setAlpha(0.5,1); //The alpha of the smoke particals
        this.smokeEmitter.start(false, 1000,40); //Run the smoke emitter
		x = this.game.width-150; //Setting the bat at minus 150 of game width size
    },
	/* Create() function (END) */
    
    /* MoveBug() function (START) */
    movebug: function(){ //Function to draw the bug at random y position on the screen		
        if(bug.position.x < -bug.width){ //If the bug positon is less then bug width run code beneath
            bug.position.y = Math.random() *this.game.height; //Place bug at random y position
            bug.position.x = this.game.width+150; //Place bug at game width plus 150
            bug.height = bug.width; //Make sure width of bug matches height
            runbug = false; //Set runbug boolean to false
        }	
    },
    /* MoveBug() function (END) */

    /* ChangebugBool() function (START) */
    changebugBool: function(){ //Checks if runbug boolean is certain value then it changes it
        runbug = !runbug; //Changes state
    },
    /* ChangebugBool() function (FALSE) */
	
    /* Update() function (Start) */
    update: function(){ //Funcion runs constaly to update values in game
        bg.tilePosition.x -= backgroundSpeed; //Moves the game background across the screen
        this.smokeEmitter.x = this.bat.x; //Change the x smoke partical postition to the new bat x position
        this.smokeEmitter.y = this.bat.y; //Change the y smoke partical postition to the new bat y position
        if (this.bat.y < 0 || this.bat.y > game.canvas.height) {//Check If the bat is out of the screen (too high or too low)
            this.endGame(); //If stetment returns true run 'endGame()' function
        }
        if(lostLifeAlready == false){ //Checks if lostLifeAlready variable is false
            game.physics.arcade.overlap(this.bat, this.rocks, this.looseLife, null, this); //IFthe bat overlaps the rocks position run funtion 'looseLife()' (Collision detection)
            lostLifeAlready = true; //Set lostLifeAlready variable to true
        }
        if (this.bat.angle < 30) { //As long the angle of the bat is less then 30     
            this.bat.angle += 2; //Move bat angle down by 2
        }
		
		bug.position.x -= 6; //Move the bug from right to left across the game
		if(runbug == true){ //If run bug equals true
            this.movebug(); //Run 'moveBug()' function
        }
		//var divisibleBy5 = bugCount % 5; //Create variable which equals the modulo value of 5
		console.log(" lives " + this.lives); //Pring out lives value
		if(bugCount >= 5){ //IF divisibleBy5 equals 0run code beneath
            this.lifeSound.play(); //Play the 'lifeSound' sound
            bugCount = 0;
            this.bugSmall.destroy(); //Destroy the bugSmall when hit
            this.bugSmall2.destroy(); //Destroy the bugSmall2 when hit
            this.bugSmall3.destroy(); //Destroy the bugSmall3 when hit
            this.bugSmall4.destroy(); //Destroy the bugSmall4 when hit
            this.bugSmall5.destroy(); //Destroy the bugSmall5 when hit
			this.lives = this.lives +1; //Increase life by one
			this.labelLives.text = this.lives; //Dispaly the new current lives on the screen
            bugCount = 0; //Set bugCount back to 0
		}
    },
    /* Update() function (END) */
	
	/* CheckForCol() function (START) */
	 checkForCol: function() { //Function is called when bat and bug overlap
         if(true){ //Checks if bugAquiredAlready variable is false
            this.game.physics.arcade.overlap(bug, this.bat,this.getbug,null,this); //IF the bat overlaps the bug position run funtion 'getbug()' (Collision detection)
			bugAquiredAlready = true; //Set lostLifeAlready variable to true
        }
    }, 
    /* CheckForCol() function (END) */

    /* HitPipe() function (START) */
    hitPipe: function() { //Function is called when bat and rock overlap
        if (this.bat.alive == false) { //If the bar alive property is false return nothing as the bat is falling of the screen
            return;
        }
        this.bat.alive = false; //Set the alive property of the bat to false
        game.time.events.remove(this.timer); //Prevent any new rocks from appearing in the game
        this.rocks.forEach(function(p){ //Go through each rock and stop thier movement
            p.body.velocity.x = 0;
        }, this);
    }, 
    /* HitPipe() function (END) */
    
    /* Jump() function (START) */
    jump: function() { //Function called when user either taps the screen or presses the spacebar
        if (this.bat.alive == false){ //If the bar alive property is false return nothing as the bat is falling of the screen
            return;  
        }
        this.bat.body.velocity.y = -350; //Add a vertical velocity to the bat, thus allowing it to fly
        game.add.tween(this.bat).to({angle: -20}, 100).start(); //Add tween animation to bat moving the angle every time it flys
        this.jumpSound.play(); //Play the 'jumpSound' sound
    },
    /* Jump() function (END) */

    /* restartGame() function (START) */
    restartGame: function() { //Function run when bat leaves game bondaries
        game.state.start('main'); //Start the 'main' state, which restarts the game
    },
    /* restartGame() function (END) */
    
    /* endGame() function (START) */
    endGame: function() { //Function run when user looses all lives
        game.state.start('endScreenState'); //Start the 'main' state, which restarts the game
    },
    /* endGame() function (END) */
    
    /* looseLife() function (START) */
    looseLife: function() { //Function is run when bat and rock overlap each other
        this.rockHitSound.play(); //Play 'rockHitSound' sound
        this.lives = this.lives -1; //Remove one live
		if (this.lives >= 0) { //Display lives as long as the value is greater then 0
			this.labelLives.text = this.lives; //Dispaly the new current lives on the screen
		};
        if(this.lives === 2){ //If lives equals 2 set text to an orange colour
            this.labelLives.fill = "#ffA500"; 
        }
        else if(this.lives === 1){ //If lives equals 1 set text to an red colour
            this.labelLives.fill = "#ff0000"; 
        }
        if(this.lives < 1) { //If lives is less then 1
            game.physics.arcade.overlap(this.bat, this.rocks, this.hitPipe, null, this); //Add the bat and rock overlap again run 'hitPipe()' function
            console.log("4-GAME OVER"); //Message output
            backgroundSpeed = 0; //Stop background movement
            this.gameOverSound.play(); //Plau 'gameOverSound' sound
        }
    },
    /* looseLife() function (END) */
	
    /* AddOneRock() function (START) */
    addOneRock: function(x, y) { //Function run when called by function below to generate a new rock in a new position
        var rock = game.add.sprite(x, y, 'rock'); //Create a rock in the current x and y positions
        this.rocks.add(rock); //Add rock to the previously created group
        game.physics.arcade.enable(rock); //Enable arcade physics on the rock
        rock.body.velocity.x = -200; //Add velocity to the rock to make it move left
        rock.checkWorldBounds = true; //Check if the rocks is out of world bounds
        rock.outOfBoundsKill = true; //Automatically kill the rock when it's no longer visible 
    },
    /* AddOneRock() function (END) */	
    
    /* GetBug() function (START) */	
    getbug: function() { //Function is run when bat and bug overlap each other
        this.collectSound.play(); //Play the 'pointSound' sound
        bugCount ++; //Add one to bugCount
        console.log("Bat has eaten: " + bugCount + " bugs"); //Ouput to user
        this.score += 100; //Add 100 to score
        bugAquiredAlready = false; //Set bugAquiredAlready boolean to false
        if(bugCount == 1){ //If bug count is creater then 1
            this.bugSmall = game.add.tileSprite(7,65,25,15,'bugSmall'); //Draw one bug on screen 
        }
        if(bugCount == 2){ //If bug count is creater then 2
            this.bugSmall2 = game.add.tileSprite(35,65,25,15,'bugSmall'); //Draw two bug on screen 
        }
        if(bugCount == 3){ //If bug count is creater then 3
            this.bugSmall3 = game.add.tileSprite(62,65,25,15,'bugSmall'); //Draw three bug on screen 
        }
        if(bugCount == 4){ //If bug count is creater then 4
            this.bugSmall4 = game.add.tileSprite(89,65,25,15,'bugSmall'); //Draw four bug on screen 
        }
        if(bugCount == 5){ //If bug count is creater then 5
            this.bugSmall5 = game.add.tileSprite(115,65,25,15,'bugSmall'); //Draw five bug on screen 
        }
        this.bug.destroy(); //Destroy the bug when hit
        //var bugY = Math.floor(Math.random() * 10) + 300; //Generate new random y for bug between 10 and 500 pixels on game
        bug = this.bug = game.add.sprite(500, 500, 'bug'); //Recreate the bug
        var walk1 = this.bug.animations.add('fly11'); //Add an animatation called 'fly11' to bug
        this.bug.animations.play('fly11', 24, true); //Run the 'fly11' animatin on bug at 24fps
        game.physics.arcade.enable(this.bug); //Add ARCADE physics to the bug, used for movements, gravity, collisions, etc.
        bug.body.checkCollision.up = true; //Allowing collision detectection for bug up
		bug.body.checkCollision.down = true; //Allowing collision detectection for bug down
		bug.body.checkCollision.left = true; //Allowing collision detectection for bug left
		bug.body.checkCollision.right = false; //Allowing collision detectection for bug right
		bug.body.immovable = true; //Allowing allowing bug to move when hit
    },
    /* GetBug() function (END) */	

    /* AddRowOfRocks() function (START) */
    addRowOfRocks: function() { //Function runs every 1.5 seconds to generate a new rock
        var hole = Math.floor(Math.random() * 7) + 1; //This randomly picks a value between 1 and 7, this value will be the hole position within the rocks
        for (var i = 0; i < 10; i++) { //A for loop to create the 10 rocks on the screen plus the position of the whole plus one
            if (i != hole && i != hole + 1) {
                this.addOneRock(368, i * 60 + 10);   
            }
        }
        this.score += 10; //Add 8 to the score every time a new row of rocks are generated
        this.labelScore.text = this.score; //Display the new score on the screen
        endScore = this.score; //With the new value retrieved above
        this.pointSound.play(); //Play the 'pointSound' sound
        lostLifeAlready = false; //Set the 'lostLifeAlready' boolean to false
		bugAquiredAlready = false; //Set lostLifeAlready variable to true
    }
    /* AddRowOfRocks() function (END) */
};
/* mainState (END)*/

/* Declaring the game states (START) */
game.state.add('startScreenState', startScreenState); //Declaring the 'startScreenState' (START)
game.state.add('main', mainState); //Declaring the 'mainState' (MAIN)
game.state.add('endScreenState', endScreenState); //Declaring the 'mainState' (END)
game.state.start('startScreenState'); //When game first runs start the game in the 'startScreenState'
/* Declaring the game states (END) */