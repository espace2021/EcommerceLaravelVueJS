<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{ user.name }}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Created At:</strong> {{ user.created_at }}
      </p>
      <p>
        <strong>Email:</strong> {{ user.email }}
      </p>
    </div>
  </template>
  
  <script setup>
import axios from "../config/axios.js";

import { ref, onMounted } from 'vue';

const user = ref({}); 
const currentUser=async()=> {
        let userStorage = JSON.parse(localStorage.getItem('user'));
        console.log(userStorage.token)
        await axios.get('/api/auth/user-profile', { headers: { Authorization: 'Bearer ' + userStorage.token }})
                      .then(response => 
                         {
                          user.value=response.data;
                         } 
                      )
                      .catch(err => {console.log(err);alert("Erreur !")})
                  }
                  
onMounted(() => {
    currentUser()
});
  </script>
  