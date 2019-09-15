<template>
    <div class="card">
        <template v-if="post">
            <div class="card-body">
                <h3 class="card-title">{{ post.title}}</h3>
                <hr>

                <p class="card-text">{{ post.description }}</p>
            </div>

            <div class="card-footer">
                <div>
                    Author:
                    <span>{{ post.user.name }}</span>
                </div>

                <div>
                    <span>
                        Created at: {{ post.createdAt | moment('DD/MM/YYYY') }}
                    </span>
                </div>

                <div>
                    <span v-if="post.updatedAt - post.createdAt">
                        Updated at: {{ post.updatedAt | moment('DD/MM/YYYY') }}
                    </span>
                </div>

                <div>
                    Tags:
                    <span v-for="tag in post.tags">{{ '#' + tag.name + ' ' }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                post: null,
            }
        },
        methods: {
            getPostById(id) {
                this.loading = true;
                let post = this.$store.getters.getPostById(id);
                if (post === null || typeof post === 'undefined') {
                    post = this.getPostByIdFromApi(id);
                }
                this.loading = false;

                return post;
            },
            getPostByIdFromApi(id) {
                this.$http.get('/api/posts/' + id)
                    .then(response => {
                        this.post = response.data.data;
                    });

                return this.post;
            }
        },
        created() {
            this.post = this.getPostById(
                this.$route.params.id
            );
        },
    }
</script>

<style scoped>

</style>
