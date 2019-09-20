<template>
    <li class="post" @mouseover="showActions = true" @mouseleave="showActions = false">
        <div class="card">
            <div class="post__body">
                <router-link :to="{ name: 'posts.show', params: { id: post.id } }">
                    <div class="card-body">
                        <h3 class="card-title post__title">{{ post.title }}</h3>
                        <hr>

                        <p class="card-text post__desc">{{ post.description }}</p>

                        <div class="post__meta pull-right">
                            <span>{{ post.user.name }}</span>
                            <span>{{ post.createdAt | moment('from', 'now') }}</span>
                        </div>

                        <div class="post__tags">
                            <span v-for="tag in post.tags">{{ '#' + tag.name + ' ' }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                showActions: false,
            };
        },
        props: {
            post: Object,
            required: true,
        },
    }
</script>
