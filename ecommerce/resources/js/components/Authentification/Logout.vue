<template></template>

<script setup>
  import axios from "../config/axios.js"
  
  import { onMounted } from 'vue';

  import { useRouter } from 'vue-router';

  const router = useRouter() 

   const  handleLogout=async()=> { 
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
               if (user){await axios
                    .post('/api/auth/logout')
                    .then(response => (
                       localStorage.removeItem('user'),
                       router.push('/login')
                    ))
                    .catch(err => console.log(err))
                 }
               }
onMounted(async () => {
   await handleLogout()
});

</script>
