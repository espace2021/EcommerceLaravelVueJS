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
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item me-3">
                    <router-link class="nav-link" :class="$route.name == 'Cart'? 'active':''" aria-current="page" :to="{ name: 'Cart' }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                        </svg>
                        <span v-if="$store.state.Articlestore.cart.length > 0" class="align-items-center justify-content-center translate-middle badge rounded-pill bg-secondary">
                        {{ $store.state.Articlestore.cart.length }}
                        </span>
                    </router-link>
    </li>
</ul>
                </div>
            </div>
        </nav>
        <router-view> </router-view>
    </div>
</template>

<script setup>
  
</script>