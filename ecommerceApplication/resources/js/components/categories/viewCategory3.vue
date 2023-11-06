<template>
    <v-row>
      <v-col md="8" sm="12">
        <v-data-table
          :headers="headers"
          :items="categories"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </template>
  
  <script setup>

import { VDataTable } from 'vuetify/labs/VDataTable'
  import axios from '../config/axios.js';
  import { ref, onMounted } from 'vue';
  
  const categories = ref([]);
  const isLoading = ref(true);
  const itemsPerPage = 5;
  
  const headers = ref([
    {
      text: 'Nom',  // Use 'text' instead of 'title'
      align: 'start',
      sortable: false,
      value: 'nomcategorie',  // Use 'value' instead of 'key'
    },
    {
      text: 'Image',  // Use 'text' instead of 'title'
      align: 'end',
      value: 'imagecategorie',  // Use 'value' instead of 'key'
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
  