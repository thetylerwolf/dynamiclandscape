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

const RADIUS = 10

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
      .on('click', () => this.handleClick())

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

    this.props.positionData.forEach((d,i) => {

      let node = this.props.nodeData[i]
      let radius = RADIUS

      if(!node.active) {
        context.globalAlpha = 0.3
      } else {
        context.globalAlpha = 1
      }

      context.beginPath()
      context.arc( this.xScale(d[0]), this.yScale(d[1]), radius, 0, 2 * Math.PI, true )
      context.fillStyle = node.active ? this.colorScale( i ) : '#333'
      context.closePath()
      context.fill()

      context.font = '10px arial';
      context.textAlign = 'center'
      context.fillText( node.name, this.xScale(d[0]), this.yScale(d[1]) - 1.5 * radius )
    })

  }

  handleClick() {
    let x = d3.event.offsetX,
      y = d3.event.offsetY,
      context = this.state.context

    let hitNode

    let hits = this.props.positionData.forEach((point,i) => {
      let dx = x - this.xScale( point[0] )
      let dy = y - this.yScale( point[1] )

      let hit = dx*dx + dy*dy < RADIUS * RADIUS

      if(hit) {
        hitNode = {
          point,
          index: i,
          x: point[0],
          y: point[1],
          color: this.colorScale(i)
        }
      }

    })

    if(hitNode) {

      this.props.nodeData.forEach(node => {
        node.active = false
        node.selected = false
      })

      hitNode = {
        ...this.props.nodeData[ hitNode.index ],
        ...hitNode
      }
      this.props.nodeData[ hitNode.index ].active = true
      this.props.nodeData[ hitNode.index ].selected = true

      let radius = RADIUS

    } else {

      this.props.nodeData.forEach(node => {
        node.active = true
        node.selected = false
      })

      hitNode = null
    }

    this.onTick()
    this.props.onClick( hitNode )

  }

  render() {
    this.onTick()

    return (
      <canvas width={ width } height={ height } ref="vizCanvas" ></canvas>
    )
  }
}

export default VizCanvas;
