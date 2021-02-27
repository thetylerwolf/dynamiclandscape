import React, { Component } from "react";
import * as d3 from "d3";

import Dropdown from "./Dropdown";

import { dimensions } from "../models/mappings";

interface props {
  onSelectColor: (d: any) => void;
  onSelectSize: (d: any) => void;
  colorData: any;
  sizeData: any;
  muniSelected: boolean;
}

const Legend = ({
  onSelectColor,
  onSelectSize,
  colorData,
  sizeData,
  muniSelected,
}: props) => {
  let color = colorData,
    size = sizeData;

  return (
    <div className={"legends-container " + (muniSelected ? "pushed" : "")}>
      {/* <div className="legend legend-size">

        <div className="control">
          <Dropdown
            default={20}
            data={dimensions}
            placeholder="Select size"
            onChange={(size: any) => onSelectSize(size)}
          />
        </div>

        <div className="legend-scale">

          <div className="sizes-circles">
            <div className="big-circle"></div>
            <div className="medium-circle"></div>
            <div className="small-circle"></div>
          </div>

          <div className="sizes-values">
            <div className="sizes-max">{ size.max ? size.max.toFixed(0) : '' }</div>
            <div className="sizes-min">{ size.min ? size.min.toFixed(0) : '' }</div>
          </div>

        </div>

      </div> */}

      <div className="legend legend-color">
        <div className="control">
          <Dropdown
            default={17}
            data={dimensions}
            placeholder="Select color"
            onChange={(color: any) => onSelectColor(color)}
          />
        </div>

        <div className="legend-scale">
          <div className="colors-blocks">
            <div
              className="block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,192,0,1) 0%, rgba(9,30,121,1) 100%)",
                width: 100 + "%",
              }}
            ></div>
          </div>
          <div className="colors-values">
            <div className="colors-min colors-value">
              {color.min ? color.min.toFixed(0) : ""}
            </div>
            <div className="colors-max colors-value">
              {color.max ? color.max.toFixed(0) : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
