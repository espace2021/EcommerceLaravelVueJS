<template>
    <div v-if="$store.state.cart.length > 0" style="display:flex">
        <div class="col-10">
      <table>
       <tr v-for="(c) of $store.state.cart" :key="c.product.id">
         <td><img :src="c.product.imageart" :alt="c.product.designation" width="50"></td>  
         <td>{{ c.product.designation }}</td>
         <td>- Prix : {{ c.product.prix }} TND </td>
         <td>- Quantité : <strong> {{ c.qty }} </strong></td>
         <td><button class="btn btn-dark" @click="plus(c)"> + </button></td>
         <td><button class="btn btn-warning" @click="minus(c)" v-if="c.qty > 1"> - </button>
             <button class="btn btn-danger" @click="removeFromCart(c)"> X </button>
         </td>
       </tr>
      </table>
       </div>
        <div class="col-10">
              <button class="btn btn-info"> CHECKOUT </button> 
            <div>Total items : {{$store.state.cart.length }}</div>
            <div>Total price  : {{$store.state.cartTotal}}</div>
           <router-link :to="{name: 'HomeCart'}" > <button class="btn btn-success"> MORE </button> </router-link>     
           <button class="btn btn-secondary" @click="clearCart()"> CLEAR </button>
       </div>
     </div>
     <div v-else>
               <div class="error-template container">
                 <h1>Oops!</h1>
                 <h2>No Products Found</h2>
                 <div class="error-details">Your cart is empty</div>
                 <div class="error-actions">
                   <a class="btn text-white">
                     <span class="glyphicon glyphicon-envelope"></span>
                     <router-link to="/shopping"
                       >Take me to Products Page</router-link
                     >
                   </a>
                 </div>
               </div>
   </div>
   </template>
   
   <script>
    import axios from "../config/axios.js";
    import store from '../../store'

import { ref, onMounted } from 'vue';

   export default {
     name: "Cart",
     data() {
       return {
       
         Produits:[]
       };
     },
     methods: {
       
       clearCart() { 
        store.commit("clearCart");
       },

       removeFromCart(item) { 
        store.commit("removeFromCart", item);
       },

        plus(item) { 
         this.Produits.map((pro)=>{
         if(pro.id==item.product.id){
           if(item.qty < pro.qtestock )
           {
            store.commit("plusCart", item);  
           }          
           else
                 alert("Quantité stock indisponible")
         }       
         });        
                
       },

        minus(item) { 
            store.commit("minusCart", item);  
            
       },
       
       getProduits(){
             
               axios.get('/api/articles/').then(res => {
                   this.Produits = res.data;
               }).catch(error => {
                   console.log(error)
               });
          },
     },
     beforeMount() {
        store.commit('initialiseStore')
       console.log(store.state.cart)
       this.getProduits();
     }
   };
   </script>
   
   <style>
   .error-template {
     padding: 40px 15px;
     text-align: center;
   }
   .error-actions {
     margin-top: 15px;
     margin-bottom: 15px;
   }
   .error-actions .btn {
     margin-right: 10px;
   }
   </style>
   