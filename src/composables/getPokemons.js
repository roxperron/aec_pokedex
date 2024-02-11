// Import necessary functions from Vue library
import { ref, onMounted, onUnmounted } from 'vue';


export default function usePokemonList(limit = 151, offset = 0) {
    // Create variables to store Pokémon data and related states
    const pokemonsList = ref([]); 
    const isLoading = ref(false); 
    const currentPage = ref(1); 
    const hasMoreData = ref(true); 
    const totalPokemonCount = ref(0); 
    const error = ref(null); 

    // Function to fetch Pokémon data from the API
    const fetchData = async () => {
        try {
            // Check if data is already loading or there's no more data to fetch
            if (isLoading.value || !hasMoreData.value) {
                return;
            }

            // Set loading flag to true
            isLoading.value = true;

            // Fetch Pokémon data from the API
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset + (currentPage.value - 1) * limit}`);
            const data = await response.json();

            // If Pokémon data is received
            if (data.results && data.results.length > 0) {
                // Update total Pokémon count
                totalPokemonCount.value = data.count;

                // Fetch data for each Pokémon
                const fetchPromises = data.results.map(async result => {
                    const response = await fetch(result.url);
                    return response.json();
                });

                // Wait for all fetches to complete
                const pokemons = await Promise.all(fetchPromises);

                // Add fetched Pokémon data to the list
                pokemonsList.value = [...pokemonsList.value, ...pokemons];

                // Increment current page for next fetch
                currentPage.value += 1;
            } else {
                // If no more data available, set flag to false
                hasMoreData.value = false;
            }
        } catch (error) {
            // If any error occurs during fetch, store it
            console.error('Error fetching Pokémon:', error);
            error.value = error;
        } finally {
            // Set loading flag to false regardless of success or failure
            isLoading.value = false;
        }
    };

    // Function to handle an infinite scroll
    const handleScroll = () => {
        // Calculate scroll position and document height
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // If scroll position reaches near the bottom and not loading, fetch more data
        if (scrollPosition >= documentHeight - 151 && !isLoading.value) {
            fetchData();
        }
    };

    // Hook to add scroll event listener and fetch data on component mount
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
        fetchData();
    });

    // Hook to remove scroll event listener on component unmount
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    // Return data and functions for external use
    return {
        pokemonsList, 
        totalPokemonCount, 
        isLoading, 
        error, 
    };
}
