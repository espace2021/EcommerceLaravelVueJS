import Accueil from './components/accueil.vue';

import ViewCategory from './components/categories/viewCategory.vue';

import AddCategory from './components/categories/addCategory.vue';

import EditCategory from './components/categories/editCategory.vue';

import ViewArticle from "./components/articles/viewArticle.vue";

import AddArticle from "./components/articles/addArticle.vue";

import EditArticle from "./components/articles/editArticle.vue";

import Register from './components/Authentification/Register.vue';
import Login from './components/Authentification/Login.vue';
import Profile from './components/Authentification/Profile.vue';
import Logout from './components/Authentification/Logout.vue';

export const routes = [
    {
        name: 'accueil',
        path: '/',
        component: Accueil,
        meta:{isAuth:true}
    },
    {
        name: 'homeCategories',
        path: '/categories',
        component: ViewCategory,
        meta:{isAuth:true}
    },
    {
        name: 'createCategory',
        path: '/createCategory',
        component: AddCategory,
        meta:{isAuth:true}
    },
    {
        name: 'editCategory',
        path: '/editCategory/:id',
        component: EditCategory,
        meta:{isAuth:true}
    },
    {
        path: '/articles',
        name: 'articles',
        component: ViewArticle,
        meta:{isAuth:true}
    },
    {
        path: '/addArticle',
        name: 'addArticle',
        component: AddArticle,
        meta:{isAuth:true}
    },
    {
        name: 'editArticle',
        path: '/editArticle/:id',
        component: EditArticle,
        meta:{isAuth:true}
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        meta:{isAuth:true}
    },
    {
        name: 'logout',
        path: '/logout',
        component: Logout,
        meta:{isAuth:true}
    },
    
];

