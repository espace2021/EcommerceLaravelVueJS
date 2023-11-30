<template>

   
            <div class="card">
        <DataView :value="articles" >
            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ item.designation }}</div>
                                   
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ item.reference }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">{{ item.prix }} TND</span>
                                    <Button icon="pi pi-shopping-cart" rounded :disabled="item.qtestock > 1" @click="addToCart(item)"></Button>  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>  
    
    </template>
  
  <script setup>
import DataView from 'primevue/dataview';
import Button from 'primevue/button'   
    import axios from "../config/axios.js";
    import store from '../../store'

import { ref, onMounted } from 'vue';

const articles = ref([]);



 onMounted(() => {
            getArticles();
                     
            }
);

const getArticles=()=>{
                
           axios.get('/api/articles/')
                  .then(response => { 
                                 articles.value = response.data;
                               
                });   
            }
          
const    addToCart=(prod)=> {
  
              store.commit("addCart", {product:prod,qty:1});
               }     

    
        
  </script>
  