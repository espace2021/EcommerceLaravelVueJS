import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css'


import App from './App.vue'
let app = createApp(App)

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

app.use(router);
app.mount("#app");

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.isAuth)) {
      let user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        next("/login");
      } else {
        next(); // Appelez next() ici après avoir vérifié l'authentification
      }
    } else {
      next(); // Appelez next() ici si la route n'a pas besoin d'authentification
    }
  })