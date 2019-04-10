import React, { Component, PropTypes } from "react";

class Checkbox extends Component {
  state = {
    isChecked: true
  };

  toggleCheckboxChange = () => {
    const { label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    console.log("label", label);

    this.props.onIdChange({ids: this.props.id, checkValue: !this.state.isChecked });

  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          {label}
        </label>
      </div>
    );
  }
}

/*Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};*/

export default Checkbox;
