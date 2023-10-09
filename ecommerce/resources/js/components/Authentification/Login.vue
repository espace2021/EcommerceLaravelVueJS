<template>
    <div class="col-md-8">
      <div class="card card-container">
       <h2>Connexion</h2>  
        <form @submit.prevent="handleLogin">
        
           
            <div class="form-group">
          
              <input placeholder="email" type="email" class="form-control" v-model="user.email"/>
             
            </div>
            <div class="form-group">
            
              <input placeholder="password" type="password" class="form-control" v-model="user.password"/>
             
            </div>
           
            <div class="form-group">
              <button class="btn btn-primary btn-block">
                     Valider
              </button>
         
          </div>
        </form>
  
       
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "../config/axios.js"
  import { useRouter } from 'vue-router';
  const router = useRouter() 

      let  user= {}

    const   handleLogin=async()=> { 
                 await axios
                      .post('/api/auth/login', user)
                      .then(response => (
                          localStorage.setItem('user', JSON.stringify(response.data)),
                         router.push({ name: 'profile' })
                      ))
                      .catch(err => {console.log(err);alert("Erreur !") })
                   }
  
  </script>
  