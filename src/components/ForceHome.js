import React, { Component } from "react";
import * as d3 from "d3";
import schoolData from "../data_set/dummy_data.json";

const width = window.innerWidth;
const height = window.innerHeight;
const padding = {
  top: 50,
  right: 100,
  bottom: 100,
  left: 100,
};

let maxRadius = 35;

// TODO: Remove for real data
schoolData.forEach((d) => {
  d.total = Math.floor(Math.random() * 10000);
});

class ForceHome extends Component {
  simulation = d3
    .forceSimulation()
    .force("center", d3.forceCenter(width / 2, padding.top + height / 2))
    // .force("x", d3.forceX(width / 2).strength(0.01))
    .force(
      "x",
      d3
        .forceX()
        .strength(0.1)
        .x((d) => this.xScale(d.female / d.total))
    )
    .force("y", d3.forceY(padding.top + height / 2).strength(0.05))
    .force(
      "collide",
      d3
        .forceCollide()
        .radius((d) => d.r + 2)
        .strength(1)
    )
    .alphaTarget(0)
    .alphaDecay(0.02);

  xScale = d3
    .scaleLinear()
    .range([padding.left, width - padding.left - padding.right]);

  rScale = d3
    .scaleSqrt()
    .domain([0, d3.max(schoolData, (d) => d.total)])
    .range([0, maxRadius]);

  colorScale = d3.scaleLinear().range(["#3aa63a", "#8c50b9"]);

  constructor() {
    super();

    this.state = {
      schools: schoolData,
      context: undefined,
    };
  }

  componentDidMount() {
    this.initCanvas();
    this.initSim();
  }

  initCanvas() {
    d3.select(this.refs.homeCanvas)
      .style("width", width + "px")
      .style("height", height + "px");

    let dpr = window.devicePixelRatio || 1,
      rect = this.refs.homeCanvas.getBoundingClientRect();

    this.refs.homeCanvas.width = rect.width * dpr;
    this.refs.homeCanvas.height = rect.height * dpr;

    let context = this.refs.homeCanvas.getContext("2d");
    context.scale(dpr, dpr);

    this.setState({ context });
  }

  initSim() {
    this.state.schools.forEach((d) => {
      d.r = this.rScale(d.total);
      d.male = Math.round(Math.random() * d.total);
      d.female = d.total - d.male;
    });

    this.simulation
      .nodes(this.state.schools)
      .on("tick", () => this.simulationUpdate());
  }

  simulationUpdate() {
    let context = this.state.context;
    if (!context) return;

    context.clearRect(0, 0, width, height);

    // Draw the nodes
    this.state.schools.forEach((d, i) => {
      let dividerPoint = (2 * d.r * d.male) / d.total;

      dividerPoint -= d.r;

      let pointCos = dividerPoint / d.r,
        theta = Math.acos(pointCos);

      // Draw male
      context.beginPath();
      context.arc(d.x, d.y, d.r, -theta, theta, true);
      context.fillStyle = this.colorScale(0);
      context.closePath();
      context.fill();

      // Drae female
      context.beginPath();
      context.arc(d.x, d.y, d.r, -theta, theta, false);
      context.fillStyle = this.colorScale(1);
      context.fill();
    });
  }

  handleClick(index) {
    console.log("Clicked on: ");
  }

  render() {
    return <canvas width={width} height={height} ref="homeCanvas"></canvas>;
  }
}

export default ForceHome;
