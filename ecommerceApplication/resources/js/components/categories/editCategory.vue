<template>
    <div>
        <h3 class="text-center">Edit Category</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="updateCategorie">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="categorie.nomcategorie">
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input type="text" class="form-control" v-model="categorie.imagecategorie">
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>
 

<script setup>
import axios from "../config/axios.js";
import { useRouter,useRoute } from 'vue-router';
const router = useRouter() ;
const route = useRoute();
import { ref, onMounted } from 'vue';

const categorie = ref({});

const fetchCategorie= async()=> {
  
        await axios
                .get(`/categories/${route.params.id}`)
                .then((res) => {
                    categorie.value = res.data;
                })
                .catch((err) => {console.error(err)})  
     
    }

const updateCategorie= async()=> {
            await    axios
                    .patch(`/api/categories/${route.params.id}`, categorie.value)
                    .then(() => {
                        router.push({ name: 'homeCategories' });
                    })
                    .catch((err) => {console.error(err)})  
            }
onMounted(async() => {
           
       await fetchCategorie();
 
});
</script>