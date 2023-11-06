<template>
    <div class="container"> 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link">Accueil</router-link>
                    <router-link to="/filtreView" class="nav-item nav-link">Recherche</router-link>
                    <router-link to="/scategories" class="nav-item nav-link">S/Categories</router-link>
                    <router-link to="/categories" class="nav-item nav-link">Categories</router-link>
                    <router-link to="/articles" class="nav-item nav-link">  Articles </router-link>
                    <router-link to="/register" class="nav-item nav-link">  Authentification </router-link>
                    <router-link to="/logout" class="nav-item nav-link">  Logout </router-link>  
                    <router-link to="/shopping" class="nav-item nav-link"> Shopping Cart </router-link>   
                    <AppHeader /> 
                </div>
            </div>
        </nav>
        <router-view> </router-view>
    </div>
</template>
 
<script setup>
  import AppHeader from './components/cart/AppHeader.vue';
 import { onMounted } from 'vue';
    import store from "./store"

    onMounted(() => {
         store.commit('initialiseStore')
            }
);

</script>