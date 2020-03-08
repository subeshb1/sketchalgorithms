import React, { Component } from "react";
import { Snippet, Head } from "../../components";

const data = {
  description:
    "Learn how to make a Simple Snake Games using several programming languages. Follow the step by step process to build your own Snake Game.",
  title: "Snake Game | Tutorial | Sketch Algorithms",
  url: "/games/snake-game",
  image: "snake-game.png"
};

export default class SnakeTut extends Component {
  render() {
    return (
      <div>
        <Head data={data} />
        <article className="section" id="tutorial">
          <h1>Snake Game</h1>
          <section>
            <h2 id="tldr">TL;DR</h2>
            <p>
              Live Demo with code{" "}
              <a
                href="https://codepen.io/subeshb1/pen/KGdJyq"
                target="_blank"
                rel="noopener noreferrer"
              >
                Here
              </a>
              . Source Code only <a href="#code">Here</a>. Tutorial describing
              the code is <a href="#introduction">below.</a>
            </p>
          </section>
          <section>
            <h2 id="content">Table Of Contents</h2>
            <div className="list">
              <div className="item">
                <a href="#introduction">Introduction</a>
              </div>
              <div className="item">
                <a href="#basic-markup">Basic Markup</a>
              </div>
              <div className="item">
                <a href="#drawing-on-canvas">Drawing On The Canvas</a>
              </div>
              <div className="item">
                <a href="#snake-logic">Snake Logic</a>
              </div>
              <div className="item">
                <a href="#moving-snake">Moving The Snake</a>
              </div>
              <div className="item">
                <a href="#generating-food">Generating Food</a>
              </div>
              <div className="item">
                <a href="#game-state">Game State</a>
              </div>
              <div className="item">
                <a href="#game-loop">Game Loop</a>
              </div>
              <div className="item">
                <a href="#event-handling">Event Handling</a>
              </div>
              <div className="item">
                <a href="#wrapping-up">Wrapping Things</a>
              </div>
              <div className="item">
                <a href="#conclusion">Conclusion</a>
              </div>
              <div className="item">
                <a href="#code">Code</a>
              </div>
            </div>
          </section>
          <section id="introduction">
            <h2>Introduction</h2>

            <p>
              Hello Guys, I'll be walking you through the step by step process
              to build a simple snake game. Before we move on, there are few
              prerequisites you need to cover:
            </p>
            <div className="list">
              <div className="item">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/Tutorials"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Basic Javascript, CSS and HTML
                </a>
                - Capable of understanding code statements and data structures.
              </div>
              <div className="item">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOM Events
                </a>{" "}
                - Basic Knowledge
              </div>
              <div className="item">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HTML5 Canvas
                </a>{" "}
                - Draw Rectangles, Circles, Lines and Basic Stuffs.
              </div>
            </div>
            <p>Now, let's get started with the tutorial.</p>
          </section>
          <section id="basic-markup">
            <h2>Basic Markup</h2>
            <Snippet lang="HTML">
              {`
...
<body>
      <canvas id="draw-board" width="250" height="250" ></canvas>
      <div id="score">Score: 0</div>
      <button id="play">Play</button>
</body>
...
`}
            </Snippet>
            <p>
              We're going to use a canvas of height and width 250px and give it
              an id 'draw-board'. We will use this id to select the canvas in
              JavaScript. We will also add a div element to display score and a
              button element to start the game.
            </p>
            <Snippet
            >{`<span class="KEYWORD">const</span> <span class="IDENTIFIER">button</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getElementById</span><span class="DELIMETER">(</span><span class="STRING">"play"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">score</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getElementById</span><span class="DELIMETER">(</span><span class="STRING">"score"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">canvas</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getElementById</span><span class="DELIMETER">(</span><span class="STRING">"draw-board"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>`}</Snippet>
            <Snippet lang="CSS">
              {`
...
canvas {
  /*This width makes the canvas responsive*/
  width: 80vmin;
  background: 4px solid blue;
}
...
`}
            </Snippet>
            <p>We add a border to see where the canvas is rendering.</p>
            <canvas
              id="draw-board"
              width="100"
              height="100"
              style={{ border: "2px solid blue" }}
            />
          </section>
          <section id="drawing-on-canvas">
            <h2>Drawing On The Canvas</h2>
            <Snippet>{`<span class="COMMENT">// Selecting the canvas</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">canvas</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getElementById</span><span class="DELIMETER">(</span><span class="STRING">"draw-board"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="COMMENT">// Returns 2d drawing context on the canvas</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">ctx</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">canvas</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getContext</span><span class="DELIMETER">(</span><span class="STRING">"2d"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>`}</Snippet>
            <p>
              {" "}
              Now, we use the context reference to draw on the selected Canvas.
              Let's use a rectangle to represent a body part of snake, and make
              a function named drawSnakePart to draw the rectangle. The function
              takes context reference or ctx, (x,y) coordinates and a default
              parameter head to render different color incase the part is head.
            </p>
            <Snippet>
              {`<span class="COMMENT">// See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API</a> for canvas usage</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawSnakePart</span><span class="DELIMETER">(</span><span class="IDENTIFIER">ctx</span><span class="DELIMETER">,</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="DELIMETER">,</span><span class="IDENTIFIER">head</span><span class="OPERATOR">=</span><span class="KEYWORD">false</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">// Set the fillstyle to green if it is head else white</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillStyle</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">head</span> <span class="OPERATOR">?</span> <span class="STRING">"green"</span><span class="DELIMETER">:</span><span class="STRING">"white"</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// draw a rectangle at (x,y) coordinates with width and height of 10px</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillRect</span><span class="DELIMETER">(</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="DELIMETER">,</span><span class="NUMBER">10</span><span class="DELIMETER">,</span><span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
 <span class="COMMENT">/* Note: you can use any shape or image in this 
function, but make sure it's height and width are 10px*/</span>
<span class="DELIMETER">}</span>`}
            </Snippet>

            <p>Similarly, we draw food for the snake as below:</p>
            <Snippet>
              {`<span class="COMMENT">//Drawing Food for snake to eat</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawFood</span><span class="DELIMETER">(</span><span class="IDENTIFIER">ctx</span><span class="DELIMETER">,</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//Starting Path</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">beginPath</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//setting the fill style to red</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillStyle</span><span class="OPERATOR">=</span><span class="STRING">"red"</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// Making a circle</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">arc</span><span class="DELIMETER">(</span><span class="IDENTIFIER">x</span><span class="OPERATOR">+</span><span class="NUMBER">5</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="OPERATOR">+</span><span class="NUMBER">5</span><span class="DELIMETER">,</span><span class="NUMBER">5</span><span class="DELIMETER">,</span><span class="NUMBER">0</span><span class="DELIMETER">,</span><span class="NUMBER">2</span><span class="OPERATOR">*</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">PI</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
 <span class="COMMENT">// Closing the Path</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">stroke</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="COMMENT">//   Filling the area enclosed by the path</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fill</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>`}
            </Snippet>
            <p>
              We are only going to use basic shapes to represent the snake and
              it's food. Whenever we draw something on the canvas in one frame,
              we have to clear it in the next frame. So, we will draw a
              rectangle of size 250 x 250 i.e. the size of canvas. of the
              canvas. It acts as a background that repaints every frame,
              clearing the pixels from the previous frames. It can be costly to
              repaint the canvas again and again, but for the sake of this
              tutorial we will redraw the background so it will be easy to
              understand.
            </p>
            <Snippet>{`<span class="COMMENT">//Drawing Background</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawBackground</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">{</span>
  <span class="COMMENT">//the background color, choose whichever color you like</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillStyle</span><span class="OPERATOR">=</span><span class="STRING">"tan"</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// draw a rectangle at (0,0) coordinates with width and height of 250px</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillRect</span><span class="DELIMETER">(</span><span class="NUMBER">0</span><span class="DELIMETER">,</span><span class="NUMBER">0</span><span class="DELIMETER">,</span><span class="NUMBER">250</span><span class="DELIMETER">,</span><span class="NUMBER">250</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>`}</Snippet>
          </section>

          <section>
            <h2 id="snake-logic">Snake Logic</h2>
            <p>
              <img
                src="/img/tutorials/snake-game/snake-grid.svg"
                alt="Snake Grid"
                style={{ maxWidth: 400 }}
              />
              The main challenge is to understand how the snake moves. We assume
              the canvas as a grid of 25x25 rectangles where each rectangle is
              of size 10x10px, so the size of canvas is 250x250px. The next main
              thing to know is, a snake part is always 10px away from it's next
              part that may be in the x-axis or y-axis. In the figure, the red
              rectangle is snake's head and blue ones are other parts. What we
              can see here is every part is following it's preceding part.
              Whereas, the head is the one that decides the path and the
              direction to move. Thus, for each snake part we can assign a
              direction it's moving along with it's x,y coordinates. Now, when
              the head moves it will get new direction and next coordinates,
              depending upon the users control, which we'll discuss later. The
              snake can only move 10px in any one four direction i.e. the
              rectangle size. Now let's define a part of snake as an object and
              the entire snake as an array of snake parts. We'll also make a
              function that adds snake part dynamically, so that whenever snake
              eats it can grow along the correct direction. Let's assume UP as
              -1, DOWN as 1, LEFT as -2, RIGHT as 2. The reason why we use this
              kind of numbering is because we need to prevent the snake from
              moving opposite direction. Example: If the snake is moving RIGHT
              it can't move LEFT and vice-versa. The same can be said for UP and
              LEFT.
            </p>
            <Snippet
            >{`<span class="COMMENT">// Remember to only set x,y to values that are multiple of 10 i.e. box size</span>
<span class="KEYWORD">let</span> <span class="IDENTIFIER">head</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   Starting coordinates</span>
  <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span>
  <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span>
  <span class="COMMENT">//   RIGHT Direction</span>
  <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span>
<span class="DELIMETER">}</span><span class="DELIMETER">;</span>
<span class="KEYWORD">let</span> <span class="IDENTIFIER">snake</span> <span class="OPERATOR">=</span> <span class="DELIMETER">[</span><span class="IDENTIFIER">head</span><span class="DELIMETER">]</span><span class="DELIMETER">;</span>

<span class="COMMENT">// Dynamically Adding Snake Part</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">addPart</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">// Retrieving the last part or tail of snake</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">tail</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">length</span> <span class="OPERATOR">-</span> <span class="NUMBER">1</span><span class="DELIMETER">]</span><span class="DELIMETER">;</span>

  <span class="COMMENT">//   New Part details</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">tail</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">tail</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">tail</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// finding the new parts coordinates according to tail</span>
  <span class="KEYWORD">switch</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">direction</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">// DOWN</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// UP</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// LEFT</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// RIGHT</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="COMMENT">//   Adding the new Part to the snake</span>
  <span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">push</span><span class="DELIMETER">(</span><span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span> <span class="DELIMETER">}</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>`}</Snippet>
          </section>
          <p>
            The mod function takes (x,y) parameters and returns modulus of y
            modulo x.{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/what-is-modular-arithmetic"
            >
              Learn More
            </a>{" "}
          </p>
          <section>
            <h2 id="moving-snake">Moving The Snake</h2>
            <p>
              We now know how the snake functions. Next job is to move the snake
              according to the direction LEFT, RIGHT, UP and DOWN. The idea is
              to increment snake head's x or y coordinate according to the it's
              direction, then we simply change the parts value to the one that
              is ahead of it. This makes the part travel like a snake.
            </p>
            <Snippet
            >{`<span class="COMMENT">// This variable holds the snake moving direction.</span>
<span class="KEYWORD">let</span> <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="NUMBER">2</span><span class="DELIMETER">;</span> <span class="COMMENT">// RIGHT</span>
<span class="COMMENT">// Moving the Snake</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">moveSnake</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//    NEW HEAD Coordinates</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// Snake Direction</span>
  <span class="KEYWORD">switch</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">direction</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//DOWN - Move 1 box down</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//UP - Move 1 box up</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//LEFT - Move 1 box left</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//RIGHT - Move 1 box right</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="COMMENT">//     Making a new copy of snake with new Head attached</span>
  <span class="KEYWORD">const</span> <span class="IDENTIFIER">newSnake</span> <span class="OPERATOR">=</span> <span class="DELIMETER">[</span><span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span> <span class="DELIMETER">}</span><span class="DELIMETER">]</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">const</span> <span class="IDENTIFIER">snakeLength</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">length</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   Now we change the value of a part with the part ahead of it.</span>
  <span class="KEYWORD">for</span> <span class="DELIMETER">(</span><span class="KEYWORD">let</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">=</span> <span class="NUMBER">1</span><span class="DELIMETER">;</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">&lt;</span> <span class="IDENTIFIER">snakeLength</span><span class="DELIMETER">;</span> <span class="OPERATOR">+</span><span class="OPERATOR">+</span><span class="IDENTIFIER">i</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">newSnake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">push</span><span class="DELIMETER">(</span><span class="DELIMETER">{</span> <span class="DELIMETER">.</span><span class="DELIMETER">.</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">i</span> <span class="OPERATOR">-</span> <span class="NUMBER">1</span><span class="DELIMETER">]</span> <span class="DELIMETER">}</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="IDENTIFIER">snake</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">newSnake</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>`}</Snippet>
          </section>
          <section>
            <h2 id="generating-food">Generating Food</h2>
            <p>
              We will only add one food in the whole canvas in this tutorial. We
              will keep track of the food with a variable also named food. Then
              we will generate food randomly inside the canvas avoiding the
              snake parts.
            </p>
            <Snippet>{`<span class="COMMENT">// Current Food</span>
<span class="KEYWORD">let</span> <span class="IDENTIFIER">food</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span><span class="IDENTIFIER">x</span><span class="DELIMETER">:</span><span class="NUMBER">40</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">50</span><span class="DELIMETER">}</span><span class="DELIMETER">;</span>
<span class="COMMENT">// Generating Food</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">generateFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>

<span class="COMMENT">//   Random box between 0 - 25 i.e the grid size 25x25. Multiply by 10 to get x,y coordinates</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// selecting food that doesn't collide with the snake</span>
  <span class="KEYWORD">while</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">some</span><span class="DELIMETER">(</span><span class="IDENTIFIER">part</span> <span class="OPERATOR">=</span><span class="OPERATOR">&gt;</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">)</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
    <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="COMMENT">//   Next Food</span>
  <span class="IDENTIFIER">food</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="DELIMETER">}</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>`}</Snippet>
          </section>
          <section>
            <h2 id="game-state">Game State</h2>
            <p>
              Now, let's start combining all these pieces together and make the
              game. First let's make a game state that keeps track of everything
              going on the game. We'll first add the snake data, food data,
              direction and the game score. We'll also add a gameover flag to
              check of the game is running or over.
            </p>
            <Snippet>{`<span class="COMMENT">// Game State</span>
<span class="KEYWORD">let</span> <span class="IDENTIFIER">state</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span>
<span class="COMMENT">//   Initially game is not running</span>
  <span class="IDENTIFIER">gameover</span><span class="DELIMETER">:</span> <span class="KEYWORD">true</span><span class="DELIMETER">,</span>
<span class="COMMENT">//   Initial Direction right</span>
  <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span><span class="DELIMETER">,</span>
<span class="COMMENT">// snake array</span>
  <span class="IDENTIFIER">snake</span><span class="DELIMETER">:</span> <span class="DELIMETER">[</span>
    <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
    <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">20</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
    <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">30</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span>
  <span class="DELIMETER">]</span><span class="DELIMETER">,</span>
<span class="COMMENT">//   initial food location</span>
  <span class="IDENTIFIER">food</span><span class="DELIMETER">:</span> <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
<span class="COMMENT">//   initial score</span>
  <span class="IDENTIFIER">score</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span>
<span class="DELIMETER">}</span><span class="DELIMETER">;</span>`}</Snippet>
          </section>
          <section>
            <h2 id="game-loop">Game Loop</h2>
            <p>
              The entire game runs around a loop called Game loop. One iteration
              in a loop repaints the entire canvas and is called a frame. We
              decide the number of frames we want to display per second. Greater
              frame per second(fps) results in fast snake movement and
              vice-versa. We'll make a function called draw that handles all our
              drawing and computation. We'll call this function 10 times every
              second. There are two ways to do these, one is setInterval and the
              other is window.requestAnimationFrame(). In this tutorial we will
              use the later one. For more information about
              window.requestAnimationFrame click{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
            <Snippet>
              {`<span class="COMMENT">// To compare time in the function</span>
<span class="KEYWORD">var</span> <span class="IDENTIFIER">start</span> <span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span>
<span class="COMMENT">// Draw Function</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">draw</span><span class="DELIMETER">(</span><span class="IDENTIFIER">timestamp</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
<span class="COMMENT">//   Increment Start</span>
  <span class="IDENTIFIER">start</span><span class="OPERATOR">+</span><span class="OPERATOR">+</span><span class="DELIMETER">;</span>
<span class="COMMENT">//   timestamp contains the time elapsed since first call in milliseconds</span>
<span class="COMMENT">//   1000/10 refers to 10 frames for second. Change values to see the difference</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">timestamp</span> <span class="OPERATOR">-</span> <span class="IDENTIFIER">start</span> <span class="OPERATOR">&gt;</span> <span class="NUMBER">1000</span>  <span class="UNDEF"></span> <span class="NUMBER">10</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
<span class="COMMENT">//this block runs every 10th of a second</span>
<span class="COMMENT">//  We put our drawing functions and computatin here</span>

<span class="COMMENT">//  Checking if game is over.</span>
    <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">checkGameOver</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
<span class="COMMENT">//        Exiting function if is over</span>
      <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">gameover</span> <span class="OPERATOR">=</span> <span class="KEYWORD">true</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">return</span><span class="DELIMETER">;</span>
    <span class="DELIMETER">}</span>
<span class="COMMENT">//     Calculating next position of snake</span>
    <span class="IDENTIFIER"> moveSnake();</span>
<span class="COMMENT">//  Redrawing the canvas to clear previous fram</span>
    <span class="IDENTIFIER">drawBackground</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="COMMENT">// drawing the food</span>
    <span class="IDENTIFIER">drawFood</span><span class="DELIMETER">(</span><span class="IDENTIFIER">ctx</span><span class="DELIMETER">,</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="COMMENT">// drawing the snake</span>
    <span class="IDENTIFIER">drawSnake</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="COMMENT">// Checking if the snake eats the food</span>
    <span class="IDENTIFIER">eatFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="COMMENT">// resetting the start </span>
    <span class="IDENTIFIER">start</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">timestamp</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="COMMENT">//   recursively calls itself until game over</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="OPERATOR">!</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">gameover</span><span class="DELIMETER">)</span> <span class="IDENTIFIER">window</span><span class="DELIMETER">.</span><span class="IDENTIFIER">requestAnimationFrame</span><span class="DELIMETER">(</span><span class="IDENTIFIER">draw</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>`}
            </Snippet>
            <p>
              Now, lets define how the checkGameOver, drawSnake, eatFood and mod
              functions. functions
            </p>
            <Snippet>{`<span class="COMMENT">// mod function</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="IDENTIFIER">m</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">val</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="KEYWORD">while</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">val</span> <span class="OPERATOR">&lt;</span> <span class="NUMBER">0</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">val</span> <span class="OPERATOR">+</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">m</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="KEYWORD">return</span> <span class="IDENTIFIER">val</span> <span class="OPERATOR">%</span> <span class="IDENTIFIER">m</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>

<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawSnake</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   we draw the snake form tail so that head is drawn last. It makes the head appear above all other drawings.</span>
  <span class="KEYWORD">for</span> <span class="DELIMETER">(</span><span class="KEYWORD">let</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">length</span> <span class="OPERATOR">-</span> <span class="NUMBER">1</span><span class="DELIMETER">;</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">&gt;</span><span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span> <span class="OPERATOR">-</span><span class="OPERATOR">-</span><span class="IDENTIFIER">i</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">drawSnakePart</span><span class="DELIMETER">(</span>ctx,<span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">i</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">i</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">eatFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   Head position</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   Tail Position</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">fx</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">fy</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// if head and food are at same position</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">fx</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">fy</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//     increase score</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">score</span><span class="OPERATOR">+</span><span class="OPERATOR">+</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     change score text</span>
    <span class="IDENTIFIER">score</span><span class="DELIMETER">.</span><span class="IDENTIFIER">innerHTML</span> <span class="OPERATOR">=</span> <span class="STRING">"Score: "</span> <span class="OPERATOR">+</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">score</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Add a snake part</span>
    <span class="IDENTIFIER">addPart</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Generate a new Food</span>
    <span class="IDENTIFIER">generateFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span>
<span class="COMMENT">// Checking game over. return bool</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">checkGameOver</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="KEYWORD">const</span> <span class="IDENTIFIER">head</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   Checking if head collides with snake other parts. if collides gameover returns true</span>
  <span class="KEYWORD">return</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">some</span><span class="DELIMETER">(</span>
    <span class="DELIMETER">(</span><span class="IDENTIFIER">part</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">i</span><span class="DELIMETER">)</span> <span class="OPERATOR">=</span><span class="OPERATOR">&gt;</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">!</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="NUMBER">0</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">head</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">head</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span>
  <span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// Note: You can add blocks or check if it is colliding the boundary and make it game over</span>
<span class="DELIMETER">}</span>`}</Snippet>
          </section>
          <section>
            <h2 id="event-handling">Event Handling</h2>
            <p>
              We now need to handle events fired by users to change the
              direction of snake
            </p>
            <Snippet>
              {`<span class="COMMENT">// Adding event Listener on the document for keydown</span>
<span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">addEventListener</span><span class="DELIMETER">(</span><span class="STRING">"keydown"</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">event</span> <span class="OPERATOR">=</span><span class="OPERATOR">&gt;</span> <span class="DELIMETER">{</span>
<span class="COMMENT">//   Checking if Arrow keys are pressed</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="OPERATOR">!</span> <span class="UNDEF"></span><span class="IDENTIFIER">Arrow</span> <span class="UNDEF"></span><span class="IDENTIFIER">gi</span><span class="DELIMETER">.</span><span class="IDENTIFIER">test</span><span class="DELIMETER">(</span><span class="IDENTIFIER">event</span><span class="DELIMETER">.</span><span class="IDENTIFIER">key</span><span class="DELIMETER">)</span><span class="DELIMETER">)</span>
<span class="COMMENT">//     if not return</span>
    <span class="KEYWORD">return</span>


<span class="COMMENT">//   Preventing default behaviour</span>
  <span class="IDENTIFIER">event</span><span class="DELIMETER">.</span><span class="IDENTIFIER">preventDefault</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>

<span class="COMMENT">//   null direction</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span>
<span class="COMMENT">//   checking direction</span>
  <span class="KEYWORD">switch</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">event</span><span class="DELIMETER">.</span><span class="IDENTIFIER">key</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowDown"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="NUMBER">1</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowUp"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="OPERATOR">-</span><span class="NUMBER">1</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowLeft"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="OPERATOR">-</span><span class="NUMBER">2</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowRight"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="NUMBER">2</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span>
<span class="COMMENT">//     if direction is changed</span>
    <span class="IDENTIFIER">direction</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span>
<span class="COMMENT">//     if snake direction and current direction are same</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span>
<span class="COMMENT">//     and the directions are not oposite to current direction i.e LEFT and RIGHT or UP and DOWN</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">!</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="OPERATOR">-</span><span class="IDENTIFIER">direction</span>
  <span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
<span class="COMMENT">//     Change the direction</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>`}
            </Snippet>
          </section>
          <section>
            <h2 id="wrapping-up">Wrapping Things</h2>
            <p>
              Finally, let's wrap up this game. We'll add an event handler to
              the play button that triggers the draw function, which starts the
              Game Loop. It will also re-initialize the game state whenever game
              is over.
            </p>
            <Snippet>
              {`<span class="COMMENT">// Event Handler</span>
<span class="IDENTIFIER">play</span><span class="DELIMETER">.</span><span class="IDENTIFIER">onclick</span> <span class="OPERATOR">=</span> <span class="KEYWORD">function</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   If game is not running</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">gameover</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//     Initialize state</span>
    <span class="IDENTIFIER">state</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span>
      <span class="IDENTIFIER">gameover</span><span class="DELIMETER">:</span> <span class="KEYWORD">false</span><span class="DELIMETER">,</span>
      <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span><span class="DELIMETER">,</span>
      <span class="COMMENT">//       making snake have two additional part. you can also use addPart() instead maually adding parts</span>
      <span class="IDENTIFIER">snake</span><span class="DELIMETER">:</span> <span class="DELIMETER">[</span>
        <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
        <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">20</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
        <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">30</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span>
      <span class="DELIMETER">]</span><span class="DELIMETER">,</span>
      <span class="COMMENT">//       initial food</span>
      <span class="IDENTIFIER">food</span><span class="DELIMETER">:</span> <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
      <span class="COMMENT">//       Initial score</span>
      <span class="IDENTIFIER">score</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span>
    <span class="DELIMETER">}</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Resetting Score</span>
    <span class="IDENTIFIER">score</span><span class="DELIMETER">.</span><span class="IDENTIFIER">innerHTML</span> <span class="OPERATOR">=</span> <span class="STRING">"Score: "</span> <span class="OPERATOR">+</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Generate New Food</span>
    <span class="IDENTIFIER">generateFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Trigger Game Loop</span>
    <span class="IDENTIFIER">window</span><span class="DELIMETER">.</span><span class="IDENTIFIER">requestAnimationFrame</span><span class="DELIMETER">(</span><span class="IDENTIFIER">draw</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span><span class="DELIMETER">;</span>`}
            </Snippet>
            <p>
              Now, we're set to go. All you have to do now is click play and
              start playing!
            </p>
          </section>
          <section>
            <h2 id="conclusion">Conclusion</h2>
            <p>
              You've now learned how to make a simple snake game. Try to make
              your own version of it, change the shape of snake, speed of the
              game, make an attractive ui, add different modes and difficulty.
              Use your new found Knowledge to make something beautiful and share
              among friends and with us too. The full source code will be down
              below an you can get the working example with code{" "}
              <a
                href="https://codepen.io/subeshb1/pen/KGdJyq"
                target="_blank"
                rel="noopener noreferrer"
              >
                Here
              </a>
              .
            </p>
          </section>

          <section>
            <h2 id="code">Code</h2>
            <Snippet lang="HTML">{`<canvas width="250"  height="250" id="draw-board"></canvas>
<div id="score">Score: 0</div>
<button id="play">Play</button>`}</Snippet>
            <Snippet lang="css">{`* {
  margin: 0;
  box-sizing: border-box;
}
canvas {
  
  width: 80vmin;
  border: 10px solid cornflowerblue;
}`}</Snippet>
            <Snippet>
              {`<span class="COMMENT">// Selecting Element Reference</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">button</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getElementById</span><span class="DELIMETER">(</span><span class="STRING">"play"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">score</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getElementById</span><span class="DELIMETER">(</span><span class="STRING">"score"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">canvas</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getElementById</span><span class="DELIMETER">(</span><span class="STRING">"draw-board"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>

<span class="COMMENT">// ctx reference</span>
<span class="KEYWORD">const</span> <span class="IDENTIFIER">ctx</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">canvas</span><span class="DELIMETER">.</span><span class="IDENTIFIER">getContext</span><span class="DELIMETER">(</span><span class="STRING">"2d"</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>

<span class="COMMENT">// Game State</span>
<span class="KEYWORD">var</span> <span class="IDENTIFIER">state</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   Initially game is not running</span>
  <span class="IDENTIFIER">gameover</span><span class="DELIMETER">:</span> <span class="KEYWORD">true</span><span class="DELIMETER">,</span>
  <span class="COMMENT">//   Initial Direction right</span>
  <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span><span class="DELIMETER">,</span>
  <span class="COMMENT">// snake array</span>
  <span class="IDENTIFIER">snake</span><span class="DELIMETER">:</span> <span class="DELIMETER">[</span>
    <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
    <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">20</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
    <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">30</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span>
  <span class="DELIMETER">]</span><span class="DELIMETER">,</span>
  <span class="COMMENT">//   initial food location</span>
  <span class="IDENTIFIER">food</span><span class="DELIMETER">:</span> <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
  <span class="COMMENT">//   initial score</span>
  <span class="IDENTIFIER">score</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span>
<span class="DELIMETER">}</span><span class="DELIMETER">;</span>



<span class="COMMENT">// DRAW SECTION</span>
<span class="COMMENT">// Snake Part</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawSnakePart</span><span class="DELIMETER">(</span><span class="IDENTIFIER">ctx</span><span class="DELIMETER">,</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="DELIMETER">,</span><span class="IDENTIFIER">head</span><span class="OPERATOR">=</span><span class="KEYWORD">false</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">// Set the fillstyle to green if it is head else white</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillStyle</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">head</span> <span class="OPERATOR">?</span> <span class="STRING">"green"</span><span class="DELIMETER">:</span><span class="STRING">"white"</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// draw a rectangle at (x,y) coordinates with width and height of 10px</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillRect</span><span class="DELIMETER">(</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="DELIMETER">,</span><span class="NUMBER">10</span><span class="DELIMETER">,</span><span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
 <span class="COMMENT">/* Note: you can use any shape or image in this 
function, but make sure it's height and width are 10px*/</span>

<span class="DELIMETER">}</span>

<span class="COMMENT">//Drawing Food for snake to eat</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawFood</span><span class="DELIMETER">(</span><span class="IDENTIFIER">ctx</span><span class="DELIMETER">,</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//Starting Path</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">beginPath</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//setting the fill style to red</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillStyle</span><span class="OPERATOR">=</span><span class="STRING">"red"</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// Making a circle</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">arc</span><span class="DELIMETER">(</span><span class="IDENTIFIER">x</span><span class="OPERATOR">+</span><span class="NUMBER">5</span><span class="DELIMETER">,</span><span class="IDENTIFIER">y</span><span class="OPERATOR">+</span><span class="NUMBER">5</span><span class="DELIMETER">,</span><span class="NUMBER">5</span><span class="DELIMETER">,</span><span class="NUMBER">0</span><span class="DELIMETER">,</span><span class="NUMBER">2</span><span class="OPERATOR">*</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">PI</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
 <span class="COMMENT">// Closing the Path</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">stroke</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="COMMENT">//   Filling the area enclosed by the path</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fill</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>

<span class="COMMENT">//Drawing Background</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawBackground</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">{</span>
  <span class="COMMENT">//the background color, choose whichever color you like</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillStyle</span><span class="OPERATOR">=</span><span class="STRING">"tan"</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// draw a rectangle at (0,0) coordinates with width and height of 250px</span>
  <span class="IDENTIFIER">ctx</span><span class="DELIMETER">.</span><span class="IDENTIFIER">fillRect</span><span class="DELIMETER">(</span><span class="NUMBER">0</span><span class="DELIMETER">,</span><span class="NUMBER">0</span><span class="DELIMETER">,</span><span class="NUMBER">250</span><span class="DELIMETER">,</span><span class="NUMBER">250</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>

<span class="COMMENT">// Draw Whole Snake</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">drawSnake</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   we draw the snake form tail so that head is drawn last. It makes the head appear above all other drawings.</span>
  <span class="KEYWORD">for</span> <span class="DELIMETER">(</span><span class="KEYWORD">let</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">length</span> <span class="OPERATOR">-</span> <span class="NUMBER">1</span><span class="DELIMETER">;</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">&gt;</span><span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span> <span class="OPERATOR">-</span><span class="OPERATOR">-</span><span class="IDENTIFIER">i</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">drawSnakePart</span><span class="DELIMETER">(</span><span class="IDENTIFIER">ctx</span><span class="DELIMETER">,</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">i</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">i</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span>



<span class="COMMENT">// Game Logic</span>
<span class="COMMENT">// mod function</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="IDENTIFIER">m</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">val</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="KEYWORD">while</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">val</span> <span class="OPERATOR">&lt;</span> <span class="NUMBER">0</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">val</span> <span class="OPERATOR">+</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">m</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="KEYWORD">return</span> <span class="IDENTIFIER">val</span> <span class="OPERATOR">%</span> <span class="IDENTIFIER">m</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>

<span class="COMMENT">// Dynamically Adding Snake Part</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">addPart</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">// Retrieving the last part or tail of snake</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">tail</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">length</span> <span class="OPERATOR">-</span> <span class="NUMBER">1</span><span class="DELIMETER">]</span><span class="DELIMETER">;</span>

  <span class="COMMENT">//   New Part details</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">tail</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">tail</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">tail</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// finding the new parts coordinates according to tail</span>
  <span class="KEYWORD">switch</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">direction</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">// DOWN</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// UP</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// LEFT</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// RIGHT</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="COMMENT">//   Adding the new Part to the snake</span>
  <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">push</span><span class="DELIMETER">(</span><span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span> <span class="DELIMETER">}</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>

<span class="KEYWORD">function</span> <span class="IDENTIFIER">eatFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   Head position</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   Tail Position</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">fx</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">fy</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// if head and food are at same position</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">fx</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">fy</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//     increase score</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">score</span><span class="OPERATOR">+</span><span class="OPERATOR">+</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     change score text</span>
    <span class="IDENTIFIER">score</span><span class="DELIMETER">.</span><span class="IDENTIFIER">innerHTML</span> <span class="OPERATOR">=</span> <span class="STRING">"Score: "</span> <span class="OPERATOR">+</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">score</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Add a snake part</span>
    <span class="IDENTIFIER">addPart</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Generate a new Food</span>
    <span class="IDENTIFIER">generateFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span>


<span class="COMMENT">// Movng the Snake</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">moveSnake</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//    NEW HEAD Coordinates</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// Snake Direction</span>
  <span class="KEYWORD">switch</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//DOWN - Move 1 box down</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//UP - Move 1 box up</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">1</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//LEFT - Move 1 box left</span>
    <span class="KEYWORD">case</span> <span class="OPERATOR">-</span><span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">-</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//RIGHT - Move 1 box right</span>
    <span class="KEYWORD">case</span> <span class="NUMBER">2</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">mod</span><span class="DELIMETER">(</span><span class="NUMBER">250</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">+</span> <span class="NUMBER">10</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="COMMENT">//     Making a new copy of snake</span>
  <span class="KEYWORD">const</span> <span class="IDENTIFIER">newSnake</span> <span class="OPERATOR">=</span> <span class="DELIMETER">[</span><span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="DELIMETER">}</span><span class="DELIMETER">]</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">const</span> <span class="IDENTIFIER">snakeLength</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">length</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   Now we change the value of a part with the part ahead of it.</span>
  <span class="KEYWORD">for</span> <span class="DELIMETER">(</span><span class="KEYWORD">let</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">=</span> <span class="NUMBER">1</span><span class="DELIMETER">;</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">&lt;</span> <span class="IDENTIFIER">snakeLength</span><span class="DELIMETER">;</span> <span class="OPERATOR">+</span><span class="OPERATOR">+</span><span class="IDENTIFIER">i</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">newSnake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">push</span><span class="DELIMETER">(</span><span class="DELIMETER">{</span> <span class="DELIMETER">.</span><span class="DELIMETER">.</span><span class="DELIMETER">.</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="IDENTIFIER">i</span> <span class="OPERATOR">-</span> <span class="NUMBER">1</span><span class="DELIMETER">]</span> <span class="DELIMETER">}</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">newSnake</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>


<span class="COMMENT">// Checking game over. return bool</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">checkGameOver</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="KEYWORD">const</span> <span class="IDENTIFIER">head</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   Checking if head collides with snake other parts. if collides gameover returns true</span>
  <span class="KEYWORD">return</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">some</span><span class="DELIMETER">(</span>
    <span class="DELIMETER">(</span><span class="IDENTIFIER">part</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">i</span><span class="DELIMETER">)</span> <span class="OPERATOR">=</span><span class="OPERATOR">&gt;</span> <span class="IDENTIFIER">i</span> <span class="OPERATOR">!</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="NUMBER">0</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">head</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">head</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span>
  <span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// Note: You can add blocks or check if it is colliding the boundary and make it game over</span>
<span class="DELIMETER">}</span>

<span class="COMMENT">// Generating Food</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">generateFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>

<span class="COMMENT">//   Random box between 0 - 25 i.e the grid size 25x25. Multiply by 10 to get x,y coordinates</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
  <span class="COMMENT">// selecting food that doesn't collide with the snake</span>
  <span class="KEYWORD">while</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">.</span><span class="IDENTIFIER">some</span><span class="DELIMETER">(</span><span class="IDENTIFIER">part</span> <span class="OPERATOR">=</span><span class="OPERATOR">&gt;</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">x</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span> <span class="IDENTIFIER">part</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">)</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="IDENTIFIER">x</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
    <span class="IDENTIFIER">y</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">floor</span><span class="DELIMETER">(</span><span class="IDENTIFIER">Math</span><span class="DELIMETER">.</span><span class="IDENTIFIER">random</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">25</span><span class="DELIMETER">)</span> <span class="OPERATOR">*</span> <span class="NUMBER">10</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="COMMENT">//   Next Food</span>
  <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span> <span class="DELIMETER">}</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>



<span class="COMMENT">// To compare time in the function</span>
<span class="KEYWORD">var</span> <span class="IDENTIFIER">start</span> <span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span>
<span class="COMMENT">// Draw Function</span>
<span class="KEYWORD">function</span> <span class="IDENTIFIER">draw</span><span class="DELIMETER">(</span><span class="IDENTIFIER">timestamp</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   Increment Start</span>
  <span class="IDENTIFIER">start</span><span class="OPERATOR">+</span><span class="OPERATOR">+</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   timestamp contains the time elapsed since first call in milliseconds</span>
  <span class="COMMENT">//   1000/10 refers to 10 frames for second. Change values to see the difference</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">timestamp</span> <span class="OPERATOR">-</span> <span class="IDENTIFIER">start</span> <span class="OPERATOR">&gt;</span> <span class="NUMBER">1000</span>  <span class="UNDEF"></span> <span class="NUMBER">10</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//this block runs every 10th of a second</span>
    <span class="COMMENT">//  We put our drawing functions and computatin here</span>

    <span class="COMMENT">//  Chcking if game is over.</span>
    <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">checkGameOver</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
      <span class="COMMENT">//        Exiting function if is over</span>
      <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">gameover</span> <span class="OPERATOR">=</span> <span class="KEYWORD">true</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">return</span><span class="DELIMETER">;</span>
    <span class="DELIMETER">}</span>
    <span class="COMMENT">//     Calclating next position of snake</span>
    <span class="IDENTIFIER">moveSnake</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//  Redrawing the canvas to clear previous fram</span>
    <span class="IDENTIFIER">drawBackground</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// drawing the food</span>
    <span class="IDENTIFIER">drawFood</span><span class="DELIMETER">(</span><span class="IDENTIFIER">ctx</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">x</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">food</span><span class="DELIMETER">.</span><span class="IDENTIFIER">y</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// drawing the snake</span>
    <span class="IDENTIFIER">drawSnake</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// Checking if the snake eats the food</span>
    <span class="IDENTIFIER">eatFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">// resetting the start</span>
    <span class="IDENTIFIER">start</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">timestamp</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="COMMENT">//   recursively calls itself until game over</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="OPERATOR">!</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">gameover</span><span class="DELIMETER">)</span> <span class="IDENTIFIER">window</span><span class="DELIMETER">.</span><span class="IDENTIFIER">requestAnimationFrame</span><span class="DELIMETER">(</span><span class="IDENTIFIER">draw</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
<span class="DELIMETER">}</span>


<span class="COMMENT">// Event Handling</span>

<span class="COMMENT">// Adding event Listener on the document for keydown</span>
<span class="IDENTIFIER">document</span><span class="DELIMETER">.</span><span class="IDENTIFIER">addEventListener</span><span class="DELIMETER">(</span><span class="STRING">"keydown"</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">event</span> <span class="OPERATOR">=</span><span class="OPERATOR">&gt;</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   Checking if Arrow keys are pressed</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="OPERATOR">!</span> <span class="UNDEF"></span><span class="IDENTIFIER">Arrow</span> <span class="UNDEF"></span><span class="IDENTIFIER">gi</span><span class="DELIMETER">.</span><span class="IDENTIFIER">test</span><span class="DELIMETER">(</span><span class="IDENTIFIER">event</span><span class="DELIMETER">.</span><span class="IDENTIFIER">key</span><span class="DELIMETER">)</span><span class="DELIMETER">)</span>
    <span class="COMMENT">//     if not return</span>
    <span class="KEYWORD">return</span><span class="DELIMETER">;</span>

  <span class="COMMENT">//   Preventing default behaviour</span>
  <span class="IDENTIFIER">event</span><span class="DELIMETER">.</span><span class="IDENTIFIER">preventDefault</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>

  <span class="COMMENT">//   null direction</span>
  <span class="KEYWORD">let</span> <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span>
  <span class="COMMENT">//   checking direction</span>
  <span class="KEYWORD">switch</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">event</span><span class="DELIMETER">.</span><span class="IDENTIFIER">key</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowDown"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="NUMBER">1</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowUp"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="OPERATOR">-</span><span class="NUMBER">1</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowLeft"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="OPERATOR">-</span><span class="NUMBER">2</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
    <span class="KEYWORD">case</span> <span class="STRING">"ArrowRight"</span><span class="DELIMETER">:</span>
      <span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="NUMBER">2</span><span class="DELIMETER">;</span>
      <span class="KEYWORD">break</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span>
    <span class="COMMENT">//     if direction is changed</span>
    <span class="IDENTIFIER">direction</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span>
    <span class="COMMENT">//     if snake direction and current direction are same</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">snake</span><span class="DELIMETER">[</span><span class="NUMBER">0</span><span class="DELIMETER">]</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">&amp;</span><span class="OPERATOR">&amp;</span>
    <span class="COMMENT">//     and the directions are not oposite to current direction i.e LEFT and RIGHT or UP and DOWN</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">!</span><span class="OPERATOR">=</span><span class="OPERATOR">=</span> <span class="OPERATOR">-</span><span class="IDENTIFIER">direction</span>
  <span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//     Change the direction</span>
    <span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">direction</span> <span class="OPERATOR">=</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>

<span class="COMMENT">// Event Handler</span>
<span class="IDENTIFIER">play</span><span class="DELIMETER">.</span><span class="IDENTIFIER">onclick</span> <span class="OPERATOR">=</span> <span class="KEYWORD">function</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
  <span class="COMMENT">//   If game is not running</span>
  <span class="KEYWORD">if</span> <span class="DELIMETER">(</span><span class="IDENTIFIER">state</span><span class="DELIMETER">.</span><span class="IDENTIFIER">gameover</span><span class="DELIMETER">)</span> <span class="DELIMETER">{</span>
    <span class="COMMENT">//     Initialize state</span>
    <span class="IDENTIFIER">state</span> <span class="OPERATOR">=</span> <span class="DELIMETER">{</span>
      <span class="IDENTIFIER">gameover</span><span class="DELIMETER">:</span> <span class="KEYWORD">false</span><span class="DELIMETER">,</span>
      <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span><span class="DELIMETER">,</span>
      <span class="COMMENT">//       making snake have two additional part. you can also use addPart() instead maually adding parts</span>
      <span class="IDENTIFIER">snake</span><span class="DELIMETER">:</span> <span class="DELIMETER">[</span>
        <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
        <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">20</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
        <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">10</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">30</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">direction</span><span class="DELIMETER">:</span> <span class="NUMBER">2</span> <span class="DELIMETER">}</span>
      <span class="DELIMETER">]</span><span class="DELIMETER">,</span>
      <span class="COMMENT">//       initial food</span>
      <span class="IDENTIFIER">food</span><span class="DELIMETER">:</span> <span class="DELIMETER">{</span> <span class="IDENTIFIER">x</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span><span class="DELIMETER">,</span> <span class="IDENTIFIER">y</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span> <span class="DELIMETER">}</span><span class="DELIMETER">,</span>
      <span class="COMMENT">//       Initial score</span>
      <span class="IDENTIFIER">score</span><span class="DELIMETER">:</span> <span class="NUMBER">0</span>
    <span class="DELIMETER">}</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Resetting Score</span>
    <span class="IDENTIFIER">score</span><span class="DELIMETER">.</span><span class="IDENTIFIER">innerHTML</span> <span class="OPERATOR">=</span> <span class="STRING">"Score: "</span> <span class="OPERATOR">+</span> <span class="NUMBER">0</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Generate New Food</span>
    <span class="IDENTIFIER">generateFood</span><span class="DELIMETER">(</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
    <span class="COMMENT">//     Trigger Game Loop</span>
    <span class="IDENTIFIER">window</span><span class="DELIMETER">.</span><span class="IDENTIFIER">requestAnimationFrame</span><span class="DELIMETER">(</span><span class="IDENTIFIER">draw</span><span class="DELIMETER">)</span><span class="DELIMETER">;</span>
  <span class="DELIMETER">}</span>
<span class="DELIMETER">}</span><span class="DELIMETER">;</span>`}
            </Snippet>
          </section>
        </article>
      </div>
    );
  }
}
