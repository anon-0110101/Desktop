const grid = document.getElementById('grid');
const startButton = document.getElementById('start-button');
const width = 10; // 10 cells wide
const height = 20; // 20 cells tall
const cells = []; // Array to store our cells
let currentShape = []; // Array to store the current shape
let currentPosition = 4; // Position where the shape will start falling from
const shapes = [ // The different shapes we can generate
    [1, width + 1, width * 2 + 1, 2], // tetromino L
    [0, width, width + 1, width * 2 + 1], // tetromino Z
    [1, width, width + 1, width + 2], // tetromino T
    [0, 1, width, width + 1], // tetromino O
    [1, width + 1, width * 2 + 1, width * 3 + 1] // tetromino I
];
let currentShapeIndex = 0;

function createGrid() {
    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        grid.appendChild(cell);
        cells.push(cell);
    }
}

function drawShape() {
    currentShape.forEach(index => cells[currentPosition + index].classList.add('shape'));
}

function eraseShape() {
    currentShape.forEach(index => cells[currentPosition + index].classList.remove('shape'));
}

function moveDown() {
    eraseShape();
    currentPosition += width;
    drawShape();
    freezeShape();
}

function freezeShape() {
    if (currentShape.some(index => cells[currentPosition + index + width].classList.contains('shape'))) {
        currentShape.forEach(index => cells[currentPosition + index].classList.add('shape'));
        currentShapeIndex = Math.floor(Math.random() * shapes.length);
        currentPosition = 4;
        currentShape = shapes[currentShapeIndex];
        drawShape();
    }
}

function startGame() {
    createGrid();
    currentShapeIndex = Math.floor(Math.random() * shapes.length);
    currentShape = shapes[currentShapeIndex];
    drawShape();
    setInterval(moveDown, 1000);
}

startButton.addEventListener('click', startGame);
