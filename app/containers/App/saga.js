import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { request } from 'utils/request';
import { UNSPLASH_ACCESS_KEY } from 'constants/index';

import { loadPhotosSuccess, loadPhotosFailure } from './actions';
import { LOAD_PHOTOS_REQUEST } from './constants';

export default function* watchGlobalActions() {
  yield takeEvery(LOAD_PHOTOS_REQUEST, loadPhotosSaga);
}

/* Load Photos saga start */

export function* loadPhotosSaga(action) {
  try {
    const url = `https://api.unsplash.com/search/photos/?query=${
      action.query
    }&page=${action.page || 1}&client_id=${UNSPLASH_ACCESS_KEY}`;

    const response = yield call(request, url);

    const successResult = yield put(
      loadPhotosSuccess(fromJS(response && response.data))
    );

    return successResult;
  } catch (error) {
    const failureResult = yield put(loadPhotosFailure(`Failed to load photos`));

    return failureResult;
  }
}
