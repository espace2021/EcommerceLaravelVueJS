
<template>
<button type="button" :class="isEditing ? 'btn btn-success rounded-circle btn-sm' : 'btn btn-success btn-sm'" @click="visible = true">
  <span style="color: white">
    <i v-if="isEditing" class="pi pi-pencil" style="color: white"></i>
    <i v-else class="pi pi-plus" style="color: white"></i>
    {{ isEditing ? null : "Nouveau" }}
  </span>
</button>

    <div class="card flex justify-content-center">
      
        <Dialog
            v-model:visible="visible"
            modal
            :pt="{
                mask: {
                    style: 'backdrop-filter: blur(2px)'
                }
            }"
        >
            <template #container="{ closeCallback }">
                <div class="flex flex-column px-8 py-5 gap-4" style="border-radius: 12px; background-image: radial-gradient(circle at left top, var(--primary-200), var(--primary-300))">
                   
                    <div class="inline-flex flex-column gap-2">
                        <label for="nomscategorie" class="text-primary-50 font-semibold">Nom</label>
                        <InputText v-model="scategorie.nomscategorie" id="nomscategorie" class="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div class="inline-flex flex-column gap-2">
                        <label for="imagescategorie" class="text-primary-50 font-semibold">Image</label>
                        <InputText v-model="scategorie.imagescategorie" id="imagescategorie" class="bg-white-alpha-20 border-none p-3 text-primary-50" type="imagescategorie"></InputText>
                    </div>
                    <div class="inline-flex flex-column gap-2">
                       <label for="categorieID" class="text-primary-50 font-semibold">Categorie</label>
                        <select v-model="scategorie.categorieID" class="form-control">
                        <option v-for="c in categories" :key="c.id" :value=c.id style="color: black">{{c.nomcategorie}}</option>
                        </select>
                    </div> 
                    <div class="flex align-items-center gap-2">
                        <Button label="Enregistrer" @click="saveSCategory" text class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Annuler" @click="closeCallback" text class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";

import axios from "../config/axios.js";

import InputText from 'primevue/inputtext';

import Button from 'primevue/button';

import Dialog from 'primevue/dialog';

import 'primeicons/primeicons.css'

const visible = ref(false);

let scategorie=ref({id:'',nomscategorie:'',imagescategorie:'',categorieID:''});

const props = defineProps(['scategories','isEditing','scategorie'])

const saveSCategory = async () => {

  if (props.isEditing) {
    // Mettre à jour la scatégorie existante
    await axios
                    .put('/api/scategories/'+scategorie.value.id, scategorie.value)
                    .then(() => {
                        const scategoryIndex = props.scategories.findIndex((scategory) => scategory.id === scategorie.value.id);
                        if (scategoryIndex !== -1) {
                            props.scategories[scategoryIndex] = scategorie.value;
                        }
                     })
                    .catch(err => console.log(err))
    } else {
    // Ajouter une nouvelle scatégorie
   
    await axios
                    .post('/api/scategories', scategorie.value)
                    .then(() => (
                        props.scategories.push(scategorie.value)
                    ))
                    .catch(err => console.log(err))
                }
   visible.value=false;
};

const categories = ref([]);

const getCategories = () => {
  axios.get('/api/categories')
    .then(res => {
      categories.value = res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

onMounted(() => {
  getCategories();
  if (props.isEditing) {
    scategorie.value=props.scategorie;
    }
});

</script>
