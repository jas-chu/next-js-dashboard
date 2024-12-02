import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Custom instance function to handle requests
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  // Create a cancel token source for the request
  const source = axios.CancelToken.source();

  // Get the token from localStorage
  const token = localStorage.getItem('auth_token');

  // If the token exists, attach it to the request headers
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Make the API request with the cancel token and return the data from the response
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  // Attach the cancel function to the promise (allowing manual cancellation of the request)
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export default customInstance;

// Type for error handling in case of API request failure
export type ErrorType<Error> = AxiosError<Error>;
