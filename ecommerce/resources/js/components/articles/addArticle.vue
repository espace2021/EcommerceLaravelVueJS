<template>
  <div>
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
        <div>
          
          <file-pond
            name="test"
            ref="pond"
            class-name="my-pond"
            label-idle="Drop files here..."
            allow-multiple="false"
            accepted-file-types="image/jpeg, image/png"
            v-bind:files="myFiles"
            v-on:init="handleFilePondInit"
            :server="serverOptions()"
          />

        </div>
      </div>

      <button type="submit" class="btn btn-block btn-primary">Ajouter Produit</button>
    </form>
  </div>
</template>

<script setup>
/*
En utilisant le préfixe : (liaison dynamique), vous indiquez à Vue.js 
d'évaluer la valeur de la propriété serverOptions comme une expression JavaScript plutôt que de considérer 
"serverOptions" comme une URL. Cela devrait résoudre l'erreur "405 (Method Not Allowed)" 
Avec () après serverOptions on appelle réellement la fonction serverOptions pour obtenir les options du serveur 
au lieu de simplement passer la référence de la fonction. 
*/
import { ref, onMounted } from 'vue';

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginImagePreview);

const myFiles = ref([]);

import axios from "../config/axios.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const Scategories = ref([]);

const getScategories = () => {
  axios.get('/api/scategories')
    .then(res => {
      Scategories.value = res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

onMounted(() => {
  getScategories();
});

const article = {
  reference: "",
  designation: "",
  marque: "",
  prix: "",
  qtestock: "",
  imageart: "",
  scategorieID: "",
};

const  ajouterproduit=()=>{
   console.log(article)
   axios.post("/api/articles",article)
        .then(() => {
              router.push('/articles')})
        .catch(error => {
           console.error("There was an error!", error);})
           }



const handleFilePondInit = () => {
  console.log('FilePond has initialized');
}

const serverOptions = () => { console.log('server pond');
  return {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const data = new FormData();
      
      data.append('file', file);
      data.append('upload_preset', 'Ecommerce_cloudinary');
      data.append('cloud_name', 'iset-sfax');
      data.append('public_id', file.name);

      axios.post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          article.imageart = data.url;
          load(data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          error('Upload failed');
          abort();
        });
    },
  };
};


</script>