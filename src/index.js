import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from  'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';
import './index.css';

// curried form of function logger(obj, next, action)
const logger = ({dispatch, getState}) => (next) => (action) => {
  if(typeof action !== 'function'){
  console.log('ACTION TYPE=', action.type);
  }
  next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   if(typeof action === 'function') {
//     action(dispatch);
//     return;
//   }
//   // console.log('ACTION TYPE=', action.type);
//   next(action);
// }


const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('store', store);

// export const StoreContext = createContext();

// console.log(StoreContext);

// class Provider extends React.Component {
//   render(){
//     const { store } = this.props;
//     return(
//     <StoreContext.Provider value={store}>
//       {this.props.children}
//     </StoreContext.Provider>
//     )
//   }
// }
// console.log('BEFORE STATE', store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies: [{ name: `Superman `}]
// });

// console.log('AFTER STATE', store.getState());

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
