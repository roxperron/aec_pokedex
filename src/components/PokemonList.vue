<template>
  <div class="py-5">
    <h1 class="text-center py-3">Recherche</h1>
    <PokemonSearch :searchPokemonByName="searchPokemonByName" @updateSearchPokemon="updateSearchPokemon" />
  </div>

  <div>
    <h1 class="text-center py-3">Liste des pokémons</h1>
  </div>
  <div class="d-flex flex-wrap justify-content-center">
    <div v-for="pokemon in filteredPokemons" :key="pokemon.name">
      <div class="card p-2 m-2" style="width: 18rem;">
        <img :src="pokemon.sprites.front_default" class="card-img-top" alt="Image du pokémon">
        <div class="card-body">
          <p>{{ pokemon.name.toUpperCase() }}</p>
          <button @click="goToPokemonDetails(pokemon.id)" class="gotoPokemonDetails btn btn-danger mx-1">Détails</button>
          <button @click="addToFavoritePokemon(pokemon)" class="btn btn-outline-danger"><i class="bi bi-suit-heart mx-1"></i>Favoris</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PokemonSearch from './PokemonSearch.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFavoritesStore } from '../store/useFavoritesStore';
import getPokemons from '../composables/getPokemons';

// Initialize router and get pokemons function
const router = useRouter();
const { pokemonsList, fetchMorePokemons } = getPokemons();

// Reactive variables for search and filtered pokemons
const searchPokemonByName = ref('');
const filteredPokemons = ref([]);

// Function to update searchPokemonByName variable
const updateSearchPokemon = (newSearchPokemon) => {
  searchPokemonByName.value = newSearchPokemon;
};

// Function to filter pokemons based on search query
const filterPokemons = () => {
  const searchQuery = searchPokemonByName.value.toLowerCase();
  return pokemonsList.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );
};

// Function to navigate to pokemon details page
const goToPokemonDetails = (pokemonId) => {
  router.push({ name: 'pokemondetails', params: { id: pokemonId } });
};

// Watch for changes in pokemonsList and searchPokemonByName
watch([pokemonsList, searchPokemonByName], () => {
  filteredPokemons.value = filterPokemons();
});

// Function to handle infinite scroll and fetch more pokemons
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Function to fetch more pokemons when reaching bottom of the page
const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= documentHeight - 151) {
    fetchMorePokemons;
  }
};

// UseFavoritesStore to add pokemon to favorites
const { addToFavorites } = useFavoritesStore();

// Function to add pokemon to favorites
const addToFavoritePokemon = (pokemon) => {
  addToFavorites(pokemon);
};
</script>

<style>

</style>
