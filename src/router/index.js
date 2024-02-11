import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import PokemonDetails from '../components/PokemonDetails.vue'
import PokemonList from '../components/PokemonList.vue'
import PokemonLiked from '../components/PokemonLiked.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/pokemon',
      name: 'pokemonlist',
      component: PokemonList
    },


      {
          path: '/pokemon/:id',
          name: 'pokemondetails',
          component: PokemonDetails,
      },

    {
      path: '/favoris',
      name: 'favoris',
      component: PokemonLiked
    }

  ]
})

export default router
