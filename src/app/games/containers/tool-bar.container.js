import React, { Component } from 'react'
import { connect } from 'react-redux'
class ToolBarC extends Component {
  render() {
    return <div className="tool-bar" key={'#2'}></div>
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(ToolBarC)
