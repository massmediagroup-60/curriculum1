<template>
    <div>
        <div class="row">
            <div class="col-xl-4 offset-xl-8">
                <router-link class="btn btn-primary btn-block" :to="{ name: 'posts.create' }">
                    <strong>Create Post</strong>
                </router-link>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-auto">
                <div v-show="isLoading">
                    loading...
                </div>

                <template v-if="!isLoading">
                    <template v-if="total">
                        <ul class="posts mt-3">
                            <post-card
                                v-for="(post, index) in posts"
                                :post="post"
                                :key="index"
                            />
                        </ul>

                        <div class="pagination d-flex justify-content-center">
                            <b-pagination
                                :value="currentPage"
                                @input="getPosts"
                                :total-rows="total"
                                :per-page="perPage"
                                first-text="First"
                                prev-text="Prev"
                                next-text="Next"
                                last-text="Last"
                            />
                        </div>
                    </template>

                    <template v-else>
                        <p>There are no posts</p>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import {POSTS_GET_REQUEST} from '../../store/actions/posts';

    export default {
        computed: {
            isLoading() {
                return this.$store.getters.loading;
            },
            posts() {
                return this.$store.getters.posts;
            },
            currentPage() {
                return this.$store.getters.currentPage;
            },
            total() {
                return this.$store.getters.total;
            },
            perPage() {
                return this.$store.getters.perPage;
            },
        },
        methods: {
            getPosts(pageNum = null) {
                this.$store.dispatch(POSTS_GET_REQUEST, pageNum);
            },
        },
        mounted() {
            this.getPosts();
        },
    }
</script>

<style scoped>

</style>
