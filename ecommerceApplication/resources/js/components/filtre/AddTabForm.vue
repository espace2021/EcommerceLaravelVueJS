<template>
    <div>
      <h2>Add Articles</h2>
      <input 
        type="text" 
        placeholder="Article name" 
        v-model="nom"
      />
      <button @click.prevent="addName" class="btn btn-primary">Add</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    nom: String
})
  const emit = defineEmits(['custom-event-name']);
  
  const addName = () => {
    emit('custom-event-name', { message: props.nom});
  };

  </script>
  