<template>
    <div class="container d-flex justify-content-center py-5 my-5">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="pokemon.sprites.front_default" class="img-fluid rounded-start larger-image w-100 h-100" alt="Pokemon Image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ pokemon.name.toUpperCase() }}</h5>
              <p class="card-text">Poids : {{ pokemon.weight }} lbs</p>
              <p class="card-text">Grandeur: {{ pokemon.height }} pieds</p>
              <p class="card-text">Expérience de base: {{ pokemon.base_experience }}</p>
              <p class="card-text">Type: {{ pokemon.types.join(', ') }}</p>
              <p class="card-text">Abilités :  {{ pokemon.abilities.join(', ') }}</p>
              <p class="card-text">Attaques :  {{ pokemon.moves.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  

  const route = useRoute();
  
  // Define reactive variable for pokemon ID
  const pokemonId = ref(route.params.id);
  
  // Define reactive variable for pokemon details
  const pokemon = ref({
      name: '',
      order: 0,
      weight: 0,
      height: 0,
      base_experience: 0,
      types: [],
      abilities: [],
      moves: [],
      sprites: {
        front_default: '',
      },
  });
  
  // Function to fetch pokemon details from API
  const fetchPokemonDetails = async () => {
      try {
        // Fetch pokemon details from API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`);
        const data = await response.json();
    
        // Extracting abilities and moves from the API response
        const abilities = data.abilities.map((ability) => ability.ability.name);
        const moves = data.moves.map((move) => move.move.name);
    
        // Update the pokemon reactive variable with fetched data
        pokemon.value = {
          name: data.name,
          order: data.order,
          weight: data.weight,
          height: data.height,
          base_experience: data.base_experience,
          types: data.types.map((type) => type.type.name),
          abilities,
          moves,
          sprites: {
            front_default: data.sprites.front_default,
          },
        };
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
  };
  
  // Fetch pokemon details on component mount
  onMounted(() => {
      fetchPokemonDetails();
  });
  </script>
  
  <style>

  </style>
  