<template>
    <div>
      <form @submit.prevent="modifierproduit">
       
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
            :server="serverOptions()"
          />
  
          </div>
        </div>
  
        <button type="submit" class="btn btn-block btn-primary">Modifier Produit</button>
      </form>
    </div>
  </template>
  
  <script setup>
/*
Explication :
Les données du composant sont gérées à l'aide de l'API Composition de Vue.js (Vue 3). Les propriétés sont déclarées à l'aide de ref. Par exemple, article est une référence à un objet qui stocke les données du produit, et myFiles est une référence à un tableau qui stocke les fichiers téléchargés.
Leurs utilisations requiert .value
La fonction handleFilePondInit est utilisée pour initialiser FilePond. Si le produit a déjà une image (dans la base de données), elle ajoute cette image à la liste myFiles, ce qui permet à FilePond de l'afficher. A la place de l’appeler dans init de filepond il faut l’appeler dans onMounted après fetchArticle pour pouvoir récupérer la valeur de l’image.
La fonction serverOptions contient les options de configuration pour FilePond. Elle spécifie comment les fichiers doivent être traités lors du téléchargement. Les options comprennent la fonction load (qui n’existait pas dans l’ajout de l’article et ajoutée ici dans l’edit), qui permet de charger une image depuis une URL (récupérée de la BD et mise dans myFiles), et la fonction process, qui gère le téléchargement réel vers le service Cloudinary.


*/
  import { ref, onMounted } from 'vue';
  
  import vueFilePond from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
  
  const FilePond = vueFilePond(FilePondPluginImagePreview);
  
  import axios from "../config/axios.js";

  import { useRouter,useRoute } from 'vue-router';
    const router = useRouter() ;
    const route = useRoute();
  
  const Scategories = ref([]);
  
  const article = ref({});

const fetchArticle= async()=> {
    
        await axios
                .get(`/api/articles/${route.params.id}`)
                .then((res) => {
                    article.value = res.data;
                    })
                .catch((err) => {console.error(err)})  
     
    }

let  myFiles = ref([]);

  const getScategories = async() => {
    await axios.get('/api/scategories')
      .then(res => {
        Scategories.value = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  onMounted(async() => {
   await getScategories();
   await fetchArticle();
   await handleFilePondInit();
  });
  
   
   
  const handleFilePondInit = async() => {
     
  if (article.value.imageart) {
  
    myFiles.value = [
  {
    source: article.value.imageart,
    options: { type: 'local' }
  }
  ]
 }
  }
  
  const serverOptions = () => { 
    return {
        load: (source, load, error, progress, abort, headers) => {
                    var myRequest = new Request(source);
                    fetch(myRequest).then(function(response) {
                      response.blob().then(function(myBlob) {
                        load(myBlob);
                      });
                    });
                  },
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
            article.value.imageart = data.url;
            console.log(article.value.imageart)
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
  
  const  modifierproduit=()=>{
     console.log(article.value)
     axios.put(`/api/articles/${route.params.id}`,article.value)
          .then(() => {
                router.push('/articles')})
          .catch(error => {
             console.error("There was an error!", error);})
}

  </script>