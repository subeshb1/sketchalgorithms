import React, { Component } from "react";
import PropTypes from "prop-types";
import "./carousel.css";
import "./chevron.svg";
export default class Carousel extends Component {
  state = {
    current: 0
  };
  static propTypes = {
    vertical: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.node)
  };
  static Slide(props) {
    return <div className="slide" {...props} />;
  }

  makeInterval() {
    this.interval = setInterval(() => {
      const { items = [], children } = this.props;
      const slideSize = items.length + React.Children.count(children);
      this.setState(({ current }) => ({
        current: (current - 1) % slideSize
      }));
    }, this.props.interval || 5000);
  }
  componentDidMount() {
    this.makeInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { current } = this.state;
    const {
      vertical = false,
      items = [],
      children,
      height = "100vh"
    } = this.props;
    const transform = vertical ? "translateY" : "translateX";
    const slideSize = items.length + React.Children.count(children);
    return (
      <React.Fragment>
        <div
          className="carousel"
          style={{ width: "100%", height }}
          onMouseMove={() => {
            clearInterval(this.interval);
            this.makeInterval();
          }}
        >
          {/* <div className="progress" /> */}
          <div
            className="slides"
            style={{ transform: ` ${transform}(${current * 100}%)` }}
          >
            {items.map((x, i) => {
              return (
                <div
                  className={`slide`}
                  style={{ transform: `${transform}(${i * 100}%)` }}
                  key={i}
                >
                  {x}
                </div>
              );
            })}
            {React.Children.map(children, (x, i) => {
              return React.cloneElement(x, {
                ...x.props,
                style: {
                  transform: `${transform}(${(i + items.length) * 100}%)`
                }
              });
            })}
          </div>
          <div className={` ${vertical ? "vertical " : "horizontal"} previous`}>
            <span
              className="arrow"
              onClick={() => {
                clearInterval(this.interval);

                this.setState(
                  ({ current }) => ({
                    current: Math.min(current + 1, 0)
                  }),
                  () => {
                    this.makeInterval();
                  }
                );
              }}
            />
          </div>
          <div className={` ${vertical ? "vertical " : "horizontal"} next`}>
            <span
              className="arrow"
              onClick={() => {
                clearInterval(this.interval);
                this.setState(
                  ({ current }) => ({
                    current: (current - 1) % slideSize
                  }),
                  () => {
                    this.makeInterval();
                  }
                );
              }}
            />
          </div>
          <div
            className={` ${
              vertical ? "vertical-indicator " : "horizontal-indicator"
            }  indicators`}
          >
            {new Array(slideSize).fill(0).map((x, i) => (
              <div
                className={`${-i === current ? "active" : ""} item`}
                key={i}
                onClick={() => {
                  clearInterval(this.interval);
                  this.setState({ current: -i }, () => this.makeInterval());
                }}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
