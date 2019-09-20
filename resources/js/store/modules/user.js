import {USER_REQUEST, USER_ERROR, USER_SUCCESS} from '../actions/user';
import axios from 'axios/index';
import Vue from 'vue';
import {AUTH_LOGOUT} from '../actions/auth';

const state = {
    profile: {},
};

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name,
};

const actions = {
    [USER_REQUEST]: ({commit, dispatch}) => {
        axios({url: '/api/user'})
            .then(resp => {
                commit(USER_SUCCESS, resp.data.data);
            })
            .catch(resp => {
                commit(USER_ERROR);
                // if resp is unauthorized, logout, to
                dispatch(AUTH_LOGOUT);
            })
    },
};

const mutations = {
    [USER_SUCCESS]: (state, resp) => {
        Vue.set(state, 'profile', resp);
    },
    [AUTH_LOGOUT]: (state) => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
