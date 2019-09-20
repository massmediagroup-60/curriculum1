/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');

window.Vue = require('vue');
import VueAxios from 'vue-axios';
import VueMoment from 'vue-moment';
import PortalVue from 'portal-vue';
import BootstrapVue from 'bootstrap-vue';
import Axios from 'axios';


Vue.use(VueMoment);
Vue.use(PortalVue);
Vue.use(BootstrapVue);
Vue.use(VueAxios, Axios);

import router from './router';
import store from './store';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 */

const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    store,
    beforeCreate() {
        if (this.$store.getters.isAuth) {
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.getters.token;
        }
    }
});
