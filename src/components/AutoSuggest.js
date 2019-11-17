import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import municipalityMapping from "../data_set/municipalityIdMapping";

var municipalities = [];

Object.entries(municipalityMapping).forEach(([key, value]) => {
  municipalities.push({ value: key, name: value });
});

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : municipalities.filter(
        muni => muni.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <div>{ suggestion.name }</div>;


class AutoSuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: []
    };
  }
  
  lookUpCommunityId = communityName => {
    Object.entries(municipalityMapping).forEach(([key, value]) => {
      if (value === communityName) {
        this.props.selectedMunicipalityId(key)
      }
    });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    if (method === "click" || method === "enter") {
      this.lookUpCommunityId(newValue);
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Find a Municipality",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutoSuggest;
