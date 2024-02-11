<template>
    <div class="container text-center py-5">
        <h1>Bienvenue dans le Pokédex en Vue.js!</h1>
        <h2 class="py-3">J'ai choisi de programmer un Pokédex comme travail final dans le cadre du cours d'intégration des interfaces utilisateurs
            et d'utiliser l'api <a
                class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href="https://pokeapi.co/" target="_blank">PokéApi.co</a></h2>

        <h2 class="py-3">Le pokédex propose ses 4 fonctionnalités :</h2>

        <div>
            <ul class="list-group list-group-flush py-5">
                <li class="list-group-item">Consulter la liste de tous les pokémons</li>
                <li class="list-group-item">Rechercher des pokémons</li>
                <li class="list-group-item">Consulter la fiche détaillée des pokémons</li>
                <li class="list-group-item">Ajouter des pokémons dans votre liste de favoris</li>
            </ul>
        </div>

        <!-- IMAGES  -->
        <div class=py-5>
            <h2 class="py-2 my-2">Consulter les images</h2>
            <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../assets/img/ashandfriends.jpg" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/img/mosaic.jpg" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/img/ashpikachu.jpg" class="d-block w-100">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>


        </div>
        <!-- FORMULAIRE  -->
        <div class="py-5 my-5">
            <h2>S'abonner à l'infolettre</h2>
            <div v-if="!isSubcritionSubmited">
                <form class="row g-3" @submit.prevent="subcribeToInfoletter">
                <div class="col-md-6">
                    <label for="userName" class="form-label">Votre nom : </label>
                    <input type="text" class="form-control" id="userName" v-model="userName">
                    <span v-if="!isUserNameValid">{{ userNameError }}</span>
                </div>
                <div class="col-md-6">
                    <label for="userMail" class="form-label">Votre courriel : </label>
                    <input type="email" class="form-control" id="userMail" v-model="userMail">
                    <span v-if="!isUserMailValid">{{ userMailError }}</span>
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-danger">Envoyer</button>
                </div>
            </form>
            </div>
            <h3 class="py-2" v-if="isSubcritionSubmited">{{ isSubcritionSubmitedMessage }}</h3>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive variables for username, email, submission status, and validation errors
const userName = ref('');
const isUserNameValid = ref(true);
const userNameError = ref('');

const userMail = ref('');
const isUserMailValid = ref(true);
const userMailError = ref('');

const isSubcritionSubmited = ref(false);
const isSubcritionSubmitedMessage = ref('');

// Function to validate the username 
const userNameValidtation = () => {
    const userNameRegex = /^[a-zA-Z\s]+$/;

    if (userName.value.trim() === '') {
        isUserNameValid.value = false;
        userNameError.value = "Le nom est obligatoire.";

    } else if (!userNameRegex.test(userName.value)) {
        isUserNameValid.value = false;
        userNameError.value = "Entrez un nom valide.";
    } else {
        isUserNameValid.value = true;
        userNameError.value = '';
    }
};

// Function to validate the usermail 
const userMailValidation = () => {
    const userMailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (userMail.value.trim() === '') {
        isUserMailValid.value = false;
        userMailError.value = "Le courriel est obligatoire.";
    } else if (!userMailRegex.test(userMail.value)) {
        isUserMailValid.value = false
        userMailError.value = "Entrez un courriel valide.";
    } else {
        isUserMailValid.value = true;
        userMailError.value = '';
    }
}

// Form submission
const subcribeToInfoletter = () => {
    userNameValidtation();
    userMailValidation();

    // Success submission 
    if (isUserNameValid.value && isUserMailValid.value) {
        isSubcritionSubmited.value = true;
        isSubcritionSubmitedMessage.value = "Merci, vous êtes bien abonné à notre infolettre!"
    }
};
</script>

<style>

</style>