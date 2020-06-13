import React, { Component } from "react";
import { mod } from "../../utils";

const Part = ({ x, y, pos }) => {
  return (
    <rect x={x} y={y} width="9" height="9" fill={!pos ? "green" : "white"} />
  );
};
const Food = ({ x, y, pos }) => {
  return <rect x={x} rx={7} y={y} width="9" height="9" fill={"red"} />;
};

function getHighScore() {
  try {
    const highScore = parseInt(localStorage.getItem("snake-game"),10);
    return isNaN(highScore) ? 0 : highScore;
  } catch (e) {
    return 0;
  }
}
function setHighScore(highScore) {
  try {
    highScore = JSON.stringify(highScore);
    localStorage.setItem("snake-game", highScore);
  } catch (e) {}
}
export default class Snake extends Component {
  state = {
    direction: 2,
    snake: [
      { x: 10, y: 10, direction: 2 },
      { x: 10, y: 20, direction: 2 },
      { x: 10, y: 30, direction: 2 }
    ],
    gameover: true,
    food: { x: 0, y: 0 },
    score: 0
  };

  init = () => {
    this.setState({
      direction: 2,
      snake: [
        { x: 10, y: 10, direction: 2 },
        { x: 10, y: 20, direction: 2 },
        { x: 10, y: 30, direction: 2 }
      ],
      gameover: false,
      food: { x: 0, y: 0 },
      score: 0
    });
    this.generateFood();

    var start = 0;
    const draw = timestamp => {
      if (this.unmount) return;
      start++;
      if (timestamp - start > 1000 / 10) {
        this.setState(
          ({ direction, snake, highScore, score }) => {
            if (this.checkGameOver()) {
              if (score > highScore) {
                setHighScore(score)
                return { gameover: true, highScore: score };
              }
              return { gameover: true };
            }
            let x = snake[0].x;
            let y = snake[0].y;
            switch (direction) {
              case 1:
                y = mod(250, y + 10);
                break;
              case -1:
                y = mod(250, y - 10);
                break;
              case -2:
                x = mod(250, x - 10);
                break;
              case 2:
                x = mod(250, x + 10);
                break;
              default:
            }
            const newSnake = [{ x, y, direction }];
            const snakeLength = snake.length;
            for (let i = 1; i < snakeLength; ++i) {
              newSnake.push({ ...snake[i - 1] });
            }

            return { snake: newSnake };
          },
          () => {
            this.eatFood();
          }
        );
        start = timestamp;
      }
      if (!this.state.gameover && !this.unmount)
        window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);
  };
  generateFood() {
    const snake = this.state.snake;
    let x = Math.floor(Math.random() * 25) * 10;
    let y = Math.floor(Math.random() * 25) * 10;
    const check = part => part.x === x && part.y === y;
    while (snake.some(check)) {
      x = Math.floor(Math.random() * 25) * 10;
      y = Math.floor(Math.random() * 25) * 10;
    }
    this.setState({ food: { x, y } });
  }

  addPart() {
    this.setState(({ snake, score }) => {
      let { x, y, direction } = snake[snake.length - 1];
      switch (direction) {
        case 1:
          y = mod(250, y - 10);
          break;
        case -1:
          y = mod(250, y + 10);
          break;
        case -2:
          x = mod(250, x + 10);
          break;
        case 2:
          x = mod(250, x - 10);
          break;
        default:
      }
      return { snake: [...snake, { x, y, direction }], score: score + 1 };
    });
  }

  eatFood() {
    let { x, y } = this.state.snake[0];
    let { x: fx, y: fy } = this.state.food;

    if (x === fx && y === fy) {
      this.addPart();
      this.generateFood();
    }
  }
  checkGameOver() {
    const head = this.state.snake[0];
    return this.state.snake.some(
      (part, i) => i !== 0 && head.x === part.x && head.y === part.y
    );
  }

  setDirection(key) {
    let direction = 0;
    switch (key) {
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
      default:
    }
    if (
      direction &&
      this.state.direction === this.state.snake[0].direction &&
      this.state.direction !== -direction
    ) {
      this.setState({ direction });
    }
  }
  componentDidMount = () => {
    this.unmount = false;
    this.setState({ highScore: getHighScore() });
    this.keyListener = event => {
      if (/Arrow/gi.test(event.key) && !this.state.gameover) {
        event.preventDefault();
        this.setDirection(event.key);
      }
    };
    window.addEventListener("keydown", this.keyListener);
  };
  componentWillUnmount() {
    this.unmount = true;
    window.removeEventListener("keydown", this.keyListener);
  }
  render() {
    const { snake, food, score, gameover, highScore } = this.state;
    return (
      <React.Fragment>
        <div className="drawboard" style={{ background: "#6a79af" }}>
          <svg viewBox="-11 -11 270 270">
            <rect
              x={-5}
              y={-5}
              width="260"
              height="260"
              fill="tan"
              stroke="cornflowerblue"
              strokeWidth="10"
            />
            <text fontSize={10} x={0} y={-1}>
              Score: {score}
            </text>
            <text fontSize={10} x={185} y={-1}>
              HighScore: {highScore}
            </text>
            <Food {...food} />
            {snake.reduceRight(
              (acc, x, i) => [...acc, <Part {...x} pos={i} key={i} />],
              []
            )}
            {gameover && (
              <g onClick={this.init}>
                <rect
                  rx={10}
                  x={100}
                  y={100}
                  width="50"
                  height="50"
                  fill="floralwhite"
                />
                <svg x={113} y={113}>
                  <path d="M8 5v14l11-7z" x={100} y={100} />
                </svg>
              </g>
            )}
          </svg>
        </div>
        <div className="tool-bar" key={"#2"}>
          <div className="snake-control">
            <button className="up" onClick={() => this.setDirection("ArrowUp")}>
              UP
            </button>
            <button
              className="down"
              onClick={() => this.setDirection("ArrowDown")}
            >
              DOWN
            </button>
            <button
              className="left"
              onClick={() => this.setDirection("ArrowLeft")}
            >
              LEFT
            </button>
            <button
              className="right"
              onClick={() => this.setDirection("ArrowRight")}
            >
              RIGHT
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
