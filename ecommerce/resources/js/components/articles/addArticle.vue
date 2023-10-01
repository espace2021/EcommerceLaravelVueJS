<template lang="">
    <form @submit.prevent="ajouterproduit">
     
       <div class="form-group">
       <input type="text" class="form-control" placeholder="reference" v-model="article.reference">
     </div>
     <div class="form-group">
       <input type="text" class="form-control" placeholder="designation" v-model="article.designation">
     </div>
     <div class="form-group">
       <input type="text" class="form-control" placeholder="marque" v-model="article.marque">
     </div>
    <div class="form-group">
       <input type="number" class="form-control" placeholder="prix" v-model="article.prix">
     </div>
    <div class="form-group">
       <input type="number" class="form-control" placeholder="qtestock" v-model="article.qtestock">
     </div>
    <div class="form-group">
       Sous Catégories<select class="form-control" v-model="article.scategorieID">
          <option v-for="sc in Scategories" :key="sc.id" :value=sc.id>{{sc.nomscategorie}}</option>
       </select>  
     </div>
     <div class="form-group">
        <input type="text" class="form-control" placeholder="image" v-model="article.imageart">
    </div>
    <button type="submit" class="btn btn-block btn-primary">Ajouter Produit</button>
   </form>
   
   </template>
   
    
   <script setup>
   import axios from 'axios';
   import { useRouter } from 'vue-router';
   const router = useRouter() 

import { ref, onMounted } from 'vue';

const Scategories = ref([]);

 onMounted(() => {
    getscategories();
            }
);

const getscategories=()=>{
          
    axios.get('http://localhost:8000/api/scategories').then(res => {
        Scategories.value = res.data;
            }).catch(error => {
                console.log(error)
            });

         }

let  article= {
               reference: "",
               designation: "",
               marque: "",
               prix: "",
               qtestock: "",
               imageart: "",
               scategorie:"",
       }
      
       
const  ajouterproduit=()=>{
   
          axios.post("http://localhost:8000/api/articles",article)
               .then(() => {
                     router.push('/articles')})
               .catch(error => {
                  console.error("There was an error!", error);})
                  }
             
   
   </script>
 
   