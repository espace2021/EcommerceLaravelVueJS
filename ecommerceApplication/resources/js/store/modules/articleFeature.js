const state=  ({
    cart:[],
    cartTotal:0,
  });


 const   mutations =  ({
              
      async clearCart(state){
     
       state.cart =[];
       state.cartTotal =0;
    
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
      
      },
      removeFromCart(state,payload){
      
      
       state.cart = state.cart.filter(function( obj ) {
         return obj.product.id !== payload.product.id;
       });
      
       //calculating the total
       state.cartTotal = state.cart.reduce((accumulator, object) => {
      
         return parseFloat(accumulator) + parseFloat(object.product.prix*object.qty);
       }, 0);
      
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
      
        }
  
})

export default {
    namespaced: true,
    state,
    mutations
  }