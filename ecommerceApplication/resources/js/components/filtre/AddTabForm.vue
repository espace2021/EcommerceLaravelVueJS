<template>
    <div>
      <h2>Add Articles</h2>
      <input 
        type="text" 
        placeholder="Article name" 
        v-model="nomLocal"
      />
      <button @click.prevent="addName" class="btn btn-primary">Add</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    nom: String
})

const nomLocal=ref('');
nomLocal.value=props.nom;

  const emit = defineEmits(['custom-event-name']);
  
  const addName = () => {
    emit('custom-event-name', { message: nomLocal.value});
  };

  </script>
  