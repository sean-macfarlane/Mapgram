import {
  LOAD_PHOTOS_REQUEST,
  LOAD_PHOTOS_SUCCESS,
  LOAD_PHOTOS_FAILURE,
} from './constants';

export const loadPhotosRequest = (query, page) => ({
  type: LOAD_PHOTOS_REQUEST,
  query,
  page,
});

export const loadPhotosSuccess = result => ({
  type: LOAD_PHOTOS_SUCCESS,
  result,
});

export const loadPhotosFailure = error => ({
  type: LOAD_PHOTOS_FAILURE,
  error,
});
