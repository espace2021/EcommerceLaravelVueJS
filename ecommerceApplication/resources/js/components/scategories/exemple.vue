
<template>
    <div>
      <h2>{{ editing ? 'Edit Item' : 'Add Item' }}</h2>
      <form @submit.prevent="saveItem">
        <div class="p-field">
          <label for="name">Item Name:</label>
          <input v-model="item.name" type="text" id="name" />
        </div>
        <button type="submit">{{ editing ? 'Update' : 'Add' }}</button>
      </form>
  
      <h2>Items</h2>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }}
          <button @click="editItem(item)">Edit</button>
          <button @click="deleteItem(item.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          // ...initial items
        ],
        item: { id: null, name: '' },
        editing: false,
      };
    },
    methods: {
      saveItem() {
        if (this.editing) {
          // Update existing item
          const index = this.items.findIndex(item => item.id === this.item.id);
          this.items[index] = { ...this.item };
        } else {
          // Add new item
          this.items.push({ id: Date.now(), ...this.item });
        }
        this.resetForm();
      },
      editItem(item) {
        this.item = { ...item };
        this.editing = true;
      },
      deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
      },
      resetForm() {
        this.item = { id: null, name: '' };
        this.editing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  

