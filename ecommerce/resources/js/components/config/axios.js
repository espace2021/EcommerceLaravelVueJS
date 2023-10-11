/*
//cas sans refresh token

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; 

export default axios;

*/

// Cas de refresh token

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000';

//simple request sans header

export function getAxiosInstance() {

  if (axios === null) {

    axios = axios.create({

      baseURL: axios.defaults.baseURL,

    });

  }

}

// Add a request interceptor

axios.interceptors.request.use(

  config => {

     const token=  JSON.parse(localStorage.getItem('user')).token;
     console.log(token)
      if (token) {

          config.headers['Authorization'] = 'Bearer ' + token;

      }

      return config;

  },

  error => {

      Promise.reject(error)

  });

 
  //Response interceptor

axios.interceptors.response.use((response) => {
console.log(response)
  return response

},

function (error) {

  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {

 
      originalRequest._retry = true;

      let user = JSON.parse(localStorage.getItem('user'));
      axios.interceptors.request.use(
      (config) => {
      if (user.token) {
           config.headers['Authorization'] = `Bearer ${user.token}`;
        }
       return config;
       },
       (error) => {
       return Promise.reject(error);
       }
       ); 
      if (user){

         return axios

        .post('http://localhost:8000/api/auth/refresh/')
          .then(res => { console.log(res)

              if (res.access_token) { 

                  // 1) put tokens to LocalStorage

                 localStorage.setItem('user', JSON.stringify(response.data).access_token)
   
                 // 2) Change Authorization header

                  axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;

 
                  // 3) return originalRequest object with Axios.

                  return axios(originalRequest);

              }

          })

        }      

  }

}

);

export default axios;