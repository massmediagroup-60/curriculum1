import {
    POSTS_GET_REQUEST,
    POSTS_GET_SUCCESS,
    POSTS_STORE_REQUEST,
    POSTS_UPDATE_REQUEST,
    POSTS_UPDATE_SUCCESS,
    POSTS_SEARCH_REQUEST,
    POSTS_SEARCH_CLEAR,
} from '../actions/posts';
import axios from 'axios';
import Vue from 'vue';

const state = {
    loading: false,
    meta: {
        total: null,
        perPage: null,
        currentPage: null,
    },
    posts: [],
    search: '',
};

const getters = {
    posts: state => state.posts,
    loading: state => state.loading,
    total: state => state.meta.total,
    perPage: state => state.meta.perPage,
    currentPage: state => state.meta.currentPage,
    getPostById: (state) => (id) => {
        return state.posts.find(post => post.id === id);
    },
    searched: state => state.search,
};

const actions = {
    [POSTS_GET_REQUEST]: ({commit, dispatch, getters}, payload) => {
        return new Promise((resolve, reject) => {
            commit(POSTS_GET_REQUEST);

            let query = {};
            if (payload !== null) {
                query.page = payload;
            }
            if (getters.searched !== '') {
                query.q = getters.searched;
            }
            axios({url: '/api/posts', params: query, method: 'GET'})
                .then(resp => {
                    commit(POSTS_GET_SUCCESS, resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [POSTS_STORE_REQUEST]: ({commit, getters, dispatch}, payload) => {
        return new Promise((resolve, reject) => {
            axios({url: '/api/posts', data: payload, method: 'POST'})
                .then(resp => {
                    dispatch(POSTS_GET_REQUEST, getters.currentPage);
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [POSTS_UPDATE_REQUEST]: ({commit, dispatch}, payload) => {
        return new Promise((resolve, reject) => {
            axios({url: '/api/posts/' + payload.id, data: payload, method: 'PUT'})
                .then(resp => {
                    commit(POSTS_UPDATE_SUCCESS, {post: payload});
                    resolve(resp);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    [POSTS_SEARCH_REQUEST]: ({commit, dispatch}, payload) => {
        return new Promise((resolve, reject) => {
            commit(POSTS_SEARCH_REQUEST, payload);

            dispatch(POSTS_GET_REQUEST, null);
        });
    },
    [POSTS_SEARCH_CLEAR]: ({commit, dispatch}, payload) => {
        return new Promise((resolve, reject) => {
            commit(POSTS_SEARCH_CLEAR);

            dispatch(POSTS_GET_REQUEST, null);
        });
    },
};

const mutations = {
    [POSTS_GET_REQUEST]: (state) => {
        state.loading = true;
    },
    [POSTS_GET_SUCCESS]: (state, resp) => {
        state.loading = false;
        Vue.set(state, 'posts', resp.data);
        Vue.set(state, 'meta', {
            total: resp.meta.total,
            perPage: resp.meta.per_page,
            currentPage: resp.meta.current_page,
        });
    },
    [POSTS_UPDATE_SUCCESS]: (state, resp) => {
        let index = state.posts.findIndex(post => post.id === resp.post.id);
        state.posts[index] = resp.post;
    },
    [POSTS_SEARCH_REQUEST]: (state, search) => {
        state.search = search;
    },
    [POSTS_SEARCH_CLEAR]: (state) => {
        state.search = '';
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}
