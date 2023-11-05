<template>
  <v-data-table
    :headers="headers"
    :items="categories"
    :sort-by="[{ key: 'nomcategorie', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Catégories</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
         <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <v-icon
        size="small"
        @click="deleteCategorie(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
  
  </v-data-table>
</template>
  
  <script setup>

import { VDataTable } from 'vuetify/labs/VDataTable'
  import axios from '../config/axios.js';
  import { ref, onMounted ,watch } from 'vue';
  
  const categories = ref([]);
  const isLoading = ref(true);

  const itemsPerPage = 5;
  dialogDelete= ref(false);
  editedIndex=ref(-1);
  dialog=ref(false)

 const close= () =>{
        dialog = false
       /* this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })*/
      }

  const dialog =(val)=> {
        val || close()
      }

  const dialogDelete= (val) =>{
        val || closeDelete()
      }

  const deleteItemConfirm =() =>{
        categories.value.splice(editedIndex.value, 1)
        closeDelete()
      }
  const closeDelete =()=> {
        dialogDelete.value = false
      /*  this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })*/
      }
      
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
    { title: 'Actions', key: 'actions', sortable: false },
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
  
  const deleteCategorie = async (id) => { alert(id)
 /*   try {
      await axios.delete(`/api/categories/${id}`);
      const i = categories.value.findIndex(data => data.id === id);
      if (i !== -1) {
        categories.value.splice(i, 1);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }*/
  };
  
  onMounted(() => {
    fetchCategories();
     });
watch( () => {
  dialog (val)
  dialogDelete (val)
});
  </script>
  