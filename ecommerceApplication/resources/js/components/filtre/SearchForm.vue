<template>
    <div>
      <h2>Filter Articles</h2>
      <input 
        type="text" 
        placeholder="Filter Search" 
        v-model="query"
      />
      <br>
      <search-results :query="query" :titles="titles" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SearchResults from './SearchResults.vue';
  
  const query = ref("");
  const props = defineProps({
    titles:Array
})
  </script>
  