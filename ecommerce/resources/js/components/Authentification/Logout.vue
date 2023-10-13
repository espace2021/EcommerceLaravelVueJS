<template></template>

<script setup>
  import axios from "../config/axios.js"
  
  import { onMounted } from 'vue';

  import { useRouter } from 'vue-router';

  const router = useRouter() 

   const  handleLogout=async()=> { 
               let user = JSON.parse(localStorage.getItem('user'));
               console.log(user)

             /*  axios.interceptors.request.use(
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
                */ 
                try {
        await axios.post('/api/auth/logout', null, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        localStorage.removeItem('user');
        router.push('/login');
    } catch (error) {
        console.log(error);
    }
                 
               }
onMounted(async () => {
   await handleLogout()
});

</script>
