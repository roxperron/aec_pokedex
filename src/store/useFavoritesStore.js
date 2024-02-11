import { defineStore } from "pinia";
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
    const favoritePokemon = ref([]);

    const addToFavorites = (pokemon) => {
        favoritePokemon.value.push(pokemon);
    };


    return { favoritePokemon, addToFavorites};
});
