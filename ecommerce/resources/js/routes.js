import Accueil from './components/accueil.vue';

import ViewCategory from './components/categories/viewCategory.vue';

import AddCategory from './components/categories/addCategory.vue';

import EditCategory from './components/categories/editCategory.vue';

import ViewArticle from "./components/articles/viewArticle.vue";

import AddArticle from "./components/articles/addArticle.vue";

import EditArticle from "./components/articles/editArticle.vue";

export const routes = [
    {
        name: 'accueil',
        path: '/',
        component: Accueil
    },
    {
        name: 'homeCategories',
        path: '/categories',
        component: ViewCategory
    },
    {
        name: 'createCategory',
        path: '/createCategory',
        component: AddCategory
    },
    {
        name: 'editCategory',
        path: '/editCategory/:id',
        component: EditCategory
    },
    {
        path: '/articles',
        name: 'articles',
        component: ViewArticle
    },
    {
        path: '/addArticle',
        name: 'addArticle',
        component: AddArticle
    },
    {
        name: 'editArticle',
        path: '/editArticle/:id',
        component: EditArticle
    },
];