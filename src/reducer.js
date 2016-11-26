import { combineReducers } from 'redux';


const counterStore = (state = 1, action) => {
  switch (action.type) {
    case 'NEXT':
      return state + 1;
    case 'PREVIOUS':
      return state - 1;
    default:
      return state;
  }
};


const routerDefaultState = {
  pathname: __CLIENT__ && location.pathname,
  search: __CLIENT__ && location.search,
  hash: __CLIENT__ && location.hash
};

const routerStore = (state = routerDefaultState, action) => {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      return action.router;
    default:
      return state;
  }
};

const userDefault = {};

const user = (state = userDefault, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    default:
      return state;
  }
}


export default combineReducers({
  counter: counterStore,
  router: routerStore,
  user
});
