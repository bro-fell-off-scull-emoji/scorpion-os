//snake game in js
function SnakeGame() {
    this.boardSize = 20;
    this.snake = [{ x: 10, y: 10 }];
    this.direction = { x: 0, y: 0 };
    this.food = this.generateFood();
    this.gameOver = false;
}
SnakeGame.prototype.generateFood = function() {
    let foodX, foodY;
    do {
        foodX = Math.floor(Math.random() * this.boardSize);
        foodY = Math.floor(Math.random() * this.boardSize);
    } while (this.isSnake(foodX, foodY));
    return { x: foodX, y: foodY };
};
SnakeGame.prototype.isSnake = function(x, y) {
    return this.snake.some(segment => segment.x === x && segment.y === y);
};
SnakeGame.prototype.changeDirection = function(newDirection) {
    const oppositeDirections = {

        'ArrowUp': 'ArrowDown',
        'ArrowDown': 'ArrowUp',
        'ArrowLeft': 'ArrowRight',
        'ArrowRight': 'ArrowLeft'
    };
    if (newDirection !== oppositeDirections[this.direction]) {
        this.direction = newDirection;
    }
};
SnakeGame.prototype.moveSnake = function() {
    if (this.gameOver) return;

    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };
    if (this.isCollision(head)) {
        this.gameOver = true;
        return;
    }
    this.snake.unshift(head);
    if (head.x === this.food.x && head.y === this.food.y) {
        this.food = this.generateFood();
    } else {
        this.snake.pop();
    }
};
SnakeGame.prototype.isCollision = function(head) {
    return head.x < 0 || head.x >= this.boardSize || head.y < 0 || head.y >= this.boardSize || this.isSnake(head.x, head.y);
};
SnakeGame.prototype.render = function() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    for (let y = 0; y < this.boardSize; y++) {

        for (let x = 0; x < this.boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (this.isSnake(x, y)) {
                cell.classList.add('snake');
            } else if (this.food.x === x && this.food.y === y) {
                cell.classList.add('food');
            }

            board.appendChild(cell);
        }
    }
};
document.addEventListener('keydown', (event) => {
    const directions = {
        'ArrowUp': { x: 0, y: -1 },
        'ArrowDown': { x: 0, y: 1 },
        'ArrowLeft': { x: -1, y: 0 },
        'ArrowRight': { x: 1, y: 0 }
    };
    if (directions[event.key]) {
        game.changeDirection(directions[event.key]);
    }
});
const game = new SnakeGame();
setInterval(() => {
    game.moveSnake();
    game.render();
}, 200);

