<template>
    <div>
        <router-link :to="{name: 'addArticle'}" class="btn btn-primary">Ajout Article</router-link>
    
        <div v-if="isLoading">
            <h2> Loading .... </h2>
        </div>
        <div v-else>
            <h2 class="text-center"> Liste des articles </h2>
        <table class="table" id="example">
            <thead>
            <tr>
          <th>Référence</th>  
          <th>Désignation</th>  
          <th>Marque</th>  
          <th>Prix</th>
          <th>Quantité</th> 
          <th>Sous Catégorie</th>
          <th>Image</th> 
          <th>Actions</th>
        </tr>
            </thead>
            <tbody>
            <tr v-for="p in Articles" :key="p.id">
                <td>{{p.reference}}</td>  
                <td>{{p.designation}}</td>  
                <td>{{p.marque}}</td> 
                <td>{{p.prix}}</td>
                <td>{{p.qtestock}}</td>
                <td>{{p.scategories.nomscategorie}}</td>
                <td><img :src="p.imageart" :alt=p.designation width="100" /></td>
                <td>
                  <router-link :to="{name: 'editArticle', params: { id: p.id }}" class="btn btn-success">Modifier</router-link>
                  <button @click.prevent="deleteArticle(p.id)" class="btn btn-danger">Supprimer</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div> 
</template>
 
<script setup>
import axios from "../config/axios.js";

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

import { ref, onMounted } from 'vue';

const Articles = ref([]);

const isLoading = ref(true);

 onMounted(() => {
            getArticles();
            }
);

const getArticles=()=>{
                  axios
                .get('/api/articles/')
                .then(response => { 
                    isLoading.value = false;                              
                                 Articles.value = response.data;
                                 $(function() {$('#example').DataTable();});
                });   
            }

const deleteArticle=(id)=> { 
                 if (window.confirm("Etes-vous sûr de vouloir supprimer ?")) {
                   axios
                    .delete(`/api/articles/${id}`)
                    .then(() => {
                        let i = Articles.value.map(data => data.id).indexOf(id);
                        Articles.value.splice(i, 1)
                    })
                    .catch(error => {
                                console.log(error)
                            });
                 }         
            }
            
</script>
