import React, { Component } from "react"
import * as d3 from "d3"

const width = window.innerWidth;
const height = window.innerHeight - 50;
const padding = {
  top: 50,
  right: 220,
  bottom: 0,
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

  transform = d3.zoomIdentity

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
      // .call(d3.drag().subject(dragsubject).on("start", dragstarted).on("drag", dragged).on("end",dragended))
      .call(d3.zoom()
        .scaleExtent([ 1, 8 ])
        .translateExtent([ [ -padding.right, -padding.top ], [ width + padding.left, height ] ])
        .on("zoom", () => this.zoom()))

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

    context.save()

    context.clearRect(0, 0, width, height)
    context.translate(this.transform.x, this.transform.y)
    context.scale(this.transform.k, this.transform.k)

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
        node.color = d3.interpolateViridis(this.colorScale( colorValue ))
        context.globalAlpha = 1
        context.fillStyle = colorValue > -1 ? node.color : '#fff'
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

    context.restore()

  }

  handleClick() {
    let x = this.transform.invertX(d3.event.offsetX),
      y = this.transform.invertY(d3.event.offsetY),
      context = this.state.context

    let hitNode

    let hits = this.props.positionData.forEach((point,i) => {
      let dx = x - this.xScale( point[0] )
      let dy = y - this.yScale( point[1] )
      let node = this.props.nodeData[i]

      let radius = node.kpis[this.props.radiusValue.index].value || 0
      radius = Math.max(0, radius)
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

  zoom() {
    this.transform = d3.event.transform
    this.onTick()
  }

  render() {
    this.colorScale.domain([ this.props.colorValue.min, this.props.colorValue.median, this.props.colorValue.max ])
    this.rScale.domain([ this.props.radiusValue.min, this.props.radiusValue.max ])

    this.onTick()

    return (
      <canvas width={ width } height={ height } ref="vizCanvas" className='viz-canvas' ></canvas>
    )
  }
}

export default VizCanvas;
