import {dataGame} from "./classes/Data.js";
import {Game} from "./model/Game.js";
import {Ball} from "./model/Ball.js";
import {Frog} from "./model/Frog.js";
import {FrogController} from "./controller/FrogController.js";
import {GameController} from "./controller/GameController.js";
import {Bezier} from "./classes/Bezier.js";

let game = new Game(dataGame);
game.createCanvas();

let gameController = new GameController(game);
gameController.resize();

let frog = new Frog(dataGame);
new FrogController(frog);

let bezier = new Bezier(dataGame.pointsPath);
let gamePoints = bezier.getGamePoints();

let balls = [];

function getBall() {
    let ball = new Ball(dataGame, gamePoints[0].x, gamePoints[0].y, gamePoints);
    if (balls.length < 30) {
        balls.push(ball);
    }
}

getBall();

for (let i = 0; i < 30; i++) {
    getBall();
}

function work() {
    game.updateCanvas();
    frog.draw();
// если от верха экрана или от низа или слева или справа
    balls[0].canNext = 1;
    for (let i = 0; i < balls.length; i++) {

        if (balls[i - 1]) {
            let dx = balls[i - 1].x - balls[i].x;
            let dy = balls[i - 1].y - balls[i].y;
            let distance = Math.sqrt((dx * dx) + (dy * dy));
            if (distance > 30 && !balls[i].canNext) {
                balls[i].canNext = 1;
            }
        }

        let xMax = Math.max(frog.bulletCenterX, balls[i].x);
        let xMin = Math.min(frog.bulletCenterX, balls[i].x);
        let yMax = Math.max(frog.bulletCenterY, balls[i].y);
        let yMin = Math.min(frog.bulletCenterY, balls[i].y);
        if (frog.bulletState === 1 && xMax - xMin <= 15 && yMax - yMin <= 15) {

            if (frog.bulletColor !== balls[i].color) {
                let x = balls[i].x;
                let y = balls[i].y;
                let pathSection = balls[i].pathSection;

                let ball = new Ball(dataGame, x, y, gamePoints);
                ball.color = frog.bulletColor;
                ball.pathSection = pathSection;

                for (let j = i; j < balls.length; j++) {

                    balls[j].pathSection -= 7;
                }
                balls.splice(i, 0, ball);
            }
            frog.stopBullet();
            continue
        }
        if (balls[i].canNext) {
            balls[i].draw();
            balls[i].update();
        }
    }
    window.requestAnimationFrame(work);
}

work();