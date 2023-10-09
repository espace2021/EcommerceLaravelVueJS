<template>
    <div class="container"> 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-item nav-link">Accueil</router-link>
                    <router-link to="/categories" class="nav-item nav-link">Categories</router-link>
                    <router-link to="/articles" class="nav-item nav-link">  Articles </router-link>
                    <router-link to="/register" class="nav-item nav-link">  Authentification </router-link>
                    <router-link to="/logout" class="nav-item nav-link">  Logout </router-link>    
                </div>
            </div>
        </nav>
        <router-view> </router-view>
    </div>
</template>
 
<script>
    export default {}
</script>