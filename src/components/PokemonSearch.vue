<template>
    <div class="container">
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Taper le nom d'un pokémon" id="searchPokemonByName" :value="searchPokemonByName" @input="handleSearch">
        </form>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define props and emit function
const { searchPokemonByName } = defineProps(['searchPokemonByName']);
const emit = defineEmits();

// Function to handle search input
const handleSearch = (event) => {
    // Emit an event to update the search 
    emit('updateSearchPokemon', event.target.value.toLowerCase());
};
</script>

<style>

</style>