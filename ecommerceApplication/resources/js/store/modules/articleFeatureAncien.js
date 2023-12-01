const state=  ({

    cart:[],
    cartTotal:0,
  })
 const   mutations =  ({
         async initialiseStore(state) {
          if(localStorage.getItem('cart')){
           state.cart = JSON.parse(localStorage.getItem('cart'))
          }
         /* if(localStorage.getItem('cartTotal')){
          state.cartTotal = parseFloat(localStorage.getItem('cartTotal')) 
          }*/
          return true;
      },
      
      async clearCart(state){
       if(localStorage.getItem('cart')){
       localStorage.removeItem('cart');
       state.cart =[];
       state.cartTotal =0;
      }
    /*  if(localStorage.getItem('cartTotal')){
       localStorage.removeItem('cartTotal');
       state.cartTotal =0;
      }*/
      return true;
      },
      
      addCart(state,payload){
       const productData = payload;
       const productInCartIndex = state.cart.findIndex(
         (ci) => ci.product.id === productData.product.id
       );
      
       if (productInCartIndex < 0) {
       
       state.cart.push(payload)
      
       //calculating the total
       state.cartTotal = state.cart.reduce((accumulator, object) => {
      
         return parseFloat(accumulator) + parseFloat(object.product.prix*object.qty);
       }, 0);
      
        //saving in web storage
      // localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
       localStorage.setItem('cart',JSON.stringify(state.cart));
      }
      },
      minusCart(state,payload){
      
      //update quantity 
       
      const productData = payload;
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci.product.id === productData.product.id
      );
      
      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty--;
      }
      
       //Recalculating the total
        state.cartTotal = state.cart.reduce((accumulator, object) => {
          return parseFloat(accumulator) + parseFloat(object.product.prix*object.qty);
        }, 0);
      
      //saving in web storage
      //  localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
        localStorage.setItem('cart',JSON.stringify(state.cart));
      },
      removeFromCart(state,payload){
      
      
       state.cart = state.cart.filter(function( obj ) {
         return obj.product.id !== payload.product.id;
       });
      
       //calculating the total
       state.cartTotal = state.cart.reduce((accumulator, object) => {
      
         return parseFloat(accumulator) + parseFloat(object.product.prix*object.qty);
       }, 0);
      
        //saving in web storage
      // localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
       localStorage.setItem('cart',JSON.stringify(state.cart));
      },
      
      plusCart(state,payload){
      
       //update quantity 
       
       const productData = payload;
       const productInCartIndex = state.cart.findIndex(
         (ci) => ci.product.id === productData.product.id
       );
      
       if (productInCartIndex >= 0) {
         state.cart[productInCartIndex].qty++;
       }
      
        //Recalculating the total
         state.cartTotal = state.cart.reduce((accumulator, object) => {
           return parseFloat(accumulator) + parseFloat(object.product.prix*object.qty);
         }, 0);
      
       //saving in web storage
        // localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
         localStorage.setItem('cart',JSON.stringify(state.cart));

        }
  
})

export default {
    namespaced: true,
    state,
    mutations
  }