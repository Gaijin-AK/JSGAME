
let lastRenderTime = 0
let gameOver = false
let newSegments = 0
const snakeSpeed = 5
const snakeBody = [{ x: 11, y: 11 }]
const expanRate = 2
const gameBoard = document.getElementById('game-board')

//GAME

function main(currentTime) {
  if (gameOver) {
    if (confirm('Dead')) {
      window.location = './index.html'
    }
    return
  }
  window.requestAnimationFrame(main)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / snakeSpeed) return
  lastRenderTime = currentTime
  update()
  draw() 
}
window.requestAnimationFrame(main)

function update() {
  update3()//snake
  update2()//food
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  draw3(gameBoard)//snake
  draw2(gameBoard)//food
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

//GRID

const gridSize = 21

function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * gridSize) + 1,
    y: Math.floor(Math.random() * gridSize) + 1
  }
}

function outsideGrid(position) {
  return (
    position.x < 1 || position.x > gridSize ||
    position.y < 1 || position.y > gridSize
  )
}

//SNAKE

function expandSnake(amount) {
  newSegments += amount
}

function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

function getSnakeHead() {
  return snakeBody[0]
}

function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0
}

//FOOD

let food = getFoodPosition()

function update2() {
  if (onSnake(food)) {
    expandSnake(expanRate)
    food = getFoodPosition()
  }
}

function draw2(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}

let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }

//Controls

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
    case 'w':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 's':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'a':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'd':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
}
})

//Movements

function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}

function update3() {
  addSegments()

  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

function draw3(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}


// modal

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
