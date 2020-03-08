import React, { Component } from "react";
import algoSVG from "../../assets/svg/algorithm.svg";
import visualizeSVG from "../../assets/svg/visualize.svg";
import discoverySVG from "../../assets/svg/discovery.svg";
import implementSVG from "../../assets/svg/implement.svg";
export default class Section extends Component {
  render() {
    return (
      <div className="section">
        <article id="simple-algorithms">
          <h2>Sketch Algorithms</h2>
          <article id="learn">
            <h3>Learn</h3>
            <p>
              <img src={algoSVG} alt="" />
              An algorithm is a well-defined procedure that allows a computer to
              solve a problem. Sketch Algorithms provides a medium for beginners
              to learn and interact with basic and advance algorithms related to
              Computer Science. These algorithms include sorting, searching,
              cryptography, dynamic programming, greedy paradigm, graph
              algorithms and many more to come in the future.
              <br />
              We provide a platform that teaches the necessary theory and
              requirements for one to master these algorithms at free of cost.
            </p>
          </article>
          <article id="visualize">
            <h3>Visualize</h3>
            <p>
              <img src={visualizeSVG} alt="" />
              Learning something may be easy, but mastering something takes time
              and a lot of evaluation on the field. What better way to master
              algorithms then visualizing them in real time and interacting with
              them. Test worst case, best case and average cases for various
              algorithms and generate your own conclusions. Compare what you
              learned in theory and apply them in practice.
              <br />
              Visualize Algorithms on the go. Test various inputs, different
              sizes and their complexity.
            </p>
          </article>
          <article id="discover">
            <h3>Discover</h3>

            <p>
              <img src={discoverySVG} alt="" />
              There are a lot of algorithms to solve a same problem. However,
              not all algorithms perform equally.Some may perform better on
              certain input and some may not. Algorithms termed fastest or
              quickest may sometimes not give you the result you've expected.
              Discover various algorithms with different paradigm and use them
              according to your specific problems.
            </p>
          </article>
          <article id="implement">
            <h3>Implement</h3>
            <p>
              <img src={implementSVG} alt="" />
              Learning is quite easy and fun in Sketch Algorithms. Go through
              algorithms, learn their principles and fundamentals, look at their
              code, try to do it yourself and become a master. Finally, gather
              all your knowledge, and implement your own version of the
              algorithm and solve any problem you face.
            </p>
          </article>
        </article>
      </div>
    );
  }
}
