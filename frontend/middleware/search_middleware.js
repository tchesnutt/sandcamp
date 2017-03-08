import { FETCH_SEARCH_RESULTS,
  recieveSearchResults } from '../actions/search_actions';
import { searchQuery } from '../util/search_api_util';


const SearchMiddleware = ( { dispatch } ) => next => action => {
  const recieveSearch = albums => dispatch(recieveSearchResults(albums))
  switch ( action.type ) {
  case FETCH_SEARCH_RESULTS:
    searchQuery( action.query, recieveSearch);
    return next( action );
  default:
    return next( action );
  }
};

export default SearchMiddleware;
