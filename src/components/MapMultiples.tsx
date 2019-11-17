import React, { Component } from "react";
import SmallMap from "./SmallMap";

const mappings = require("../models/mappings.ts");

interface props {
  data: any
}

const maps = (data: any) => {
  return data.ids.map((id: string) => {
    return (
      <div style={{ width: "300px" }} key={id}>
        <div>{mappings.kpiMapping[id].name}</div>
        <SmallMap id={id} />
      </div>
    );
  });
}

const MapMultiples = ({ data }: props) => {

  return (
    <div className="multiples-wrap" style={{ width: "100%" }}>
      <div>
        <h3>{data.name}</h3>
        <div
          className="maps-wrap"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          { maps(data) }
        </div>
      </div>
    </div>
  );
  
}

export default MapMultiples;
