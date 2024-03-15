import axios from 'axios';
// for import by named export
export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
//  setting up an interceptor for the request that goes to the server 
 axios.interceptors.request.use(
    req => {
      showLoading();
      return req;
    },
    // if there is an error, the loading is hidden
    error => {
      hideLoading();
      return Promise.reject(error);
    }
  );
// responses from the server interceptor
  axios.interceptors.response.use(
    res => {
      hideLoading();
      return res;
    },
    error => {
      hideLoading();
      return Promise.reject(error);
    }
  );
};
// for import by default export
export default setLoadingInterceptor;