import React, { Component } from "react";
import MapMultiples from "../components/MapMultiples";
import headingMapping from "../data_set/mapping/headingMapping.json";

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

    return <div className="maps">{multiplesSections}</div>;
  }
}

export default Maps;
