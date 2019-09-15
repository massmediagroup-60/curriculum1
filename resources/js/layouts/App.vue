<template>
    <div>
        <nav class="navbar navbar-dark bg-primary mb-5">
            <router-link class="navbar-brand" :to="{ name: 'posts.index' }">
                <strong>Curriculum Blog</strong>
            </router-link>
        </nav>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {}
</script>
