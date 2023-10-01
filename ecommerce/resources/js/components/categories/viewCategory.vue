<template>
    <div>
        <router-link :to="{name: 'createCategory'}" class="btn btn-primary">New Category</router-link>
        <h2 class="text-center">Categories List</h2>
 
        <table class="table">
            <thead>
            <tr>
               <th>Name</th>
                <th>Image</th>
                <!-- <th>Actions</th> -->
            </tr>
            </thead>
            <tbody>
            <tr v-for="categorie in categories" :key="categorie.id">
                <td>{{ categorie.nomcategorie }}</td>
                <td><img :src="categorie.imagecategorie" :alt=categorie.nomcategorie  width="100"/></td>
                <td>
                    <div class="btn-group" role="group">
                        <router-link :to="{name: 'editCategory', params: { id: categorie.id }}" class="btn btn-success">Edit</router-link>
                        <button class="btn btn-danger" @click="deleteCategorie(categorie.id)">Delete</button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
 
<script setup>
import axios from "../config/axios.js";

import { ref, onMounted } from 'vue';

const categories = ref([]);
/*
categories.value est une syntaxe spécifique à Vue.js pour accéder à la valeur réelle stockée 
dans une référence Vue. Lorsque vous utilisez ref pour créer une référence réactive, 
la valeur réelle est stockée dans la propriété .value de cette référence.
*/
const fetchCategories=async ()=> {
        await axios
        .get('/api/categories/')
            .then((response)=>{categories.value = response.data})
        .catch ((error) =>{
            console.error('Error fetching categories:', error);
        });
}

const deleteCategorie=async (id)=> {
                await axios
                    .delete(`/api/categories/${id}`)
                    .then(() => {
                        let i = categories.value.map(data => data.id).indexOf(id);
                        categories.value.splice(i, 1)
                    });
                }

onMounted(() => {
  fetchCategories();
});
</script>