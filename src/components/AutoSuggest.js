import React, { Component } from "react";
import Autosuggest from 'react-autosuggest';
import '../css/autosuggest.css'
import municipalityMapping from "../data_set/municipalityIdMapping";


var municipalities = [];

Object.entries(municipalityMapping).forEach(([key, value]) => {
    municipalities.push( {value: key, name: value} );
});

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
 const inputValue = value.trim().toLowerCase();
 const inputLength = inputValue.length;


 return inputLength === 0 ? [] : municipalities.filter(muni =>
    muni.name.toLowerCase().slice(0, inputLength) === inputValue
 );
};


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
 <div onClick={this.props.printMuniId(suggestion.key)}>
   {suggestion.name}
 </div>
);

class AutoSuggest extends React.Component {
 constructor() {
   super();

   // Autosuggest is a controlled component.
   // This means that you need to provide an input value
   // and an onChange handler that updates this value (see below).
   // Suggestions also need to be provided to the Autosuggest,
   // and they are initially empty because the Autosuggest is closed.
   this.state = {
     value: '',
     suggestions: []
   };
 }

 onChange = (event, { newValue }) => {
   this.setState({
     value: newValue
   });
 };

 // Autosuggest will call this function every time you need to update suggestions.
 // You already implemented this logic above, so just use it.
 onSuggestionsFetchRequested = ({ value }) => {
   this.setState({
     suggestions: getSuggestions(value)
   });
 };

 // Autosuggest will call this function every time you need to clear suggestions.
 onSuggestionsClearRequested = () => {
   this.setState({
     suggestions: []
   });
 };

 render() {
   const { value, suggestions } = this.state;

   var  printMuniId = (muniId) => {
    console.log(muniId);
    // this.setState({ color: newColor });
}

   // Autosuggest will pass through all these props to the input.
   const inputProps = {
     placeholder: 'Municipality',
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