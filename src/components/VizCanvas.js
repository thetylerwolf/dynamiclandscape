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
    .domain([-1,1])
    .range([ padding.left, width - padding.left - padding.right ])

  yScale = d3.scaleLinear()
    .domain([-1,1])
    .range([ padding.top, height - padding.top - padding.bottom ])

  rScale = d3.scaleSqrt()
    .range([ 0, maxRadius ])

  colorScale = d3.scaleOrdinal()
    .range(d3.schemeSet2)

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
const RADIUS = 10
    this.props.positionData.forEach((d,i) => {

      context.beginPath()
      context.arc(this.xScale(d[0]), this.yScale(d[1]), RADIUS, 0, 2 * Math.PI, true)
      context.fillStyle = this.colorScale( i )
      context.closePath()
      context.fill()
    })

  }

  handleClick(index) {
    console.log("Clicked on: ")
  }

  render() {
    this.onTick()

    return (
      <canvas width={ width } height={ height } ref="vizCanvas" ></canvas>
    )
  }
}

export default VizCanvas;
