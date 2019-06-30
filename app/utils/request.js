import axios from 'axios';

export function request(url, options) {
  const config = {
    method: 'GET',
    ...options,
  };
  const errors = [];

  if (!url) {
    errors.push('url');
  }

  if (
    !config.payload &&
    (config.method !== 'GET' && config.method !== 'DELETE')
  ) {
    errors.push('payload');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...config.headers,
  };
  /*
  return fetch(url, params).then(async response => {
    const contentType = response.headers.get('content-type');

    if (response.status > 299) {
      throw new Error(response.statusText);
    } else {
      if (contentType && contentType.includes('application/json')) {
        console.log('test', response.json());
        return response.json();
      }

      return response.text();
    }
  }); */

  return axios({
    url,
    headers,
    ...options,
  });
}
