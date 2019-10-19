import React from 'react'
import Autosuggest from 'react-autosuggest'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import './inputWithSuggestionStyle.css'

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  class InputWithSuggestion extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        value: '',
        suggestions: [],
        languages: this.props.list
      };    
    }
  
    componentWillReceiveProps(nextProps){
        if(nextProps.list.length > 0)   
            this.setState({ languages: nextProps.list})
    }

    getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
            return [];
        }
        
        const regex = new RegExp('^' + escapedValue, 'i');
        
        return this.state.languages.filter(language => regex.test(language.name));
    }
    
    getSuggestionValue(suggestion) {
        return suggestion.name;
    }
    
    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
      this.props.changeNome(newValue)
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "nome do equipamento",
        value,
        onChange: this.onChange
      };
  
      return (
        <FormControl margin="normal" required fullWidth className={this.props.typeClass}>
            <InputLabel htmlFor={this.props.name}>{this.props.label}</InputLabel>
            <Autosuggest 
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
        </FormControl>
      );
    }
  }

export default InputWithSuggestion