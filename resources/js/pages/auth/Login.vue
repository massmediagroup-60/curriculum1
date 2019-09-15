<template>
    <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="login card card-signin mt-5">
                <div class="card-body">
                    <h5 class="card-title text-center">
                        Login
                    </h5>

                    <form @submit.prevent="login">
                        <div class="form-group">
                            <input type="text" class="form-control" id="login-email" name="email"
                                   placeholder="EMAIL" required
                                   v-model="credentials.email">
                        </div>

                        <div class="form-group">
                            <input type="password" class="form-control" id="login-pass" name="password"
                                   placeholder="PASSWORD" required
                                   v-model="credentials.password">
                        </div>

                        <button class="btn btn-lg btn-block text-uppercase" type="submit">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AUTH_REQUEST} from '../../store/actions/auth';

    export default {
        data() {
            return {
                credentials: {
                    email: '',
                    password: '',
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch(AUTH_REQUEST, this.credentials)
                    .then(() => {
                        this.$router.push({
                            name: 'posts.index',
                        });
                    });
            },
        },
    }
</script>
