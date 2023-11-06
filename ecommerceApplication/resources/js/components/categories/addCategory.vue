<template>
    <div>
        <h3 class="text-center">Create Category</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="addCategorie">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="categorie.nomcategorie">
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="text" class="form-control" v-model="categorie.imagecategorie">
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>
 
<script setup>
import axios from "../config/axios.js";
import { useRouter } from 'vue-router';
const router = useRouter() 
let  categorie= {nomcategorie:'',imagecategorie:''}
       
  const addCategorie=async ()=> {
               await axios
                    .post('/api/categories', categorie)
                    .then(() => (
                        router.push({ name: 'homeCategories' })
                    ))
                    .catch(err => console.log(err))
                }
    
</script>