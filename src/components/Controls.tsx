import React, { Component } from "react";
import AutoSuggest from "../components/AutoSuggest";
import DimensionPicker from "../components/DimensionPicker";

interface props {
  onSelectMunicipalityId: (d: string) => void
  onChangeDimensions: (d: string[]) => void
}

const Controls = ({ onSelectMunicipalityId, onChangeDimensions }: props) => {

  return (
    <div>
      <div className="controls-container">

        <div className="control">
          <DimensionPicker
            dimensions={ [] }
            onChange={ (dims: string[]) => onChangeDimensions(dims) }
          />
        </div>

      </div>

      <div className="control node-select">
        <AutoSuggest
          selectedMunicipalityId={(selectedMunicipalityId: string) =>
            onSelectMunicipalityId(selectedMunicipalityId)
          }
        />
      </div>

    </div>
  );
}

export default Controls;
