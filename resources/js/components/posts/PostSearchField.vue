<template>
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">
                <i class="fa fa-search"/>
            </span>
        </div>

        <input class="form-control" id="search-input" type="text" placeholder="Find tag by..."
               v-model.trim="term"
               @keyup="searchPosts"/>

        <div class="input-group-append">
            <button class="input-group-text btn btn-info" id="search-clear-btn" type="button"
                    v-if="searchable"
                    @click="clearSearch">
                Clear
            </button>
        </div>
    </div>
</template>

<script>
    import {POSTS_SEARCH_REQUEST, POSTS_SEARCH_CLEAR} from '../../store/actions/posts';

    export default {
        data() {
            return {
                term: this.$store.getters.searched,
            };
        },
        props: {
            minLength: {
                type: Number,
                default: 3,
            },
        },
        computed: {
            searchable() {
                return this.term.length >= this.minLength;
            },
            clearable() {
                return this.searchable ||
                    this.$store.getters.searched.length > 0;
            },
        },
        methods: {
            searchPosts() {
                if (this.searchable) {
                    this.$store.dispatch(POSTS_SEARCH_REQUEST, this.term);
                }
            },
            clearSearch() {
                this.$store.dispatch(POSTS_SEARCH_CLEAR);
                this.term = '';
            },
        },
    }
</script>

<style scoped>

</style>
