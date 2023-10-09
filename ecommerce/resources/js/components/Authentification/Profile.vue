<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{ name }}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Created At:</strong> {{ created_at }}
      </p>
      <p>
        <strong>Email:</strong> {{ email }}
      </p>
    </div>
  </template>
  
  <script setup>
import axios from "../config/axios.js";

import { ref, onMounted } from 'vue';

const name = ref({});
const email = ref({});
const created_at = ref({}); 

const currentUser=async()=> {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user.token)
        await axios.get('/api/auth/user-profile', { headers: { Authorization: 'Bearer ' + user.token }})
                      .then(response => 
                         {
                           // user=response.data;
                           
                           name.value=response.data.name
                           email.value=response.data.email
                           created_at.value=response.data.created_at
                         } 
                      )
                      .catch(err => {console.log(err);alert("Erreur !")})
                  }
                  
onMounted(() => {
    currentUser()
});
  </script>
  