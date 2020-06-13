import React from "react";
import { connect } from "react-redux";
import { Snake } from "../statefulComponents";

const DrawBoard = props => {
  return (
    <div className="drawboard" >
      <Snake />
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps)(DrawBoard);
