import React, { Component } from "react"
import * as d3 from "d3"

const width = window.innerWidth;
const height = window.innerHeight;
const padding = {
  top: 20,
  right: 220,
  bottom: 20,
  left: 20
}

let maxRadius = 20

class VizCanvas extends Component {

  xScale = d3.scaleLinear()
    .domain([-1,1])
    .range([ padding.left, width - padding.left - padding.right ])

  yScale = d3.scaleLinear()
    .domain([-1,1])
    .range([ padding.top, height - padding.top - padding.bottom ])

  rScale = d3.scaleSqrt()
    .range([ 0, maxRadius ])

  colorScale = d3.scaleLinear()
    .range([0,0.5])

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
      let colorValue = node.kpis[this.props.colorValue.index],
        radiusValue = node.kpis[this.props.radiusValue.index]

      colorValue = (colorValue && colorValue.value !== undefined) ? colorValue.value : -1
      radiusValue = (radiusValue && radiusValue.value !== undefined) ? radiusValue.value : -1


      context.font = '10px arial';
      context.textAlign = 'center'

      context.beginPath()
      if(radiusValue > 0) {
        context.arc( this.xScale(d[0]), this.yScale(d[1]), this.rScale(radiusValue), 0, 2 * Math.PI, true )
      } else {
        context.arc( this.xScale(d[0]), this.yScale(d[1]), 0.1, 0, 2 * Math.PI, true )
      }

      if(node.active) {
        context.globalAlpha = 1
        context.fillStyle = colorValue > -1 ? d3.interpolateViridis(this.colorScale( colorValue )) : '#fff'
      } else {
        context.globalAlpha = 0.3
        context.fillStyle = '#333'
      }

      context.strokeStyle = '#333'
      context.stroke()

      context.closePath()
      context.fill()

      if(colorValue === -1) {
        context.fillStyle = '#333'
      }

      if( this.rScale(radiusValue) > 2 || node.active ) {
        context.fillText( node.name, this.xScale(d[0]), this.yScale(d[1]) - 1.5 * this.rScale(radiusValue) )
      }

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
      let node = this.props.nodeData[i]

      let radius = node.kpis[this.props.radiusValue.index].value || 0
      radius = this.rScale( radius )
      let hit = dx*dx + dy*dy < radius*radius

      if(hit) {
        hitNode = {
          point,
          index: i,
          x: point[0],
          y: point[1]
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

      let node = this.props.nodeData[ hitNode.index ]
      node.active = true
      node.selected = true

      let colorValue = node.kpis[this.props.colorValue.index].value || 0

      if(colorValue == -1) {
        hitNode.color = '#333'
      } else {
        hitNode.color = d3.interpolateViridis(this.colorScale( colorValue ))
      }

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
    this.colorScale.domain([ this.props.colorValue.min, this.props.colorValue.median, this.props.colorValue.max ])
    this.rScale.domain([ this.props.radiusValue.min, this.props.radiusValue.max ])

    this.onTick()

    return (
      <canvas width={ width } height={ height } ref="vizCanvas" ></canvas>
    )
  }
}

export default VizCanvas;
