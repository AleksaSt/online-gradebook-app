<template>
    <div>
        <div class="container">
             <div v-for="(error, index) in errors" :key="index" class="alert alert-danger mt-3">
                {{ error[0] }}
            </div>
        <img src="https://lh4.googleusercontent.com/proxy/eZt2H161dRZddUhZ4cmeF78862NccU6NMxOwFR6sRzXRCTNR_GaSV-K_pAgdlZ695osxzyOkpwfDATpoSRijkZAVSsMFM7n_Y28xg02V3ddkhzQ" class="img">
            <form @submit.prevent>
                <div class="form-group">
                    <label><b>First name</b></label>
                    <input type="text" class="form-control" v-model="user.first_name" placeholder="First Name" >
                </div>
                <div class="form-group">
                    <label><b>Last name</b></label>
                    <input type="text" class="form-control" v-model="user.last_name" placeholder="Last Name" >
                </div>
                <div class="form-group">
                    <label><b>Email</b></label>
                    <input type="text" class="form-control" v-model="user.email" placeholder="Email" >
                </div>
                <div class="form-group">
                    <label><b>Password</b></label>
                    <input type="password" class="form-control" v-model="user.password" placeholder="Password" >
                </div>
                <div class="form-group">
                    <label><b>Confirm Password</b></label>
                    <input type="password" class="form-control" v-model="user.confirm_password" placeholder="Confirm Password" >
                </div>
                 <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="user.accept_terms_and_conditions"
                        value="1"
                    />
                    <label class="form-check-label">
                        I accept Terms and Conditions.
                    </label>
                </div>
                <button type="submit" @click="register()" class="btn btn-success mt-3">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import { authService } from '../services/AuthService'
import { mapActions } from "vuex";

export default {
    data(){
        return{
            user: {},
            errors:[]
        }
    },

    methods:{

        ...mapActions({
            login: 'login'
        }),

        register(){
            authService.register(this.user).
            then( () =>{
                this.login({email: this.user.email, password: this.user.password})
                this.$router.push({name: 'Gradebooks'})
            }).
            catch(error => {
                this.errors = error.response.data.errors
            })
        }
    }
}
</script>

<style>
.img{
    width: 100px;
    height: 100px;
}
</style>