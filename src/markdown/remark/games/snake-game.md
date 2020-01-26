---
title:  Build a snake game using HTML canvas and javascript
date: '2019-05-06T23:46:37.121Z'
series: Snake Game
---


## Introduction
Hello Guys, I'll be walking you through the step by step process to build a simple snake game. Before we move on, there are few prerequisites you need to cover:
* Basic Javascript, CSS and HTML- Capable of understanding code statements and data structures.
* DOM Events - Basic Knowledge
* HTML5 Canvas - Draw Rectangles, Circles, Lines and Basic Stuffs.
Now, let's get started with the tutorial.

## Basic Markup

```html
...
<body>
      <canvas id="draw-board" width="250" height="250" ></canvas>
      <div id="score">Score: 0</div>
      <button id="play">Play</button>
</body>
...
```

We're going to use a canvas of height and `width` 250px and give it an id 'draw-board'. We will use this id to select the canvas in JavaScript. We will also add a div element to display score and a button element to start the game.


```js
const button = document.getElementById("play");
const score = document.getElementById("score");
const canvas = document.getElementById("draw-board");
```

```css
canvas {
  /*This width makes the canvas responsive*/
  width: 80vmin;
  background: 4px solid blue;
}
```

We add a border to see where the canvas is rendering.

## Drawing On The Canvas

```js
// Selecting the canvas
const canvas = document.getElementById("draw-board");
// Returns 2d drawing context on the canvas
const ctx = canvas.getContext("2d");
```
Now, we use the context reference to draw on the selected Canvas. Let's use a rectangle to represent a body part of snake, and make a function named drawSnakePart to draw the rectangle. The function takes context reference or ctx, (x,y) coordinates and a default parameter head to render different color incase the part is head.

```js
// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API for canvas usage
function drawSnakePart(ctx,x,y,head=false) {
  // Set the fillstyle to green if it is head else white
  ctx.fillStyle = head ? "green":"white";
  // draw a rectangle at (x,y) coordinates with width and height of 10px
  ctx.fillRect(x,y,10,10);
 /* Note: you can use any shape or image in this 
function, but make sure it's height and width are 10px*/
}
```
Similarly, we draw food for the snake as below:

```js
//Drawing Food for snake to eat
function drawFood(ctx,x,y) {
  //Starting Path
  ctx.beginPath();
  //setting the fill style to red
  ctx.fillStyle="red";
  // Making a circle
  ctx.arc(x+5,y+5,5,0,2*Math.PI);
 // Closing the Path
  ctx.stroke();
//   Filling the area enclosed by the path
  ctx.fill();
}
```
We are only going to use basic shapes to represent the snake and it's food. Whenever we draw something on the canvas in one frame, we have to clear it in the next frame. So, we will draw a rectangle of size 250 x 250 i.e. the size of canvas. of the canvas. It acts as a background that repaints every frame, clearing the pixels from the previous frames. It can be costly to repaint the canvas again and again, but for the sake of this tutorial we will redraw the background so it will be easy to understand.

```js
//Drawing Background
function drawBackground(){
  //the background color, choose whichever color you like
  ctx.fillStyle="tan";
  // draw a rectangle at (0,0) coordinates with width and height of 250px
  ctx.fillRect(0,0,250,250);
}
```

## Snake Logic
Snake GridThe main challenge is to understand how the snake moves. We assume the canvas as a grid of 25x25 rectangles where each rectangle is of size 10x10px, so the size of canvas is 250x250px. The next main thing to know is, a snake part is always 10px away from it's next part that may be in the x-axis or y-axis. In the figure, the red rectangle is snake's head and blue ones are other parts. What we can see here is every part is following it's preceding part. Whereas, the head is the one that decides the path and the direction to move. Thus, for each snake part we can assign a direction it's moving along with it's x,y coordinates. Now, when the head moves it will get new direction and next coordinates, depending upon the users control, which we'll discuss later. The snake can only move 10px in any one four direction i.e. the rectangle size. Now let's define a part of snake as an object and the entire snake as an array of snake parts. We'll also make a function that adds snake part dynamically, so that whenever snake eats it can grow along the correct direction. Let's assume UP as -1, DOWN as 1, LEFT as -2, RIGHT as 2. The reason why we use this kind of numbering is because we need to prevent the snake from moving opposite direction. Example: If the snake is moving RIGHT it can't move LEFT and vice-versa. The same can be said for UP and LEFT.

```js
// Remember to only set x,y to values that are multiple of 10 i.e. box size
let head = {
  //   Starting coordinates
  x: 10,
  y: 10,
  //   RIGHT Direction
  direction: 2
};
let snake = [head];

// Dynamically Adding Snake Part
function addPart() {
  // Retrieving the last part or tail of snake
  let tail = snake[snake.length - 1];

  //   New Part details
  let direction = tail.direction;
  let x = tail.x;
  let y = tail.y;
  // finding the new parts coordinates according to tail
  switch (direction) {
    // DOWN
    case 1:
      y = mod(250, y - 10);
      break;
    // UP
    case -1:
      y = mod(250, y + 10);
      break;
    // LEFT
    case -2:
      x = mod(250, x + 10);
      break;
    // RIGHT
    case 2:
      x = mod(250, x - 10);
      break;
  }
  //   Adding the new Part to the snake
  snake.push({ x, y, direction });
}
```

The mod function takes (x,y) parameters and returns modulus of y modulo x. Learn More

## Moving The Snake
We now know how the snake functions. Next job is to move the snake according to the direction LEFT, RIGHT, UP and DOWN. The idea is to increment snake head's x or y coordinate according to the it's direction, then we simply change the parts value to the one that is ahead of it. This makes the part travel like a snake.

```js
// This variable holds the snake moving direction.
let direction = 2; // RIGHT
// Moving the Snake
function moveSnake() {
  //    NEW HEAD Coordinates
  let x = snake[0].x;
  let y = snake[0].y;
  // Snake Direction
  switch (direction) {
    //DOWN - Move 1 box down
    case 1:
      y = mod(250, y + 10);
      break;
    //UP - Move 1 box up
    case -1:
      y = mod(250, y - 10);
      break;
    //LEFT - Move 1 box left
    case -2:
      x = mod(250, x - 10);
      break;
    //RIGHT - Move 1 box right
    case 2:
      x = mod(250, x + 10);
      break;
  }
  //     Making a new copy of snake with new Head attached
  const newSnake = [{ x, y, direction }];
  const snakeLength = snake.length;
  //   Now we change the value of a part with the part ahead of it.
  for (let i = 1; i < snakeLength; ++i) {
    newSnake.push({ ...snake[i - 1] });
  }
  snake = newSnake;
}
```

## Generating Food
We will only add one food in the whole canvas in this tutorial. We will keep track of the food with a variable also named food. Then we will generate food randomly inside the canvas avoiding the snake parts.

```js
// Current Food
let food = {x:40, y: 50};
// Generating Food
function generateFood() {

//   Random box between 0 - 25 i.e the grid size 25x25. Multiply by 10 to get x,y coordinates
  let x = Math.floor(Math.random() * 25) * 10;
  let y = Math.floor(Math.random() * 25) * 10;
  // selecting food that doesn't collide with the snake
  while (snake.some(part => part.x === x && part.y === y)) {
    x = Math.floor(Math.random() * 25) * 10;
    y = Math.floor(Math.random() * 25) * 10;
  }
//   Next Food
  food = { x, y };
}
```

## Game State
Now, let's start combining all these pieces together and make the game. First let's make a game state that keeps track of everything going on the game. We'll first add the snake data, food data, direction and the game score. We'll also add a gameover flag to check of the game is running or over.

```js
// Game State
let state = {
//   Initially game is not running
  gameover: true,
//   Initial Direction right
  direction: 2,
// snake array
  snake: [
    { x: 10, y: 10, direction: 2 },
    { x: 10, y: 20, direction: 2 },
    { x: 10, y: 30, direction: 2 }
  ],
//   initial food location
  food: { x: 0, y: 0 },
//   initial score
  score: 0
};
```

## Game Loop
The entire game runs around a loop called Game loop. One iteration in a loop repaints the entire canvas and is called a frame. We decide the number of frames we want to display per second. Greater frame per second(fps) results in fast snake movement and vice-versa. We'll make a function called draw that handles all our drawing and computation. We'll call this function 10 times every second. There are two ways to do these, one is setInterval and the other is window.requestAnimationFrame(). In this tutorial we will use the later one. For more information about window.requestAnimationFrame click here.

```js
// To compare time in the function
var start = 0;
// Draw Function
function draw(timestamp) {
//   Increment Start
  start++;
//   timestamp contains the time elapsed since first call in milliseconds
//   1000/10 refers to 10 frames for second. Change values to see the difference
  if (timestamp - start > 1000   10) {
//this block runs every 10th of a second
//  We put our drawing functions and computatin here

//  Checking if game is over.
    if (checkGameOver()) {
//        Exiting function if is over
      state.gameover = true;
      return;
    }
//     Calculating next position of snake
     moveSnake();
//  Redrawing the canvas to clear previous fram
    drawBackground();
// drawing the food
    drawFood(ctx,state.food.x,state.food.y);
// drawing the snake
    drawSnake();
// Checking if the snake eats the food
    eatFood();
// resetting the start 
    start = timestamp;
  }
//   recursively calls itself until game over
  if (!state.gameover) window.requestAnimationFrame(draw);
}
```

Now, lets define how the checkGameOver, drawSnake, eatFood and mod functions. functions

```js
// mod function
function mod(m, val) {
  while (val < 0) {
    val += m;
  }
  return val % m;
}

function drawSnake() {
  //   we draw the snake form tail so that head is drawn last. It makes the head appear above all other drawings.
  for (let i = state.snake.length - 1; i >= 0; --i) {
    drawSnakePart(ctx,state.snake[i].x, state.snake[i].y, i === 0);
  }
}
function eatFood() {
  //   Head position
  let x = state.snake[0].x;
  let y = state.snake[0].y;
  //   Tail Position
  let fx = state.food.x;
  let fy = state.food.y;
  // if head and food are at same position
  if (x == fx && y == fy) {
    //     increase score
    state.score++;
    //     change score text
    score.innerHTML = "Score: " + state.score;
    //     Add a snake part
    addPart();
    //     Generate a new Food
    generateFood();
  }
}
// Checking game over. return bool
function checkGameOver() {
  const head = state.snake[0];
  //   Checking if head collides with snake other parts. if collides gameover returns true
  return state.snake.some(
    (part, i) => i !== 0 && head.x === part.x && head.y === part.y
  );
  // Note: You can add blocks or check if it is colliding the boundary and make it game over
}
```
## Event Handling
We now need to handle events fired by users to change the direction of snake

```js
// Adding event Listener on the document for keydown
document.addEventListener("keydown", event => {
//   Checking if Arrow keys are pressed
  if (! Arrow gi.test(event.key))
//     if not return
    return


//   Preventing default behaviour
  event.preventDefault();

//   null direction
  let direction = 0;
//   checking direction
  switch (event.key) {
    case "ArrowDown":
      direction = 1;
      break;
    case "ArrowUp":
      direction = -1;
      break;
    case "ArrowLeft":
      direction = -2;
      break;
    case "ArrowRight":
      direction = 2;
      break;
  }
  if (
//     if direction is changed
    direction &&
//     if snake direction and current direction are same
    state.direction === state.snake[0].direction &&
//     and the directions are not oposite to current direction i.e LEFT and RIGHT or UP and DOWN
    state.direction !== -direction
  ) {
//     Change the direction
    state.direction = direction;
  }
});
```

## Wrapping Things
Finally, let's wrap up this game. We'll add an event handler to the play button that triggers the draw function, which starts the Game Loop. It will also re-initialize the game state whenever game is over.

```js
// Event Handler
play.onclick = function() {
  //   If game is not running
  if (state.gameover) {
    //     Initialize state
    state = {
      gameover: false,
      direction: 2,
      //       making snake have two additional part. you can also use addPart() instead maually adding parts
      snake: [
        { x: 10, y: 10, direction: 2 },
        { x: 10, y: 20, direction: 2 },
        { x: 10, y: 30, direction: 2 }
      ],
      //       initial food
      food: { x: 0, y: 0 },
      //       Initial score
      score: 0
    };
    //     Resetting Score
    score.innerHTML = "Score: " + 0;
    //     Generate New Food
    generateFood();
    //     Trigger Game Loop
    window.requestAnimationFrame(draw);
  }
};
```
Now, we're set to go. All you have to do now is click play and start playing!

## Conclusion
You've now learned how to make a simple snake game. Try to make your own version of it, change the shape of snake, speed of the game, make an attractive ui, add different modes and difficulty. Use your new found Knowledge to make something beautiful and share among friends and with us too. The full source code will be down below an you can get the working example with code Here.

Code:

```html
<canvas width="250"  height="250" id="draw-board"></canvas>
<div id="score">Score: 0</div>
<button id="play">Play</button>
```

```css
* {
  margin: 0;
  box-sizing: border-box;
}
canvas {
  
  width: 80vmin;
  border: 10px solid cornflowerblue;
}
```

```js
// Selecting Element Reference
const button = document.getElementById("play");
const score = document.getElementById("score");
const canvas = document.getElementById("draw-board");

// ctx reference
const ctx = canvas.getContext("2d");

// Game State
var state = {
  //   Initially game is not running
  gameover: true,
  //   Initial Direction right
  direction: 2,
  // snake array
  snake: [
    { x: 10, y: 10, direction: 2 },
    { x: 10, y: 20, direction: 2 },
    { x: 10, y: 30, direction: 2 }
  ],
  //   initial food location
  food: { x: 0, y: 0 },
  //   initial score
  score: 0
};



// DRAW SECTION
// Snake Part
function drawSnakePart(ctx,x,y,head=false) {
  // Set the fillstyle to green if it is head else white
  ctx.fillStyle = head ? "green":"white";
  // draw a rectangle at (x,y) coordinates with width and height of 10px
  ctx.fillRect(x,y,10,10);
 /* Note: you can use any shape or image in this 
function, but make sure it's height and width are 10px*/

}

//Drawing Food for snake to eat
function drawFood(ctx,x,y) {
  //Starting Path
  ctx.beginPath();
  //setting the fill style to red
  ctx.fillStyle="red";
  // Making a circle
  ctx.arc(x+5,y+5,5,0,2*Math.PI);
 // Closing the Path
  ctx.stroke();
//   Filling the area enclosed by the path
  ctx.fill();
}

//Drawing Background
function drawBackground(){
  //the background color, choose whichever color you like
  ctx.fillStyle="tan";
  // draw a rectangle at (0,0) coordinates with width and height of 250px
  ctx.fillRect(0,0,250,250);
}

// Draw Whole Snake
function drawSnake() {
  //   we draw the snake form tail so that head is drawn last. It makes the head appear above all other drawings.
  for (let i = state.snake.length - 1; i >= 0; --i) {
    drawSnakePart(ctx,state.snake[i].x, state.snake[i].y, i === 0);
  }
}



// Game Logic
// mod function
function mod(m, val) {
  while (val < 0) {
    val += m;
  }
  return val % m;
}

// Dynamically Adding Snake Part
function addPart() {
  // Retrieving the last part or tail of snake
  let tail = state.snake[state.snake.length - 1];

  //   New Part details
  let direction = tail.direction;
  let x = tail.x;
  let y = tail.y;
  // finding the new parts coordinates according to tail
  switch (direction) {
    // DOWN
    case 1:
      y = mod(250, y - 10);
      break;
    // UP
    case -1:
      y = mod(250, y + 10);
      break;
    // LEFT
    case -2:
      x = mod(250, x + 10);
      break;
    // RIGHT
    case 2:
      x = mod(250, x - 10);
      break;
  }
  //   Adding the new Part to the snake
  state.snake.push({ x, y, direction });
}

function eatFood() {
  //   Head position
  let x = state.snake[0].x;
  let y = state.snake[0].y;
  //   Tail Position
  let fx = state.food.x;
  let fy = state.food.y;
  // if head and food are at same position
  if (x == fx && y == fy) {
    //     increase score
    state.score++;
    //     change score text
    score.innerHTML = "Score: " + state.score;
    //     Add a snake part
    addPart();
    //     Generate a new Food
    generateFood();
  }
}


// Movng the Snake
function moveSnake() {
  //    NEW HEAD Coordinates
  let x = state.snake[0].x;
  let y = state.snake[0].y;
  // Snake Direction
  switch (state.direction) {
    //DOWN - Move 1 box down
    case 1:
      y = mod(250, y + 10);
      break;
    //UP - Move 1 box up
    case -1:
      y = mod(250, y - 10);
      break;
    //LEFT - Move 1 box left
    case -2:
      x = mod(250, x - 10);
      break;
    //RIGHT - Move 1 box right
    case 2:
      x = mod(250, x + 10);
      break;
  }
  //     Making a new copy of snake
  const newSnake = [{ x, y, direction:state.direction }];
  const snakeLength = state.snake.length;
  //   Now we change the value of a part with the part ahead of it.
  for (let i = 1; i < snakeLength; ++i) {
    newSnake.push({ ...state.snake[i - 1] });
  }
  state.snake = newSnake;
}


// Checking game over. return bool
function checkGameOver() {
  const head = state.snake[0];
  //   Checking if head collides with snake other parts. if collides gameover returns true
  return state.snake.some(
    (part, i) => i !== 0 && head.x === part.x && head.y === part.y
  );
  // Note: You can add blocks or check if it is colliding the boundary and make it game over
}

// Generating Food
function generateFood() {

//   Random box between 0 - 25 i.e the grid size 25x25. Multiply by 10 to get x,y coordinates
  let x = Math.floor(Math.random() * 25) * 10;
  let y = Math.floor(Math.random() * 25) * 10;
  // selecting food that doesn't collide with the snake
  while (state.snake.some(part => part.x === x && part.y === y)) {
    x = Math.floor(Math.random() * 25) * 10;
    y = Math.floor(Math.random() * 25) * 10;
  }
//   Next Food
  state.food = { x, y };
}



// To compare time in the function
var start = 0;
// Draw Function
function draw(timestamp) {
  //   Increment Start
  start++;
  //   timestamp contains the time elapsed since first call in milliseconds
  //   1000/10 refers to 10 frames for second. Change values to see the difference
  if (timestamp - start > 1000   10) {
    //this block runs every 10th of a second
    //  We put our drawing functions and computatin here

    //  Chcking if game is over.
    if (checkGameOver()) {
      //        Exiting function if is over
      state.gameover = true;
      return;
    }
    //     Calclating next position of snake
    moveSnake();
    //  Redrawing the canvas to clear previous fram
    drawBackground();
    // drawing the food
    drawFood(ctx, state.food.x, state.food.y);
    // drawing the snake
    drawSnake();
    // Checking if the snake eats the food
    eatFood();
    // resetting the start
    start = timestamp;
  }
  //   recursively calls itself until game over
  if (!state.gameover) window.requestAnimationFrame(draw);
}


// Event Handling

// Adding event Listener on the document for keydown
document.addEventListener("keydown", event => {
  //   Checking if Arrow keys are pressed
  if (! Arrow gi.test(event.key))
    //     if not return
    return;

  //   Preventing default behaviour
  event.preventDefault();

  //   null direction
  let direction = 0;
  //   checking direction
  switch (event.key) {
    case "ArrowDown":
      direction = 1;
      break;
    case "ArrowUp":
      direction = -1;
      break;
    case "ArrowLeft":
      direction = -2;
      break;
    case "ArrowRight":
      direction = 2;
      break;
  }
  if (
    //     if direction is changed
    direction &&
    //     if snake direction and current direction are same
    state.direction === state.snake[0].direction &&
    //     and the directions are not oposite to current direction i.e LEFT and RIGHT or UP and DOWN
    state.direction !== -direction
  ) {
    //     Change the direction
    state.direction = direction;
  }
});

// Event Handler
play.onclick = function() {
  //   If game is not running
  if (state.gameover) {
    //     Initialize state
    state = {
      gameover: false,
      direction: 2,
      //       making snake have two additional part. you can also use addPart() instead maually adding parts
      snake: [
        { x: 10, y: 10, direction: 2 },
        { x: 10, y: 20, direction: 2 },
        { x: 10, y: 30, direction: 2 }
      ],
      //       initial food
      food: { x: 0, y: 0 },
      //       Initial score
      score: 0
    };
    //     Resetting Score
    score.innerHTML = "Score: " + 0;
    //     Generate New Food
    generateFood();
    //     Trigger Game Loop
    window.requestAnimationFrame(draw);
  }
};
```