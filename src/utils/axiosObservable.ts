import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { axiosInstance } from "./axios";

export const axiosObservable = <T>(
  config: AxiosRequestConfig
): Observable<T> => {
  return new Observable<any>((subscriber) => {
    axiosInstance(config)
      .then((response) => {
        subscriber.next(response);
        subscriber.complete();
      })
      .catch((error) => {
        subscriber.error(error);
      });
  }).pipe(
    // Automatically extract data from Axios responses
    map((response) => response),
    // Handle errors gracefully and emit a default fallback value
  );
};
