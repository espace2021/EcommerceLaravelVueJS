<template>
    <div class="col-md-12">
      <div class="card card-container">
          <h3> Si vous disposez déjà d'un compte passez à la connexion 
               <router-link to="/login" class="btn btn-warning">  Login </router-link>
          </h3>
     <h2>Enregistrement</h2>  
        <form @submit.prevent="handleRegister">
        
            <div class="form-group">
              <input placeholder="name" type="text" class="form-control" v-model="user.name"/>
              
            </div>
            <div class="form-group">
          
              <input placeholder="email" type="email" class="form-control" v-model="user.email"/>
             
            </div>
            <div class="form-group">
            
              <input placeholder="password" type="password" class="form-control" v-model="user.password"/>
             
            </div>
              <div class="form-group">
          
              <input placeholder="password_confirmation" type="password" class="form-control" v-model="user.password_confirmation"/>
             
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block">
                  S'enregistrer
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
        
    const  handleRegister=async()=> {
        await axios.post('/api/auth/register', user)
                  .then(response => (
                          localStorage.setItem('user', JSON.stringify(response.data)),
                          router.push({ name: 'login' })
                      ))
                      .catch(err => {console.log(err);alert("Erreur !") })
                   }
 
  </script>
  