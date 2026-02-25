// 游戏配置
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const finalScoreElement = document.getElementById('finalScore');
const gameOverDiv = document.getElementById('gameOver');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

// 游戏状态
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let isGameRunning = false;
let isPaused = false;

// 初始化
highScoreElement.textContent = highScore;

// 初始化游戏
function initGame() {
    snake = [
        { x: 10, y: 10 }
    ];
    dx = gridSize;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameOverDiv.classList.add('hidden');
}

// 生成食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount) * gridSize,
        y: Math.floor(Math.random() * tileCount) * gridSize
    };
    
    // 确保食物不在蛇身上
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头
            ctx.fillStyle = '#4CAF50';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#4CAF50';
        } else {
            // 蛇身
            ctx.fillStyle = '#81C784';
            ctx.shadowBlur = 0;
        }
        ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
    });
    
    ctx.shadowBlur = 0;
    
    // 绘制食物
    ctx.fillStyle = '#FF5722';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FF5722';
    ctx.beginPath();
    ctx.arc(
        food.x + gridSize / 2,
        food.y + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
}

// 更新游戏状态
function update() {
    if (isPaused) return;
    
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // 碰撞检测 - 墙壁
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }
    
    // 碰撞检测 - 自身
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // 吃食物检测
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        generateFood();
    } else {
        snake.pop();
    }
}

// 游戏主循环
function gameStep() {
    update();
    draw();
}

// 游戏结束
function gameOver() {
    clearInterval(gameLoop);
    isGameRunning = false;
    finalScoreElement.textContent = score;
    gameOverDiv.classList.remove('hidden');
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// 开始游戏
function startGame() {
    if (isGameRunning) return;
    
    initGame();
    isGameRunning = true;
    isPaused = false;
    gameLoop = setInterval(gameStep, 100);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    pauseBtn.textContent = '暂停';
}

// 暂停/继续游戏
function togglePause() {
    if (!isGameRunning) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '继续' : '暂停';
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (!isGameRunning || isPaused) {
        if (e.key === ' ' && isGameRunning) {
            e.preventDefault();
            togglePause();
        }
        return;
    }
    
    switch(e.key) {
        case 'ArrowUp':
            if (dy === 0) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case 'ArrowDown':
            if (dy === 0) {
                dx = 0;
                dy = gridSize;
            }
            break;
        case 'ArrowLeft':
            if (dx === 0) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx === 0) {
                dx = gridSize;
                dy = 0;
            }
            break;
        case ' ':
            e.preventDefault();
            togglePause();
            break;
    }
});

// 事件监听
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', startGame);

// 初始绘制
draw();
