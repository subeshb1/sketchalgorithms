import React from "react";
import "./css/index.css";

import { Slide, Section, Features } from "./components";
import {Head} from '../components';

const data = {
description:"Sketch Algorithms, a site to visualize, implement, learn and implement algorithms. Learn the basics to Design and Analysis of Algorithms. Compute Complexity, Easy Visualization, Algorithm Codes all in one place.",
title:"Sketch Algorithms | Learn, Visualize, Implement"
}
export default () => {
  return (
    <div className="section-container">
      <Head data={data}/>
      <Slide />
      <Section />
      <Features />
    </div>
  );
};
