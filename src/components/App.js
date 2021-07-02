import React from 'react';
import { data as moviesList} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, SetShowFavourites } from '../actions';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount (){
    // const { store } = this.props;
    // store.subscribe(() => {
    //   this.forceUpdate();
    // })
    // // make api call
    // // dispatch action
    // store.dispatch(addMovies(moviesList));
    this.props.dispatch(addMovies(moviesList));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      // found the movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(SetShowFavourites(val))
  }
  render() 
  {
    const { movies, search } = this.props;
    const { list, showFavourites = [], favourites = [] } = movies;
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search = {search}/>
        <div className="main">
          <div className="tabs">
            <div
            className={`tab ${showFavourites ? '': 'active-tabs'}`} onClick = {()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs': ''}`} onClick = {()=>this.onChangeTab(true)}>Favourites</div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard movie = {movie}
              key={`movies-${index}`}
              dispatch = {this.props.dispatch}
              isFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
              {displayMovies.length === 0 ? <div className="no-movies">No movies to show! </div> : null}
        </div>
      </div>
    );
  }
}


// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store)=><App store={store} />}
//       </StoreContext.Consumer>
//     )
//   }
// }

function callback (state){
  return {
    movies: state.movies,
    search: state.search
  }
};

const connectedAppComponent = connect(callback)(App)
export default connectedAppComponent;
