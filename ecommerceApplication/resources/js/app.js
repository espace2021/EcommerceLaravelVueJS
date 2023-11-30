import axios from "./components/config/axios";
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-teal/theme.css'

import store from "./store"

import App from './App.vue'

let app = createApp(App)

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

app.use(router).use(store).use(PrimeVue);

app.mount("#app");

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.isAuth)) {
      let user = JSON.parse(localStorage.getItem('user'));
      
      if (!user) {
          next("/login");
      } 
      else { console.log(user.token)
      //  next(); // mettre next() ici après avoir vérifié l'authentification
         
      await axios.get('/api/auth/ckecktoken', { headers: { Authorization: 'Bearer ' + user.token }})
          .then(response =>{ console.log(response)
           console.log(response.data)
           if(response.data===true) next(); // mettre next() ici après avoir vérifié l'authentification
           else next("/login");
          })
        . catch ((error) =>{
          console.log(error);
          next("/login");
         })
         
      }
  } else {
      next(); // mettre next() ici si la route n'a pas besoin d'authentification
  }
});

 