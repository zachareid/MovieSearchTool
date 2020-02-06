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
            <div className="movie-title">{this.props.title}  </div>
            <div className="poster" > <img  alt="movie poster" src={'http://image.tmdb.org/t/p/w185/' + this.props.imgfile}></img></div>
            <div className="movie-subtext" >
              <b>Release date:</b> {this.props.release} <br />
              <b>Budget:</b> ${this.props.budget} <br />
              <b>Run-time:</b> {this.props.runtime} minutes </div> <br />
            <div className="summary-header">Summary </div>
            <div className="summary">{this.props.summary} </div>
            <br />
            <br />
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
            runtime: "",
            imgfile: ""
    };

      // Bind `this` context to functions of the class
      // allows 'this' to work in the callbacks
      this.onChange = this.onChange.bind(this);
      this.retrieveMovie = this.retrieveMovie.bind(this);
      this.getItemValue = this.getItemValue.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.retrieveMovieList = this.retrieveMovieList.bind(this);
  }

  // This call retrieves the list of movies for a given search query
  // It sets the autocompleteData to the retrieved titles
  //
  // Arguments:
  //    searchText -- Stringto match against movies
  retrieveMovieList(searchText){
    axios.get(`http://localhost:5000/getMovies?movieName=${searchText}`)
    .then(res => {
      this.setState({
        autocompleteData: res.data['titles']
      });
    })
    .catch(error => {
      console.log("Error: " + error.response);
    });
  }

  // This function is passed to the Autocomplete Component
  // It is the callback that gets called whenever the text
  // inside of the autocomplete input changes. It takes the
  // input text and uses it to retrieve the Movie list to
  // populate the dropdown text
  //
  //Arguments
  //    e -- abstract event
  onChange(e){
    this.setState({
            value: e.target.value
    });
    this.retrieveMovieList(e.target.value);
  }

  // This function is passed to the Autocomplete component
  // It is the callback that gets called whenever an option
  // in the autocomplete list gets selected. It takes a value
  // from getItemValue and uses it to retrieve details about
  // a movie. The Value in this case is the movieId, so that it
  // can make a direct call to get information about the movie.
  // It then populates the state with the details about the selected movie
  //
  // Arguments
  //    val -- TMDB id for the selected movie
  retrieveMovie(val){
    axios.get(`http://localhost:5000/getMovie?movieId=${val}`)
      .then(res => {
        this.setState({
            value: "",
            autocompleteData: [],
            title: res.data["title"],
            release: res.data["release"],
            budget: res.data["budget"],
            runtime: res.data["runtime"],
            summary: res.data["summary"],
            imgfile: res.data["imgfile"]
        });
      })
      .catch(error => {
        console.log("Error: " + error.response)
      });
    }

  // This function is passed to the Autocomplete component. It is the
  // for rendering a specific item in the autocomplete list. It changes
  // the color of the items in the dropdown if they are hovered over
  //
  // Arguments
  //    item -- item to be rendered
  //    isHighlighted -- boolean for if the cursor is over the item
  //
  // Returns
  //    HTML div for each item
  renderItem(item, isHighlighted){
    return (
            <div className="item" key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>
        );
  }

  // This function is passed to the autocomplete component. In this case,
  // I stored the TMDB movie ID as the id of each item in the autocompleteData,
  // so that when it's selected, it can query some data about it.
  //
  // Arguments
  //    item -- item to acquire the value of
  //
  // Returns
  //    id -- id of the item
  getItemValue(item){
    return `${item.id}`;
  }

  render() {
    return (
          <div>
            <div className="app-header">
                <h1> Movie Search Tool </h1>
            </div>
            <br />
            <br />
            <br />
            <div className="autocomplete-header"> Search for movies based on popularity </div>
            <div className="autocomplete">
                <Autocomplete
                    getItemValue={this.getItemValue}
                    items={this.state.autocompleteData}
                    renderItem={this.renderItem}
                    value={this.state.value}
                    onChange={this.onChange}
                    onSelect={this.retrieveMovie}
                />
            </div>
            <div>
                <Results
                    title={this.state.title}
                    release={this.state.release}
                    budget={this.state.budget}
                    runtime={this.state.runtime}
                    summary={this.state.summary}
                    imgfile={this.state.imgfile}
                    />
            </div>
          </div>
    );
  }
}
