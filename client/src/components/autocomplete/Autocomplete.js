import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

import Suggestion from "../suggestion/Suggestion";
import './Autocomplete.css';

export default function Autocomplete({names}) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    if (newValue !== value)
      setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    console.log(value);
    setSuggestions(getSuggestions(value));
    setValue(value);
  };

  const onSuggestionsClearRequested = () => {
    if (suggestions.length > 0)
      setSuggestions([]);
  } 

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : names.filter(p => p.slice(0, inputLength) === inputValue);
  };
  
  const getSuggestionValue = suggestion => suggestion;
  
  const renderSuggestion = suggestion => <Suggestion suggestion={suggestion} />;

  const onSuggestionSelected = (event, object) => {
    navigate(`/pokemon/${object.suggestion}`, { replace: false } );
  }

  const inputProps = {
    placeholder: "",
    value: value,
    onChange: onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      highlightFirstSuggestion={true}
    />
  )
}