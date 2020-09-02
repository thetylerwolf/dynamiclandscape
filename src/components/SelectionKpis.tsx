import React, { Component } from "react"
import { dimensions, Inode, Idimension, InodeDimension } from '../models/mappings'

interface props {
  node: Inode
}

const SelectionDimensions = ({ node }: props) => {

  if( !node ) return (<div />)

  return (
    <div className="selection-dimensions-container">

      <div className="municipality-wrap">

        <div className="municipality-name">{ node.name }</div>

        { node && node.dimensions.map((dimension: InodeDimension, i: number) => {
            if(dimension) {
              const dimensionInfo: Idimension = dimensions[ dimension.dimension ]

              let min = dimensionInfo.min ? dimensionInfo.min.toFixed(0) : 'No min',
                max = dimensionInfo.max ? dimensionInfo.max.toFixed(0) : 'No max',
                // median = dimensionInfo.median ? dimensionInfo.median.toFixed(0) : 'No mean',
                value = +dimension.value > -1 ? (+dimension.value).toFixed(1) : 'No data'

              // TODO: Use better logic
              const valueNumber = +dimension.value || 0,
                maxNumber = dimensionInfo.max ? +dimensionInfo.max : valueNumber

              return (
                <div key={ i }>
                  <div className="dimension-title">
                    { dimension.dimension }
                  </div>
                  <div className="dimension-value-container">
                    <div className="dimension-value-bar" style={{ backgroundColor: node.color, width: (100 * valueNumber/maxNumber) + '%' }}></div>
                    <div className="dimension-min">{ min }</div>
                    {/* <div className="dimension-mean">{ median }</div> */}
                    <div className="dimension-value">{ value }</div>
                    <div className="dimension-max">{ max }</div>
                  </div>
                </div>
              )
            }
          })
        }

      </div>
    </div>
  )
}

export default SelectionDimensions;
