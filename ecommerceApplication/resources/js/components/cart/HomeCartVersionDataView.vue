<template>

<div class="row">
         
           
            <div class="card">
        <DataView :value="articles" :layout="layout" :paginator="true" :rows="20" :lazy="true" @page="onPage($event)">
            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <img width="200" class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="slotProps.data.imageart" :alt="slotProps.data.designation" />
                   
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ slotProps.data.designation }}</div>
                                   
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ slotProps.data.reference }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">{{ slotProps.data.prix }} TND</span>
                                    <Button icon="pi pi-shopping-cart" rounded :disabled="slotProps.data.qtestock > 1" @click="addToCart(slotProps.data)"></Button>  </div>
                            </div>
                        </div>
                    </div>
            
            </template>
        </DataView>
    </div>  
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


const  onPage=(event)=>{
    getArticles() //load the data between (event.first) and (event.first + event.rows) from a remote datasource
        }
        
  </script>
  