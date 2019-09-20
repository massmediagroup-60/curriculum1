import store from '../store';

const auth = (to, from, next) => {
    if (store.getters.isAuth) {
        next();
        return;
    }

    next({ name: 'auth.login' });
};

const guest = (to, from, next) => {
    if (!store.getters.isAuth) {
        next();
        return;
    }

    next({ name: 'posts.index' });
};

// if necessary more than one guard use Vue Router Multiguard
const routes = [
    {
        path: '/login',
        name: 'auth.login',
        component: require('../pages/auth/Login').default,
        beforeEnter: guest,
    },
    {
        path: '/',
        name: 'posts.index',
        component: require('../pages/posts/Index').default,
    },
    {
        path: '/posts/create',
        name: 'posts.create',
        component: require('../pages/posts/Create').default,
        beforeEnter: auth,
    },
    {
        path: '/posts/:id',
        name: 'posts.show',
        component: require('../pages/posts/Show').default,
    },
    // {
    //     path: '*',
    //     name: '404',
    //     component: require('../pages/errors/Error404.vue'),
    // }
];

export default routes;
