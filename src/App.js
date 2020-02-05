import React from 'react';
import Autocomplete from 'react-autocomplete'
import axios from 'axios'

import './App.css';

class Results extends React.Component {
  render() {
    if (this.props.title === "")
    {
      return ""
    }
      return (
        <div className="app-body">
        <div className="movie-title">{this.props.title} <br /> </div>
        <div className="movie-subtext">
        <b>Release date:</b> {this.props.release} &nbsp; &nbsp; &nbsp; &nbsp;
        <b>Budget:</b> ${this.props.budget} &nbsp; &nbsp; &nbsp; &nbsp;
        <b>Run-time:</b> {this.props.runtime} minutes </div> <br />
        <div className="summary-header">Summary </div>
        <div className="summary">{this.props.summary} </div>
        </div>
      )
    }
}

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: "",
            autocompleteData: [],
            title: "",
            summary: "",
            release: "",
            budget: "",
            runtime: ""
        };

        // Bind `this` context to functions of the class
        // allows 'this' to work in the callbacks
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveMovieList = this.retrieveMovieList.bind(this);
    }

    retrieveMovieList(searchText){
        axios.get(`http://localhost:5000/getMovies?movieName=${searchText}`)
        //axios.get(`https://moviesearchzar.herokuapp.com/getMovies?movieName=${searchText}`)
        .then(res => {
          this.setState({
            autocompleteData: res.data['titles'] });
          });
        }

    onChange(e){
        this.setState({
            value: e.target.value
        });
        this.retrieveMovieList(e.target.value);
    }

    onSelect(val){
      axios.get(`http://localhost:5000/getMovie?movieId=${val}`)
    //axios.get(`https://moviesearchzar.herokuapp.com/getMovie?movieId=${val}`)
      .then(res => {
        this.setState({
            value: "",
            autocompleteData: [],
            title: res.data["title"],
            release: res.data["release"],
            budget: res.data["budget"],
            runtime: res.data["runtime"],
            summary: res.data["summary"]
        });
      });

    }

    renderItem(item, isHighlighted){
        return (
            <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>
        );
    }

    getItemValue(item){
        return `${item.id}`;
    }

    render() {
        return (
          <div>
            <div className="app-header">
                <h1> Movie Search Tool </h1>
            </div>
            <div className="autocomplete">
                <Autocomplete
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.value}
                    onChange={this.onChange}
                    onSelect={this.onSelect}
                />
            </div>
            <div>
                <Results
                    title={this.state.title}
                    release={this.state.release}
                    budget={this.state.budget}
                    runtime={this.state.runtime}
                    summary={this.state.summary}
                    />
            </div>
          </div>
        );
      }
}
