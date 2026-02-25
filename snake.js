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
let gameSpeed = 200; // 初始速度（毫秒），越大越慢

// 初始化
highScoreElement.textContent = highScore;

// 根据分数计算游戏速度
function getGameSpeed() {
    // 基础速度 200ms，每得50分速度增加10ms（最快100ms）
    const speedIncrease = Math.floor(score / 50) * 15;
    return Math.max(100, 200 - speedIncrease);
}

// 初始化游戏
function initGame() {
    snake = [
        { x: 10, y: 10 }
    ];
    dx = gridSize;
    dy = 0;
    score = 0;
    gameSpeed = 200;
    
    // 确保DOM元素存在再更新
    if (scoreElement) {
        scoreElement.textContent = score;
    }
    
    generateFood();
    gameOverDiv.classList.add('hidden');
}

// 生成食物
function generateFood() {
    let validPosition = false;
    let attempts = 0;
    
    while (!validPosition && attempts < 100) {
        food = {
            x: Math.floor(Math.random() * tileCount) * gridSize,
            y: Math.floor(Math.random() * tileCount) * gridSize
        };
        
        // 确保食物不在蛇身上
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                validPosition = false;
                break;
            }
        }
        attempts++;
    }
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格（可选，让游戏更好看）
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
    
    // 绘制蛇
    snake.forEach((segment, index) => {
        if (index === 0) {
            // 蛇头
            ctx.fillStyle = '#4CAF50';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#4CAF50';
        } else {
            // 蛇身
            ctx.fillStyle = '#81C784';
            ctx.shadowBlur = 0;
        }
        // 绘制在格子内，留出1px边距
        ctx.fillRect(segment.x + 1, segment.y + 1, gridSize - 2, gridSize - 2);
    });
    
    ctx.shadowBlur = 0;
    
    // 绘制食物
    ctx.fillStyle = '#FF5722';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#FF5722';
    ctx.beginPath();
    ctx.arc(
        food.x + gridSize / 2,
        food.y + gridSize / 2,
        gridSize / 2 - 3,
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
    
    // 吃食物检测 - 使用中心点碰撞检测，更宽松
    const headCenterX = head.x + gridSize / 2;
    const headCenterY = head.y + gridSize / 2;
    const foodCenterX = food.x + gridSize / 2;
    const foodCenterY = food.y + gridSize / 2;
    const distance = Math.sqrt(Math.pow(headCenterX - foodCenterX, 2) + Math.pow(headCenterY - foodCenterY, 2));
    const ateFood = distance < gridSize;
    
    if (ateFood) {
        // 吃到食物，增加分数
        score += 10;
        
        // 更新分数显示
        if (scoreElement) {
            scoreElement.textContent = score;
        }
        
        // 更新最高分
        if (score > highScore) {
            highScore = score;
            if (highScoreElement) {
                highScoreElement.textContent = highScore;
            }
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // 生成新食物
        generateFood();
        
        // 重新设置游戏速度
        const newSpeed = getGameSpeed();
        if (newSpeed !== gameSpeed) {
            gameSpeed = newSpeed;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    }
    
    // 移动蛇
    snake.unshift(head);
    if (!ateFood) {
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
    gameLoop = null;
    isGameRunning = false;
    
    if (finalScoreElement) {
        finalScoreElement.textContent = score;
    }
    
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
    gameSpeed = getGameSpeed();
    
    // 清除之前的循环
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    gameLoop = setInterval(gameStep, gameSpeed);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    pauseBtn.textContent = '暂停';
    
    // 立即绘制一次
    draw();
}

// 暂停/继续游戏
function togglePause() {
    if (!isGameRunning) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? '继续' : '暂停';
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    // 防止方向键滚动页面
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
    
    if (!isGameRunning) {
        return;
    }
    
    if (isPaused && e.key !== ' ') {
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
console.log('贪吃蛇游戏已加载！');
