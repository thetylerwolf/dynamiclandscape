import React, { Component } from "react";
import MapMultiples from "../components/MapMultiples";
import headingMapping from "../data_set/mapping/headingMapping.json";
import "../css/Maps.css";

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      school: ""
    };
  }

  componentDidMount() {}

  handleClick(index) {
    console.log("Clicked on: ", this.state);
  }

  render() {
    let multiplesSections = headingMapping.map((sec, i) => {
      return <MapMultiples data={sec} key={i} />;
    });

    return multiplesSections;
  }
}

export default Maps;
