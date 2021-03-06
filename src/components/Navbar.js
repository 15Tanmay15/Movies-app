import React from 'react';
import { data } from '../data';
import { addMovieToList, handleMovieSearch } from '../actions';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  }

handleSearch = (searchText) => {
  // const { searchText } = this.state;
  // if(searchText!=''){
  this.props.dispatch(handleMovieSearch(searchText));
  // }
}


handleChange = (e) => {
  this.setState({
    searchText: e.target.value
  })
}
  render () {
    const { showSearchResults, results: movie } = this.props.search;
    return(
      <div className="nav">
      <div className="search-container">
        {/* <input onChange={this.handleChange}/> */}
        {<input onChange={(e)=>{this.handleSearch(e.target.value)}}/>}
        <button id="search-btn" onClick={this.handleSearch}>
        <i class="fas fa-search"></i>
        </button>
        {/* {console.log(movie)} */}
        {showSearchResults && movie.Response != 'False' && (
          <div className="search-results">
            <div className="search-result">
              <img src={movie.Poster} alt="search-pic" />
              <div className="movie-info">
                <span>{movie.Title}</span>
                <button onClick={() => this.handleAddToMovies(movie)}>
                  Add to Movies
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
}

// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store)=><Navbar dispatch={store.dispatch} search={this.props.search} />}
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps({ search }) {
  return {
    search,
  };
}

export default connect(mapStateToProps)(Navbar);
