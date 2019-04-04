import React, { Component } from "react"
import * as d3 from "d3"

const width = window.innerWidth;
const height = window.innerHeight;
const padding = {
  top: 50,
  right: 100,
  bottom: 100,
  left: 100
}

let maxRadius = 35

class VizCanvas extends Component {

  xScale = d3.scaleLinear()
    .range([ padding.left, width - padding.left - padding.right ])

  rScale = d3.scaleSqrt()
    .range([ 0, maxRadius ])

  colorScale = d3.scaleLinear()
    .range([ '#3aa63a', '#8c50b9' ])

  constructor() {
    super()

    this.state = {
      context: undefined,
    }

  }

  componentDidMount() {
    this.initCanvas()
  }

  initCanvas() {
    d3.select( this.refs.vizCanvas )
      .style('width', width + 'px')
      .style('height', height + 'px')

    let dpr = window.devicePixelRatio || 1,
      rect = this.refs.vizCanvas.getBoundingClientRect()

    this.refs.vizCanvas.width = rect.width * dpr
    this.refs.vizCanvas.height = rect.height * dpr

    let context = this.refs.vizCanvas.getContext('2d')
    context.scale(dpr, dpr)


    this.setState({ context })
  }

  onTick() {

    let context = this.state.context
    if(!context) return

    context.clearRect(0, 0, width, height);

    this.props.data.forEach(d => {
      context.beginPath()
      context.arc(d.x, d.y, d.r, 0, 2 * Math.PI, true)
      context.fillStyle = this.colorScale( 0 )
      context.closePath()
      context.fill()
    })

  }

  handleClick(index) {
    console.log("Clicked on: ")
  }

  render() {
    return (
      <canvas width={ width } height={ height } ref="vizCanvas" ></canvas>
    )
  }
}

export default VizCanvas;
