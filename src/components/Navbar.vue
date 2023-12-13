<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="navbar navbar-expand navbar-light bg-light">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">Hihat Todo</router-link>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" :to="{ name: 'Todos' }">Todo</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>