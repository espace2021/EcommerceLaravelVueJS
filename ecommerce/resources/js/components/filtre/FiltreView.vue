<template>
   <AddTabFormVue @custom-event-name="setMessage" />
    <SearchForm :titles="titles" />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SearchForm from './SearchForm.vue';

  import AddTabFormVue from './AddTabForm.vue'

  const titles = ref([
    { id: 1, name: "Pc Montage - Core 2 DUO - 4Go - 320Go" },
    { id: 2, name: "DELL PC Inspiron 5570" },
    { id: 3, name: "Hp PC Portable - 13.3 - Intel Core i5-7200U" },
    { id: 4, name: "Lenovo PC Portable IP330/4000 DualCore/4Go/1To" }
  ]);

  const message=ref('');
          // Définit la méthode utilisée par le payload pour mettre à jour titles
    const setMessage=(payload)=> {
            message.value = payload.message;
            const idnum=Array.from(titles.value).pop().id+1; 
            titles.value.push({id:idnum,name:message.value});
          }

  </script>
  