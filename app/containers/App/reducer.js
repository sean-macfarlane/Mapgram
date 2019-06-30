import { fromJS, List, Map } from 'immutable';

import {
  LOAD_PHOTOS_REQUEST,
  LOAD_PHOTOS_SUCCESS,
  LOAD_PHOTOS_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  error: false,
  loading: false,
  photos: {
    loading: false,
    data: false,
  },
});

function appReducer(currentState = initialState, action) {
  const state = currentState.setIn(['error'], false);

  switch (action.type) {
    case LOAD_PHOTOS_REQUEST:
      return state.setIn(['photos', 'loading'], true);

    case LOAD_PHOTOS_SUCCESS:
      console.log(action);
      return state
        .setIn(['photos', 'loading'], false)
        .updateIn(
          ['photos', 'data'],
          currentValue => action.result || currentValue,
        );

    case LOAD_PHOTOS_FAILURE:
      return state
        .setIn(['photos', 'loading'], false)
        .set('error', action.error);

    default:
      return state;
  }
}

export default appReducer;
