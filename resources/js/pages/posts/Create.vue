<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Create Post</h3>
        </div>

        <form @submit.prevent="createPost">
            <div class="form-group">
                <input type="text" class="form-control" id="post-title" name="title" placeholder="TITLE"
                       required
                       v-model="post.title"/>
            </div>

            <div class="form-group">
                <textarea class="form-control" rows="5" id="post-description" name="description"
                          placeholder="DESCRIPTION"
                          v-model="post.description"/>
            </div>

            <tag-add-field v-model="post.tags"/>

            <div class="form-row">
                <div class="col-xl-6 offset-xl-6">
                    <button type="submit" class="btn btn-primary btn-block"
                            :disabled="loading"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import TagAddField from "../../components/tags/TagAddField";
    import {POSTS_STORE_REQUEST} from "../../store/actions/posts";

    export default {
        components: {
            TagAddField,
        },
        data() {
            return {
                post: {
                    title: '',
                    description: '',
                    tags: [],
                },
                loading: false,
            }
        },
        methods: {
            createPost() {
                this.loading = true;

                this.$store.dispatch(POSTS_STORE_REQUEST, this.post).then(response => {
                    this.$router.push({name: 'posts.index'})
                });

                this.loading = false;
            },
        },
    }
</script>

<style scoped>

</style>
