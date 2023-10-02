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
      <div>
    <file-pond
      ref="filepond"
      name="file"
      :files="files"
      label-idle="Glissez et déposez votre fichier ou <span class='filepond--label-action'>cliquez pour parcourir</span>"
      allow-multiple="false"
      :server="serverOptions"
      @processfile="handleFileUpload"
    ></file-pond>
    <img :src="uploadedImage" v-if="uploadedImage" alt="Uploaded Image" />
  </div>
    </div>
    <button type="submit" class="btn btn-block btn-primary">Ajouter Produit</button>
   </form>
   
   </template>
   
    
   <script setup>
import { ref, onMounted, computed } from 'vue';

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

let FilePond= vueFilePond(FilePondPluginImagePreview);

Vue.use(FilePond);

let files= ref([]);
let uploadedImage= ref("");

import { useCloudinary } from '../config/useCloudinary.js';

const { url, transformations } = useCloudinary(props.src)

import axios from "../config/axios.js";
   
import { useRouter } from 'vue-router';
const router = useRouter() 

const Scategories = ref([]);

 onMounted(() => {
    getscategories();
            }
);

const getscategories=()=>{
          
    axios.get('/api/scategories').then(res => {
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
   
          axios.post("/api/articles",article)
               .then(() => {
                     router.push('/articles')})
               .catch(error => {
                  console.error("There was an error!", error);})
                  }
             
const  handleFileUpload=()=> {
      uploadedImage.value = files.value[0].serverId;
    } 
    
    computed(() => {
     serverOptions=()=> {
      return {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
         url(
            file,
            {
              folder: "uploads",
            },
            (error, result) => {
              if (error) {
                console.error(error);
                error("Upload failed");
              } else {
                load(result.secure_url);
              }
            },
            {
              resource_type: "auto",
            }
          );
        }
      }
 
  }   
})

   </script>
 
   