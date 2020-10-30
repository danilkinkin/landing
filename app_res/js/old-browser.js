let subtitle;
let gameStatus;
let gameScore;
let myScore = 0;
let enemyScore = 0;
let game;

window.onload = function () {
    console.log('awe');
    const title = document.createElement('h1');
    title.innerHTML = 'Sorry, your browser is too old for this';
    document.body.appendChild(title);

    subtitle = document.createElement('h3');
    subtitle.innerHTML = 'Please use another and delete this';
    subtitle.style.margin = 'auto';
    subtitle.style.marginBottom = '36px';
    subtitle.style.color = '#a7a7a7';
    document.body.appendChild(subtitle);
    console.log('awe');

    gameStatus = document.createElement('h4');
    gameStatus.innerHTML = 'press \'Enter\' for start';
    document.body.appendChild(gameStatus);

    gameScore = document.createElement('h4');
    document.body.appendChild(gameScore);

    document.body.style.display = 'table-cell';
    document.body.style.verticalAlign = 'middle';
    document.body.style.textAlign = 'center';
    document.body.style.padding = '16px';
    document.body.style.width = '100vw';
    document.body.style.overflow = 'auto';
    document.body.style.boxSizing = 'border-box';

    game = new PingPong();

    document.body.appendChild(game.render.canvas);

    const link = document.createElement('a');
    link.style.display = 'block';
    link.style.margin = 'auto';
    link.style.marginTop = '16px';
    link.style.color = '#00f';
    link.setAttribute('href', 'mailto:hello@danilkinkin.com');
    link.innerHTML = 'Hello@danilkinkin.com';
    document.body.appendChild(link);
};

function PingPong() {
    const config = {
        field: {
            width: 100,
            height: 80,
        },
        player: {
            width: 2,
            height: 13,
        },
        ball: { radius: 2 },
        scale: 6,
        speed: 4,
    };

    this.render = new Render(config.field.width * config.scale, config.field.height * config.scale);

    this.enemy = new Player(0, 0);
    this.gamer = new Player((config.field.width - config.player.width) * config.scale, 0);
    this.ball = new Ball((config.field.width - config.ball.radius) * config.scale * 0.5, (config.field.height - config.ball.radius) * config.scale * 0.5);
    this.isGame = false;
    this.gameTime = 0;

    const game = this;
    let startAnimationFrame = performance.now();
    const topPositionCanvas = 0;

    window.addEventListener('mousemove', (e) => {
        const { top } = this.render.canvas.getBoundingClientRect();
        if (this.isGame) this.gamer.setY(e.clientY - top - config.player.height * config.scale * 0.5);
    });

    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 13 && !this.isGame) startGame();
    });

    var gameFrame = function (timestamp) {
        const timePassed = timestamp - startAnimationFrame;

        let isCollision = false;

        this.ball.y = this.ball.y + config.speed * this.ball.directionY;
        this.ball.x = this.ball.x + config.speed * this.ball.directionX;

        if (this.ball.directionY == 1 && this.ball.y >= (config.field.height - config.ball.radius) * config.scale) {
            isCollision = true;
            this.ball.directionY = -1;
        }
        if (this.ball.directionY == -1 && this.ball.y - config.ball.radius * config.scale <= 0) {
            isCollision = true;
            this.ball.directionY = 1;
        }

        if (collisionCheck(this.enemy, this.ball)) isCollision = true;
        if (collisionCheck(this.enemy, this.ball)) isCollision = true;
        if (collisionCheck(this.gamer, this.ball)) isCollision = true;
        if (collisionCheck(this.gamer, this.ball)) isCollision = true;

        if (!this.isGame) this.enemy.setSmoothY(this.ball.y - config.player.height * config.scale * 0.5);
        if (!this.isGame) this.gamer.setSmoothY(this.ball.y - config.player.height * config.scale * 0.5);

        if (this.ball.x > (config.field.width + config.ball.radius) * config.scale) {
            resetField();
            if (this.isGame) gameOver();
        }

        if (this.ball.x < -config.ball.radius * config.scale) {
            resetField();
            if (this.isGame) win();
        }

        if (isCollision && this.isGame) {
            config.speed += config.speed * 0.01;
            // console.log(config.speed)
        }
        if (this.isGame) gameStatus.innerHTML = `${Math.floor((performance.now() - this.gameTime) / 1000)}s`;

        this.render.update(timePassed);

        startAnimationFrame = timestamp;
        /* if(this.isGame) */requestAnimationFrame(gameFrame);
    }.bind(this);

    gameFrame();

    function startGame() {
        game.isGame = true;
        if (!config.startSpeed) config.startSpeed = config.speed;
        game.gameTime = performance.now();
        gameScore.innerHTML = `${enemyScore} - ${myScore}`;
    }

    function resetField() {
        game.ball.x = (config.field.width - config.ball.radius) * config.scale * 0.5;
        game.ball.y = (config.field.height - config.ball.radius) * config.scale * 0.5;
    }

    function gameOver() {
        game.isGame = false;
        console.log('Game over');
        gameStatus.innerHTML = 'Game over';
        setTimeout(() => {
            if (!game.isGame) gameStatus.innerHTML = 'press \'Enter\' for restart';
        }, 1500);
        config.speed = config.startSpeed;
        enemyScore += 1;
        gameScore.innerHTML = `${enemyScore} - ${myScore}`;
    }

    function win() {
        game.isGame = false;
        console.log('Win');
        gameStatus.innerHTML = 'You win';
        setTimeout(() => {
            if (!game.isGame) gameStatus.innerHTML = 'press \'Enter\' for restart';
        }, 1500);
        config.speed = config.startSpeed;
        myScore += 1;
        gameScore.innerHTML = `${enemyScore} - ${myScore}`;
    }

    function Render(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
        this.canvas.style.width = '100%';
    	this.canvas.style.maxWidth = `${width}px`;
        this.canvas.style.boxShadow = '0 1px 17px rgba(0, 0, 0, 0.26)';
        this.canvas.style.borderRadius = '4px';
        this.canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.78)';
        this.canvas.style.zIndex = '10000';

        const ctx = this.canvas.getContext('2d');

        this.update = function () {
            // Clear canvas
            this.canvas.width = this.canvas.width;

            // Draw players
            ctx.fillStyle = '#fff';
            ctx.fillRect(game.enemy.x, game.enemy.y, config.player.width * config.scale, config.player.height * config.scale);
            ctx.fillRect(game.gamer.x, game.gamer.y, config.player.width * config.scale, config.player.height * config.scale);

            // Draw balls
            ctx.fillStyle = '#fff';
            ctx.beginPath();
    		ctx.arc(game.ball.x, game.ball.y, config.ball.radius * config.scale, config.ball.radius * config.scale, Math.PI * 2, true);
    		ctx.fill();
        }.bind(this);
    }

    function collisionCheck(player, ball) {
        if (ball.x < player.x + config.player.width * config.scale && ball.x > player.x) {
            // Cehck Y punch
            if (ball.directionY == 1 && ball.y < player.y && ball.y + config.ball.radius * config.scale >= player.y) {
                // console.log("Collision Y Top");
                ball.directionY = -1;
                return true;
            }
            if (ball.directionY == -1 && ball.y > player.y + config.player.height * config.scale && ball.y + config.ball.radius * config.scale < player.y + config.player.height * config.scale) {
                // console.log("Collision Y Bottom");
                ball.directionY = 1;
                return true;
            }
        } else if (ball.y < player.y + config.player.height * config.scale && ball.y > player.y) {
            // Cehck X punch
            if (ball.directionX == 1 && ball.x < player.x && ball.x + config.ball.radius * config.scale >= player.x) {
                // console.log("Collision X Left");
                ball.directionX = -1;
                return true;
            }
            if (ball.directionX == -1 && ball.x > player.x + config.player.width * config.scale && ball.x - config.ball.radius * config.scale < player.x + config.player.width * config.scale) {
                // console.log("Collision X Right");
                ball.directionX = 1;
                return true;
            }
        } else {
            // Cehck XY punch
        }
    }

    function Player(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        // this.direction = 1;

        this.setY = function (y) {
            // y = y - config.player.height*config.scale*0.5;
            y = y < 0 ? 0 : y > (config.field.height - config.player.height) * config.scale ? (config.field.height - config.player.height) * config.scale : y;
            this.y = y;
        }.bind(this);

        this.setSmoothY = function (y) {
            y = y < 0 ? 0 : y > (config.field.height - config.player.height) * config.scale ? (config.field.height - config.player.height) * config.scale : y;

            let s = 0;
            if (this.x > config.field.width * config.scale * 0.5) {
                s = Math.abs(config.field.width * config.scale - game.ball.x) / (config.field.width * config.scale * 0.5);
            } else {
                s = Math.abs(game.ball.x) / (config.field.width * config.scale * 0.5);
            }
            s = s > 1 ? 1 : s;
            this.y += (y - this.y) * (1 - s);
        }.bind(this);
    }

    function Ball(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.directionY = 1;
        this.directionX = 1;

        this.setY = function (y) {
            // y = y - config.player.height*config.scale*0.5;
            y = y < 0 ? 0 : y > (config.field.height - config.player.height) * config.scale ? (config.field.height - config.player.height) * config.scale : y;
            this.y = y;
        }.bind(this);

        this.setX = function (y) {
            // y = y - config.player.height*config.scale*0.5;
            y = y < 0 ? 0 : y > (config.field.height - config.player.height) * config.scale ? (config.field.height - config.player.height) * config.scale : y;
            this.y = y;
        }.bind(this);
    }
}
