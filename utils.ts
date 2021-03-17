// From https://github.com/axios/axios#handling-errors, which is by Matt Zabriskie and is under the MIT license
export function logAxiosError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('error.response.data');
    console.error(error.response.data);
    console.log('error.response.status');
    console.error(error.response.status);
    console.log('error.response.headers');
    console.error(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('error.request');
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  console.error(error.config);
}
