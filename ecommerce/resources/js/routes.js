import Accueil from './components/accueil.vue';

import ViewCategory from './components/categories/viewCategory.vue';

import AddCategory from './components/categories/addCategory.vue';

import EditCategory from './components/categories/editCategory.vue';

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
    }
];