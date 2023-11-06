<template>
     
      <div class="row">
          <div class="col-md-12" style="display:flex;flex-wrap:wrap;justify-content:center">
            <div class="card" style="width: 18rem;margin:12px" v-for="prod in Articles" :key="prod.id">
              <img class="card-img-top" :src="prod.imageart" :alt=prod.designation  width="70">
              <div class="card-body">
                  <h5 class="card-title">{{ prod.designation }}</h5>
                  <p class="card-text">{{ prod.marque }}</p>
              </div>
              <div style="text-align:center">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">Prix : {{ prod.prix }} TND</li>
                  </ul>
                  <button class="btn btn-warning" @click="addToCart(prod)" v-if="prod.qtestock>1">Add to Cart</button>
                  <button class="btn btn-default" v-if="prod.qtestock<=1">OUT OF SOLD</button>
              </div>
            </div>  
          </div>
      </div>
  </template>
  
  <script setup>
    import axios from "../config/axios.js";
    import store from '../../store'

import { ref, onMounted } from 'vue';

const Articles = ref([]);

 onMounted(() => {
            getArticles();
            }
);

const getArticles=()=>{
                  axios
                .get('/api/articles/')
                .then(response => { 
                                 Articles.value = response.data;
                                 
                });   
            }
          
const    addToCart=(prod)=> {
  
              store.commit("addCart", {product:prod,qty:1});
               }     

  
     
        
  </script>
  