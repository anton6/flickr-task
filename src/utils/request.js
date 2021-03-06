import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

/**
 * Parses the JSON returned by a network request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 */
function checkStatus(response) {
  if (response.ok || (response.status >= 200 && response.status < 300)) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 */
export function requestJsonp(url, options) {
  return fetchJsonp(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
