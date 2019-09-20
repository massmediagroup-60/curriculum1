import {AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/auth';
import {USER_REQUEST} from '../actions/user';
import {AUTH_TOKEN_LOCAL_PATH, AUTH_TOKEN_RESPONSE_PATH} from '../../const';
import axios from 'axios/index';

const state = {
    token: localStorage.getItem(AUTH_TOKEN_LOCAL_PATH) || '',
};

const getters = {
    isAuth: state => !!state.token,
    token: state => state.token,
};

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            axios({url: '/api/login', data: user, method: 'POST'})
                .then(resp => {
                    localStorage.setItem(AUTH_TOKEN_LOCAL_PATH, resp.data.data[AUTH_TOKEN_RESPONSE_PATH]);

                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.data[AUTH_TOKEN_RESPONSE_PATH];
                    commit(AUTH_SUCCESS, resp.data.data);
                    dispatch(USER_REQUEST);
                    resolve(resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem(AUTH_TOKEN_LOCAL_PATH);
                    reject(err);
                });
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem(AUTH_TOKEN_LOCAL_PATH);
            resolve();
        });
    }
};

const mutations = {
    [AUTH_SUCCESS]: (state, resp) => {
        state.token = resp[AUTH_TOKEN_RESPONSE_PATH];
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
