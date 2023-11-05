<template>
    <div>
      <p>Showing {{ filteredTitles.length }} results - {{ query }}</p>
      <ul>
        <li 
          v-for="title in filteredTitles ? filteredTitles : titlesTab" 
          :key="title.id">
          {{ title.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  const props = defineProps({
    query: String,
    titles:Array
})
  
  const filteredTitles = computed(() => {
    return props.titles.filter((s) =>
      s.name.toLowerCase().includes(props.query.toLowerCase())
    );
  });
  
  const titlesTab = computed(() => props.titles);
  </script>
  