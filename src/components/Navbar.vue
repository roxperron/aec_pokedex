<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-danger" data-bs-theme="dark">
            <div class="container-fluid ">
                <img class="navbar-brand" src="../assets/img/pikachu.png">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link">Acceuil</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/pokemon" class="nav-link">Pokémons</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink  to="/favoris" class="nav-link">Favoris</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
</template>

<script setup>

</script>

<style>

</style>