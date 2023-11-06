<template>
       
        <div v-if="isLoading">
            <h2> Loading .... </h2>
        </div>
  <div v-else>
  <v-data-table
    :headers="headers"
    :items="categories"
    :itemsPerPage="itemsPerPage"
    :sort-by="[{ key: 'nomcategorie', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Catégories</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <router-link :to="{name: 'createCategory'}" class="btn btn-primary">New Category</router-link>
      </v-toolbar>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.nomcategorie }}</td>
        <td><img :src="item.imagecategorie" :alt=item.nomcategorie  width="100"/></td>
        <td>  
          <router-link :to="{name: 'editCategory', params: { id: item.id }}">
             <v-icon
       size="small"
       color="green"  
      >
        mdi-pencil
      </v-icon>
      </router-link>  
      <v-icon
        color="red"
        size="small"
        @click="deleteCategorie(item.id)"
      >
        mdi-delete
      </v-icon>  
        </td>
      </tr>
    </template>
  </v-data-table>
  </div>
</template>

<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import axios from '../config/axios.js';
import { ref, onMounted } from 'vue';

const categories = ref([]);
const isLoading = ref(true);

const itemsPerPage = 5;

const headers = ref([
  {
    title: 'Nom',
    key: 'nomcategorie',
    sortable: true,
  },
  {
    title: 'Image',
    key: 'imagecategorie', 
    sortable: false
  },
  { title: 'Actions',
  key: 'actions',
  sortable: false 
 },
]);

const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories/');
    isLoading.value = false;
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const deleteCategorie = async (id) => {
  
 try {
    await axios.delete(`/api/categories/${id}`);
    const i = categories.value.findIndex(data => data.id === id);
    if (i !== -1) {
      categories.value.splice(i, 1);
    }
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
