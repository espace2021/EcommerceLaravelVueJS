<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="scategories" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="isLoading"
                :globalFilterFields="['nomscategorie']">
            <template #header>
                <div class="flex justify-content-end">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                </div>
            </template>
            <template #empty> No scategories found. </template>
            <template #loading> Loading scategories data. Please wait. </template>

           <Column field="nomscategorie" header="Nom S/Catégorie" style="min-width: 12rem" :sortable="true">
                <template #body="{ data }">
                    {{ data.nomscategorie }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>

            <Column header="Image" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <img :src="data.imagescategorie" :alt=data.nomscategorie  width="90" /> 
                    </div>
                </template>
            </Column>
          
            <Column field="id" header="Actions" style="min-width: 12rem">
               <template #body="slotProps">
        
        <button type="button" class="btn btn-warning rounded-circle btn-sm" @click="deleteSCategorie(slotProps.data.id)">
            <i class="pi pi-trash" style="color: red"></i>
        </button> 
       
            </template>
            </Column>

        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import axios from "../config/axios.js";

import Column from 'primevue/column';

import DataTable from 'primevue/datatable';

import InputText from 'primevue/inputtext';

import Button from 'primevue/button';

import 'primeicons/primeicons.css'

const scategories = ref([]);

const isLoading=ref(true);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'nomscategorie': { value: null, matchMode: FilterMatchMode.CONTAINS}
});

const fetchSCategories=async ()=> {
        await axios
        .get('/api/scategories/')
            .then((response)=>{
                isLoading.value=false;
                scategories.value = response.data
            })
        .catch ((error) =>{
            console.error('Error fetching categories:', error);
        });
}

onMounted(() => {
    fetchSCategories();
});


const deleteSCategorie=async (id)=> {
             await axios
                    .delete(`/api/scategories/${id}`)
                    .then(() => {
                        let i = scategories.value.map(data => data.id).indexOf(id);
                        scategories.value.splice(i, 1)
                    });
                }
</script>