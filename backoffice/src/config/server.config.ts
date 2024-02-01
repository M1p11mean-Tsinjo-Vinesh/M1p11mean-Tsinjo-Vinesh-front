import { showError } from '../components/services/sweet-alert.util';
import config from  "./server.config.json";
import {HttpError, HttpResponse, ListResponse} from "./interfaces";

/**
 * build image url from webServerConfig
 * @param path
 */
export const imageUrl = (path: string) => config.webServerUrl.concat(path);

/**
 * build base url from backendConfig
 * @param url
 */
export const baseUrl = (url: string) => config.backendUrl.concat(url);


/**
 * this fonction is the function for error handling when subscribing
 * and http call
 *
 * example:
 * this.http.get(url).subscribe({
 *   next: ...,
 *   error: onerror()
 * })
 */
export const onerror = () => {
  return (err : HttpError) => {
    // message from backend.
    let message = err.error.error.message;
    if (err.error && message) {
      showError(message);
    }
    else {
      // message from http error such as "No network", etc ...
      showError(err.message);
    }
  }
}


/**
 * read the list result from http response
 * during a fetchAll API call
 * @param data
 */
export const getListAnswer = <T> (data: any) => {
  return (data as HttpResponse<ListResponse<T>>).data;
}


/**
 * read the list of elements from the list response
 * during a fetchAll API call
 * @param data
 */
export const getElements = <T> (data: any) => getListAnswer<T>(data).elements


/** get one element from http response
 *  usually when you fetch by id or when you perform update
 * @param data is the response from http
 */
export const getEltAnswer = <T> (data: any) => {
  return (data as HttpResponse<T>).data;
}

