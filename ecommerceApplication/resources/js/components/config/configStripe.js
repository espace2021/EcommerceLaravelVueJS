import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

export default {
  setup() {
    const stripe = ref(null);

    onMounted(async () => {
      const stripePromise = loadStripe("pk_test_51KtYRUD3HS4vNAwatvmqAEXLKKX11UOcpkHfLnw9UPI9kZ7AJCOeLkqik61wHFXLmRGHUd4aNBvp45v82DpskKl300bMfznwlE");
      stripe.value = await stripePromise;
    });

    return {
      stripe,
    }; 
  },
 
};